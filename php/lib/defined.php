<?php
define(DS,DIRECTORY_SEPARATOR);

$host = $_SERVER['SERVER_PORT']!="80" ? "http://" . $_SERVER['HTTP_HOST'] . ":" . $_SERVER['SERVER_PORT'] : "http://" . $_SERVER['HTTP_HOST'];
$filePath = $_SERVER['SCRIPT_NAME'];
$querys = $_SERVER['QUERY_STRING'];
$uri = $_SERVER['REQUEST_URI'];

$query = array();
if(strlen($querys)>0){
	$qArr = explode("&",$querys);

	foreach($qArr as $v){
		if(!(strpos($v,"=") === false)){
			$tmp = explode("=",$v);
			$query[$tmp[0]] = $tmp[1];
			unset($tmp);
		}
	}
}

define(URL, $host . $filePath . "?" . $querys);//链接
define(PATH, dirname($_SERVER['SCRIPT_FILENAME'])."/");//物理路径
define(QUERY, $querys);
define(URI, $uri);
define(RELPATH,$host . "");

?>
