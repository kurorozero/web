<?php


define(DS,DIRECTORY_SEPARATOR);
define(LINK,"http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
define(PATH,dirname("http://".$_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME']));

$query = array();
if(strlen($_SERVER['QUERY_STRING'])>0){
	$qArr = explode("&",$_SERVER['QUERY_STRING']);

	foreach($qArr as $v){
		if(!(strpos($v,"=") === false)){
			$tmp = explode("=",$v);
			$query[$tmp[0]] = $tmp[1];
			unset($tmp);
		}
	}
}

echo '<pre>';
var_dump($_SERVER);

//echo "http://".$_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
echo '</pre>';
?>
