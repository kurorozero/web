<?php

require '../libs/Smarty.class.php';
define(DS,DIRECTORY_SEPARATOR);

$host = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['SERVER_PORT']!="80" ? ":" . $_SERVER['SERVER_PORT'] : '';
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

define(LINK, $host . $filePath . "?" . $uri);//链接
define(PATH, dirname($_SERVER['SCRIPT_FILENAME'])."/");//物理路径
define(URL, dirname("http://".$_SERVER['HTTP_HOST'] . $path)."/");//相对路径
define(QUERY, $querys);
define(URI, $uri);




$smarty = new Smarty;

$smarty->compile_check = true;
$smarty->debugging = true;

$smarty->assign("Name","Fred Irving Johnathan Bradley Peppergill");
$smarty->assign("FirstName",array("John","Mary","James","Henry"));
$smarty->assign("LastName",array("Doe","Smith","Johnson","Case"));
$smarty->assign("Class",array(array("A","B","C","D"), array("E", "F", "G", "H"),
	  array("I", "J", "K", "L"), array("M", "N", "O", "P")));

$smarty->assign("contacts", array(array("phone" => "1", "fax" => "2", "cell" => "3"),
	  array("phone" => "555-4444", "fax" => "555-3333", "cell" => "760-1234")));

$smarty->assign("option_values", array("NY","NE","KS","IA","OK","TX"));
$smarty->assign("option_output", array("New York","Nebraska","Kansas","Iowa","Oklahoma","Texas"));
$smarty->assign("option_selected", "NE");

/* test selectbox */
$smarty->assign("vals",array("aa","bb"));
$smarty->assign("selected","bb");
$smarty->assign("output",array("aa_str","bb_str"));

/* include test */
$smarty->assign("inc_file",PATH."includetest.php");

$testindexarr = array("A","B","C","D");

$smarty->assign("index_arr",$testindexarr);

/*  test 运算  */
$smarty->assign("num1",1);
$smarty->assign("num2",2);

/* 部分字符串变量 */
$smarty->assign("long_str","asd lkfj a sl d kfj las dkjf las kdjf las dk jf");
$smarty->assign("long_str2","阿斯顿飞啊萨斯地方阿斯顿发送到发送斯蒂芬 阿斯大法");

$smarty->assign('matchStr',"hello my friends");

$smarty->display('index.tpl');

?>
