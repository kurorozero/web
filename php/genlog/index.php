<?php
set_time_limit(3600);
function filter(){
    $db = connect();
    $userlist = array();
    $hasUse = array();
    $sql_users1 = 'SELECT loginid FROM orginal GROUP BY loginid';
    $sql_users2 = 'SELECT loginid FROM login_log GROUP BY loginid';
    if($res = query($sql_users1,$db)){
        while($row = mysql_fetch_assoc($res)){
            $userlist[] = $row['loginid'];
        }
        mysql_free_result($res);
    }

    if($res = query($sql_users2,$db)){
        while($row = mysql_fetch_assoc($res)){
            if(in_array($row['loginid'],$userlist)){
                $userlist[] = $row['loginid'];
            }
        }
        mysql_free_result($res);
    }

    $success = 0;
    $error = array();
    $offset = 0;
    $limit = 1000;
    $query = 'SELECT * FROM `lose_log` WHERE status=200 limit ';
    //'WHERE uri REGEXP "/$|php|/\63"';
    while(($res = query($query.$offset.','.$limit,$db)) && mysql_num_rows($res)){
        $logs = array();
        while($row = mysql_fetch_assoc($res)){
            if($row['uri']!='/login.php'){
                switch(TRUE){
                case !$curuser && !$cur_ip:
                    $curuser = $userlist[array_rand($userlist)];
                    $cur_ip = $row['ip'];
                    break;
                case $row['ip']!=$cur_ip:
                case $row['uri']=='/login2.php':
                case $row['uri']=='/logout.php':
                    $hasUse[] = $curuser;
                    $curuser = $userlist[array_rand($userlist)];
                    $using_ip[] = $cur_ip;
                    $cur_ip = $row['ip'];
                    break;
                default:
                    break;
                }
                $logs[] = $cur_ip.' - '.$curuser.' '.$row['date'].' '.$row['timezone'].' '.$row['method'].' '.$row['uri'].'" '.$row['status'].' null';
                $success++;
            }else{
                $error[] = $row['ip'].' - '.$row['loginid'].' '.$row['date'].' '.$row['timezone'].' '.$row['method'].' '.$row['uri'].'" '.$row['status'].' null';
            }
        }
        mysql_free_result($res);
        //$insert = 'INSERT INTO filter (`logs`) VALUES '.implode(',',$logs);
        //$result[] = array('offset'=>$offset,'limit'=>$limit,'result'=>query($insert,$db));
        write_log($logs,'access_log_lose.log');
        $offset = $offset + $limit;
    }

    write_log($error,'access_log_error.log');
    echo 'Success: '.$success.'  error: '.count($error);
    //preg_match("/\/$/",$row[6]) || preg_match("/(php|\/\?)/",$row[6])
}

function write_log($rows,$file)
{
    if($rows && $fp = fopen($file,'a')){
        foreach($rows as $row){
            $result = fwrite($fp,$row."\n");
        }
        fclose($fp);
    }
    return $result;
}

function import_lose()
{
    if($fp = fopen('201303-201305.log','r+')){
        $error = array();
        $db = connect();
        $sql = 'INSERT INTO lose_log (`datetime`,`ip`,`unknow1`,`loginid`,`date`,`timezone`,`method`,`uri`,`protocol`,`status`,`unknow2`) VALUES ';
        $i=0;
        $counter = 0;
        $start_time = strtotime('[08/Mar/2013:07:29:23');
        $end_time = strtotime('[09/May/2013:11:45:15');
        while (!feof($fp)) {
            $values = '';
            $str_row = fgets($fp,4096);
            $row = explode(' ',$str_row);
            if($row && $i>237183 && $i<1803128 && preg_match("/\/$|php|\/\?/",$row[6])){
                $mytime = ptime(str_replace('[','',$row[3]));
                //if($counter>1000)exit;/** end */
                $values = "('$mytime','".implode("','",$row)."')";
                if(!$result = query($sql . $values, $db)){
                    $error[] = $values;
                    //var_dump($result,$values);
                    //echo '<br />';
                }
                $counter++;
            }
            $i++;
        }
        fclose($fp);

        if($error && $fp = fopen('error_row.log','w+')){
            foreach($error as $row){
                fwrite($fp,$row."\r\n");
            }
            fclose($fp);
        }
    }
    var_dump($i,$counter,count($error));
}

function import_orginal()
{
    if($fp = fopen('access_log.log','r+')){
        $error = array();
        $db = connect();
        $sql = 'INSERT INTO orginal (`ip`,`unknow1`,`loginid`,`date`,`timezone`,`method`,`uri`,`status`,`unknow2`) VALUES ';
        $counter = 0;
        while (!feof($fp)) {
            $values = '';
            $str_row = fgets($fp,4096);
            $row = explode(' ',$str_row);
            $values = "('".implode("','",$row)."')";
            if(!$result = query($sql . $values, $db)){
                $error[] = $values;
            }
            $counter++;
        }
        fclose($fp);

        if($error && $fp = fopen('error_row.log','w+')){
            foreach($error as $row){
                fwrite($fp,$row."\r\n");
            }
            fclose($fp);
        }
    }
    var_dump($counter,count($error));
}

function import_login()
{
    if($fp = fopen('pts_ilearn.log','r+')){
        $error = array();
        $db = connect();
        $sql = 'INSERT INTO login_log (`userid`,`type`,`module`,`loginid`,`create_on`) VALUES ';
        $counter = 0;
        while (!feof($fp)) {
            $values = '';
            $str_row = fgets($fp,4096);
            $row = explode('|',$str_row);
            if(is_numeric(trim($row[0])) /*&& trim($row[2])=='Login'*/){
                $values = "('".trim($row[1])."','".trim($row[2])."','".trim($row[3])."','".trim($row[4])."','".trim($row[5])."')";
                if(!$result = query($sql . $values, $db)){
                    $error[] = $values;
                }
            }
            $counter++;
        }
        fclose($fp);

        if($error && $fp = fopen('error_row.log','w+')){
            foreach($error as $row){
                fwrite($fp,$row."\r\n");
            }
            fclose($fp);
        }
    }
    var_dump($counter,count($error));
}

function query($sql,$db)
{
    return $sql ? mysql_query($sql,$db) : FALSE;
}

function connect()
{
    $db = mysql_connect('127.0.0.1','root','') or die("Database error");
    mysql_select_db('gen_log', $db);
    mysql_query("set names 'utf8'");
    return $db;
}

function ptime($strtime)
{
    //$init_time = '15/Mar/2013:01:56:52';
    $time = substr($strtime,12);
    $dateArr = explode("/",substr($strtime,0,11));
    $date = $dateArr[2].'-'.$dateArr[1].'-'.$dateArr[0];
    $datetime = strtotime($date.' '.$time);//var_dump($datetime);
    return date("Y/m/d H:i:s",$datetime);
}


if($_GET['q']){
    switch(TRUE){
    case $_GET['q']=='import1':
        import_lose();
        break;
    case $_GET['q']=='filter':
        filter();
        break;
    case $_GET['q'] == 'import2':
        import_login();
        break;
    case $_GET['q'] == 'test':
        $sql = "SELECT * FROM  `lose_log` WHERE STATUS =200 LIMIT 310700 , 1000";
        $db = connect();
        $result = query($sql,$db);
        var_dump($result && mysql_num_rows($result));
        break;
    default:
        break;
    }
}


