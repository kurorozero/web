<?php
header("Content-Type: text/plain");
set_time_limit(0);

$i=0;

if($_REQUEST['time']){
    $ftime = $_REQUEST['time'];
    while($i<10){
        ob_start();
        ob_end_clean();
        echo memory_get_usage()."\n";
        //clearstatcache(); // 清除文件状态缓存
        //$file_time = filemtime($file); // 更新文件时间
        flush();
        ob_flush();
        ob_end_flush();
        $i++;
        usleep(1000000); // 让CPU休息会
        sleep(1);
    }
    echo 'OK';
}

?>
