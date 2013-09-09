<?php
ini_set("display_errors", 1);
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
include('pclzip.lib.php');
include('zip_class.php');
include('download_class.php');

/* creates a compressed zip file */
function create_zip($files = array(),$destination = '',$overwrite = false) {
	//if the zip file already exists and overwrite is false, return false
	if(file_exists($destination) && !$overwrite) { return false; }
	//vars
	$valid_files = array();
	//if files were passed in...
	if(is_array($files)) {
		//cycle through each file
		foreach($files as $file) {
			//make sure the file exists
			if(file_exists($file)) {
				$valid_files[] = $file;
			}
		}
	}
	//if we have good files...
	if(count($valid_files)) {
		//create the archive
		$zip = new ZipArchive();
		if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
			return false;
		}
		//add the files
		foreach($valid_files as $file) {
			$zip->addFile($file,$file);
		}
		//debug
		//echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;
		
		//close the zip -- done!
		$zip->close();
		
		//check to make sure the file exists
		return file_exists($destination);
	}
	else
	{
		return false;
	}
}

$start_time = microtime(true);
$zip_file_name = 'my-archive.zip';
$files_to_zip = array(
	'JCIT_index_guideline.ppt',
	'JCIT_layout_design20130104_comments20130122.ppt',
	'JCIT_layout_design20130226.ppt',
	'JCIT_layout_s01.png'
);

//if true, good; if false, zip creation failed
//$result = create_zip($files_to_zip,$zip_file_name,true);
//$end_time = microtime(true);
//$timing = $end_time - $start_time;
//var_dump($result,$timing,$start_time,$end_time);

if($files_to_zip){
    //$zip = new zip_class($zip_file_name,true);
    //$result = $zip->zip_files($files_to_zip);
    //$archive = new PclZip($zip_file_name);
    //$files_str = implode(',',$files_to_zip);
    //$v_list = $archive->add('dev/file.txt',PCLZIP_OPT_REMOVE_PATH, 'dev');
    //$v_list = $z->create($files_str);
    //$result2 = download($zip_file_name,'files.zip');
    ////exit;
    //var_dump($v_list,$result2);

}

$testfile = 'test.txt';

if($fp = fopen($testfile,'a+')){
        var_dump($fp);
        fwrite($fp,"达拉斯看风景阿隆索看到房价拉萨宽带计费了恺撒奖大佬发卡机\n");
        fclose($fp);
}

var_dump(file_exists($testfile),filemtime($testfile));


