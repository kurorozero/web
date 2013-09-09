<?php
ini_set("display_errors", 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

require_once('ConnectDB.php');

$picarr = include('picarr.php');

$catarr = include('catarr.php');

$DB = ConnectDB::getInstance();


$query = "SELECT * FROM tblpicture WHERE date_create>'2012-07-05' AND date_create<'2012-07-07'";

$picture = $DB->objects($query);

$query = "SELECT * FROM tblcategory ";

$cat = $DB->objects($query);

$existsarr = array();
$newarr = array();
$imp_pic_arr = array();

foreach($cat as $v)
{
    $existsarr[] = $v->cat_name;
}

foreach($catarr as $v)
{
    if(!in_array($v,$existsarr))
    {
        $newarr[] = $v;
    }
}

foreach($picarr as $v)
{
    /*$tmp = addslashes(trim($v[0]));
    $cat_query = "SELECT cat_id FROM tblcategory WHERE cat_name = '{$tmp}'";
    $catid = $DB->objects($cat_query);

    var_dump($catid[0]->cat_id);


    $keyword = addslashes(trim($v[1]));
    $filename = addslashes(trim($v[2]));*/
    $imp_pic_arr[$v[2]] = $v[0];

}

$qty_err = 0;
$qty_total = 0;
$qty_ok = 0;

foreach($picture as $v)
{
    $tmp = addslashes(trim($imp_pic_arr[$v->file_name]));
    $pic_id = $v->pic_id;
    $cat_query = "SELECT cat_id FROM tblcategory WHERE cat_name = '{$tmp}'";
    $oCat = $DB->objects($cat_query);
    $piccat_query = " SELECT pic_id FROM tblpicturecategory WHERE pic_id=$pic_id ";
    $aPiccat = $DB->objects($piccat_query);
    if(!empty($oCat) && empty($aPiccat))
    {
        $cat_id = $oCat[0]->cat_id;
        $imp_query = "INSERT INTO tblpicturecategory (pic_id,cat_id) VALUES ({$pic_id},{$cat_id})";
        if($DB->insert("tblpicturecategory","pic_id,cat_id","$pic_id,$cat_id",""))
        {
            $qty_ok++;
        }
        else
        {
            echo "$v->file_name is error pic_id:$pic_id";
            $qty_err++;
        }
    }

    $qty_total++;
}

echo "total:$qty_total; completed:$qty_ok; error:$qty_err;";


echo '<pre>';
//var_dump($imp_pic_arr);
echo '</pre>';


?>
