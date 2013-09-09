<?php
/**
 * 任何编码字符串转换为utf-8
 *
 * @param string $str 输入字符串
 * @return string 输出utf-8编码字符串
 */
function anystring2utf8($str) {
	$encode = mb_detect_encoding($str,"ASCII,UNICODE,UTF-8,GBK,CP936,EUC-CN,BIG-5,EUC-TW");
	return ($encode != 'UTF-8' && $encode != 'ASCII' ? iconv($encode,'UTF-8',$str) : $str);
}
/**
 * 任何编码字符串转换为gbk
 *
 * @param string $str 输入字符串
 * @return string 输出gbk编码字符串
 */
function anystring2gbk($str) {
	$encode = mb_detect_encoding($str,"ASCII,UNICODE,UTF-8,GBK,CP936,EUC-CN,BIG-5,EUC-TW");
	return ($encode != 'CP936' && $encode != 'ASCII' && $encode != 'GBK' ? iconv($encode,'GB18030',$str) : $str);
}

/**
 * 任何编码字符串(数组)转换为utf-8
 *
 * @param mixed $string 输入字符串(数组)
 * @return mixed 输出utf-8编码字符串(数组)
 */
function any2utf8($string) {//通过递归转换字符串编码
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = any2utf8($val); //递归
		}
	} else {
		$string = anystring2utf8($string);
	}
	return $string;
}
/**
 * 任何编码字符串(数组)转换为gbk
 *
 * @param mixed $string 输入字符串(数组)
 * @return mixed 输出gbk编码字符串(数组)
 */
function any2gbk($string) {//通过递归转换字符串编码
	if(is_array($string)) {
		foreach($string as $key => $val) {
			$string[$key] = any2gbk($val); //递归
		}
	} else {
		$string = anystring2gbk($string);
	}
	return $string;
}
?>