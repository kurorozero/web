<?php
	include('./include/encode.func.php');
	
	$city = $_GET['city'] ? intval($_GET['city']) : 212; //cq
	$type = $_GET['type'] ? strtolower(trim($_GET['type'])) : 'json'; //json
	$charset = $_GET['charset'] ? strtolower(trim($_GET['charset'])) : 'utf-8'; //charset
	$dateType = $_GET['datetype'] ? strtolower(trim($_GET['datetype'])) : 'unix'; //dateType
	
	if($city < 1)
		exit();
	
	/*Get Weather*/
	$content = '';
	$fp = fopen('http://weather.news.qq.com/inc/07_dc' . $city . '.htm','r');
	while(!feof($fp))
		$content .= fread($fp,1024);
	fclose($fp);
	
	$content = str_replace(array("\t","\r","\n"),'',$content);
	$content = anystring2utf8($content);
	$weather = array();
	
	$a = array();
	preg_match('/class="px14\stred"><strong>(.[^\&]*)\&#160;(.[^<]*)<\/strong>/i',$content,$a);
	$weather['area'] = trim($a[2]);
	$weather['now']['date'] = parseDate($a[1]);
	
	preg_match('/<img\swidth="64"\sheight="64"\ssrc="(.[^"]*)"/i',$content,$a);
	$weather['now']['pic'] = trim($a[1]);
	preg_match('/bgcolor="#EDF2F8" class="blues">(.[^<]*)<br>(.[^<]*)<\/td>/i',$content,$a);
	$weather['now']['weather'] = trim($a[1]);
	$weather['now']['temp'] = trim($a[2]);
	preg_match('/class="explain\sblues">(.[^<]*)<br>\s*(.[^<]*)<br>\s*(.[^<]*)</i',$content,$a);
	$weather['now']['wind'] = parseMore($a[1]);
	$weather['now']['uv'] = parseMore($a[2]);
	$weather['now']['air'] = parseMore($a[3]);
	
	preg_match_all('/bgcolor="#EEEEEE">(.[^<]*)<\/td>(.[^-]*)bgcolor="#EEF3F8">(.[^<]*)<br>(.[^<]*)<br>(.[^<]*)/i',$content,$a);
	
	foreach($a[0] as $k => $v){
		$weather['future72'][$k] = array(
			'date' => $dateType == 'unix' ? strtotime(trim($a[1][$k])) : trim($a[1][$k]),
			'weather' => trim($a[3][$k]),
			'temp' => trim($a[4][$k]),
			'wind' => trim($a[5][$k]),
			'pic' => parsePic($a[2][$k])
		);
	}
	/*Get exponent*/
	$weather['exponent'] = array();
	$content = '';
	$fp = fopen('http://weather.news.qq.com/inc/07_zs' . $city . '.htm','r');
	while(!feof($fp))
		$content .= fread($fp,1024);
	fclose($fp);
	$content = str_replace(array("\t","\r","\n"),'',$content);
	$content = anystring2utf8($content);
	preg_match_all('/<strong>(.[^<]*)<\/strong>:<span\sclass="tred">(.[^<]*)<\/span>.[^:]*width="180">(.[^<]*)<\/td>/i',$content,$a);
	foreach($a[0] as $k => $v) {
		$weather['exponent'][$k] = array(
			'name' => trim($a[1][$k]),
			'value' => trim($a[2][$k]),
			'memo' => trim($a[3][$k])
		);
	}
	
	/*Print Result*/
	if ($charset != 'utf-8' && $charset != 'utf8')
		$weather = any2gbk($weather);
		
	switch($type) {
		case 'json':
			echo json_encode($weather);
			break;
		case 'xml':
			header("content-type:text/xml");
			$ax = new array2xml($weather,$charset);
			echo $ax->getXML();
			break;
		default:
			echo '<pre>';
			print_r($weather);
			echo '</pre>';
		break;
	}

	
	
	function parseDate($date) {
		$str = $date;
		$str = preg_replace('/([^\d])/',' ',$str);
		$str = trim($str);
		$str = str_replace('   ','-',$str);
		return $dateType == 'unix' ? strtotime($str) : $str;
	}
	
	function parseMore($str){
		$str = trim($str);
		$tmp = explode(iconv('gbk','UTF-8','£º'),$str);
		return $tmp[1];
	}
	
	function parsePic($str) {
		$a = array();
		preg_match_all('/src="(.[^"]*)"/i',$str,$a);
		$result = $a[1];
		return $result;
	}
	
	class array2xml {
		var $xml;
		function array2xml($array,$encoding='gbk') {
			$this->xml='<?xml version="1.0" encoding="'.$encoding.'"?>';
			if(count($array) > 1) {
				$array = array('catalog' => $array);
			}
			$this->xml .= $this->_array2xml($array);

		}
		function getXml() {
			return $this->xml;
		}
		function _array2xml($array) {
			foreach($array as $key=>$val) {
				is_numeric($key) && $key = "item id=\"$key\"";
				$xml.= "<$key>";
				$xml.= is_array($val) ? $this->_array2xml($val) : $val;
				list($key,) = explode(' ',$key);
				$xml .= "</$key>";
			}
			return $xml;
		}
}
	
?>