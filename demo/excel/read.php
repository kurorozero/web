<?php
require_once('PHPExcel.php');
require_once('ConnectDB.php');

$xls_file = 'cats.xls';

if(file_exists($xls_file))
{
    $xls_arr = readxls($xls_file);

    foreach($xls_arr as $v)
    {
        $catArr[] = '"'.$v[1].'"';
    }

    $cat = implode(",",$catArr);

    $tmp = "<?php \r\n return array(\r\n {$cat} \r\n);\r\n?>";

    if(writer('catarr.php',$tmp))
    {
        echo "writeOK\r\n";
    }

}

$xls_file = 'Line Drawings Database.xls';

if(file_exists($xls_file))
{
    $xls_arr = readxls($xls_file,1);

    foreach($xls_arr as $v)
    {
        $picArr[] = 'array("'.$v[2].'","'.$v[1].'","'.$v[0].'")';
    }

    $pic = implode(",",$picArr);

    $tmp = "<?php \r\n return array(\r\n {$pic} \r\n);\r\n?>";

    if(writer('picarr.php',$tmp))
    {
        echo "writeOK\r\n";
    }
}

function readxls($file,$activeSheet = '0')
{
    if(file_exists($file)){
        $objPHPExcel = PHPExcel_IOFactory::load($file);
        $objPHPExcel->setActiveSheetIndex($activeSheet);
        $arr = $objPHPExcel->getActiveSheet()->toArray();
    }

    return $arr;
}

function writer($file,$tmp)
{
    $fp = fopen($file,"w");

    $writer = fwrite($fp,$tmp);

    fclose($fp);

    return $writer;
}

?>
