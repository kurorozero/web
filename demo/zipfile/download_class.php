<?php

class download_class{
    var $file = NULL;
    var $path = NULL;
    var $filename = NULL;
    var $ext = NULL;
    var $size = NULL;
    var $headers = NULL;
    var $delete = NULL;

    function __construct($file,$isDelete=false)
    {
        $this->download_class($file,$isDelete);
    }

    function download_class($file,$isDelete=false)
    {
        if(file_exists($file)){
            $this->file = $file;
            $this->path = dirname($file);
            $this->filename = basename($file);
            $this->ext = strtolower(substr(strrchr($this->filename,"."),1));
            $this->size = filesize($file);
            //after download delete file
            $this->delete = $isDelete;
            $this->headers = apache_request_headers();
        }
    }

    function load($newname,$byBlocks=true)
    {
        if($this->file){
            $this->start_flush();
            $this->custom_name = $newname ? $newname : $this->filename;

            // Checking if the client is validating his cache and if it is current.
            if (isset($this->headers['If-Modified-Since']) && (strtotime($this->headers['If-Modified-Since']) == filemtime($this->file))) {
                $this->get_cache();
            } else {
                $this->get_header();
                if($byBlocks){
                    $this->error = $this->get_blocks();
                }else{
                    $this->error = $this->by_entire();
                }
            }
            $this->end_flush();
            exit;
        }else{
            $result = false;
        }
        return $result;
    }

    function check()
    {

    }

    function by_blocks()
    {
        $chunksize = 1*(1024*5); // how many bytes per chunk
        $buffer = '';
        $cnt =0;

        // $handle = fopen($filename, 'rb');
        $handle = fopen($this->file, 'rb');
        if ($handle === false) {
            return false;
        }
        while (!feof($handle)) {
            $buffer = fread($handle, $chunksize);
            echo $buffer;
            ob_flush();
            flush();
            if ($retbytes) {
                $cnt += strlen($buffer);
            }
        }
        $status = fclose($handle);
        return true;
    }

    function by_entire()
    {
        $content = file_get_contents($this->file);
        echo $content;
        ob_flush();
        return true;
    }

    function start_flush()
    {
        ob_start();
        ob_clean();
        return;
    }

    function end_flush()
    {
        while (ob_get_level() > 0) {
            ob_end_flush();
        }
        return;
    }

    function get_cache()
    {
        // Client's cache IS current, so we just respond '304 Not Modified'.
        header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($this->file)).' GMT', true, 304);
    }

    function get_header()
    {
        // Image not cached or cache outdated, we respond '200 OK' and output the image.
        header('Cache-Control: public');
        header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($this->file)).' GMT', true, 200);
        header('Content-Length: '.filesize($this->file));
        if ($this->ext != "swf"){
            header('Content-Disposition: attachment; filename="'.$this->custom_name.'"');
        }
        header('Content-Type:application/force-download');
    }

    function __destruct()
    {
        if($this->delete){
            unlink($this->file);
        }
    }
}


function download_image($file,$filename)
{
    if($file && file_exists($file)){
        ob_start();
        ob_clean();
        if(isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == filemtime($file))){
            header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($file)).' GMT', true, 304);
        }else{
            $headers = apache_request_headers();
            $file_extension = strtolower(substr(strrchr($filename,"."),1));
            header('Cache-Control: public');
            header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($file)).' GMT', true, 200);
            header('Content-Length: '.filesize($file));
            if ($file_extension != "swf"){
                header('Content-Disposition: attachment; filename="'.$filename.'"');
            }
            header('Content-Type:application/force-download');

            $fc = file_get_contents($file);
            echo $fc;
            ob_flush();
            while (ob_get_level() > 0) {ob_end_flush();}
        }
    }
}

function download($file,$filename,$delete=false)
{
    if($file && file_exists($file)){
        ob_start();
        ob_clean();
        if(isset($headers['If-Modified-Since']) && (strtotime($headers['If-Modified-Since']) == filemtime($file))){
            header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($file)).' GMT', true, 304);
        }else{
            $headers = apache_request_headers();
            $file_extension = strtolower(substr(strrchr($filename,"."),1));
            header('Cache-Control: public');
            header('Last-Modified: '.gmdate('D, d M Y H:i:s', filemtime($file)).' GMT', true, 200);
            header('Content-Length: '.filesize($file));
            if ($file_extension != "swf"){
                header('Content-Disposition: attachment; filename="'.$filename.'"');
            }
            header('Content-Type:application/force-download');

            $chunksize = 1*(1024*5); // how many bytes per chunk
            $buffer = '';
            $cnt =0;

            // $handle = fopen($filename, 'rb');
            $handle = fopen($file, 'rb');
            if ($handle === false) {
                return false;
            }
            while (!feof($handle)) {
                $buffer = fread($handle, $chunksize);
                echo $buffer;
                ob_flush();
                flush();
                if ($retbytes) {
                    $cnt += strlen($buffer);
                }
            }
            $status = fclose($handle);
            while (ob_get_level() > 0) {ob_end_flush();}
        }
    }
}
