<?php
include_once("User.php");
include_once("acs_constants.php");
//session_start();
$user = $josso_agent->getUserInSession();

//if ($user == "" and preg_replace("/https?:\/\/([^\/]+).*/i", "\\1", $_SERVER['HTTP_REFERER']) == $_SERVER['HTTP_HOST'] and $_SERVER['HTTP_REFERER'] != $_SERVER['HTTP_HOST']."/index.php")
/*
if($user == "" and (ereg("/student",$_SERVER['HTTP_REFERER']) or ereg("/teacher",$_SERVER['HTTP_REFERER']))) {

		echo "<meta http-equiv=refresh content='0;URL=http://".$_SERVER['HTTP_HOST']."/index.php'>";
		exit;	
}
*/

if (!isset($user) && $_SERVER['PHP_SELF'] !='/login/login.php' && $_SERVER['PHP_SELF'] !='/index.php'  && $_SERVER['PHP_SELF'] !='/webmap.php')
{
	$_SESSION['path']="http://".$_SERVER["HTTP_HOST"].$_SERVER["REQUEST_URI"];
	//header('Location: /index.php');
	echo "<meta http-equiv=refresh content='0;URL=http://".$_SERVER['HTTP_HOST']."/index.php'>";
	exit;	
}
?>
