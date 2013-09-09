<?php
class db{
	var $conn = false;
	var $resources = false;
	var $host;
	var $username;
	var $password;
	var $dbname = '';
	
	function db()
	{

	}
	
	function __construct()
	{
		
	}
	
	function connect()
	{
		return ;
	}
	
	function pgsql($db_host, $db_database, $db_user, $db_pass)
	{
		$this->conn = pg_connect("host=$db_host dbname=$db_database user=$db_user password=$db_pass") or die('Could not connect: ' . pg_last_error());
		return (bool)$this->conn;
	}

	function mysql($host, $username, $password)
	{
		$this->conn = mysql_connect($host,$username,$password) or die('Could not connect: '.$host . mysql_error());
		return (bool)$this->conn;
	}
	
	function useDB($dbname)
	{
		mysql_select_db();
	}
	
	function close()
	{
		return mysql_close($this->conn);
	}
	

}
?>