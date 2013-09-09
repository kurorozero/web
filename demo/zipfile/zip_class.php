<?php

class zip_class{
    var $oZip = NULL;
    var $files = NULL;
    var $valid_files = NULL;
    var $destination = NULL;
    var $overwrite = NULL;
    var $error = NULL;

    function __construct($destination,$overwrite)
    {
        $this->zip_class($destination,$overwrite);
    }

    function zip_class($destination = '',$overwrite = false)
    {
        $this->oZip = new ZipArchive();
        //$this->files = $files;
        $this->destination = $destination;
        $this->overwrite = $overwrite;
    }

    function zip_files($files)
    {
        if(!$this->create_zip()){
            $this->error = 1;
        }
        
        return $this->error || !$this->add_file($files) ? false : $this->destination;
    }

    function add_file($files)
    {
        //add the files
        if($this->check_files($files)){
            foreach($files as $file) {
                if(!$this->oZip->addFile($file,basename($file))){
                    $this->error = 3;
                    break;
                }
            }
        }else{
            $this->error = 2;
        }
        return $this->error ? false : true;
    }

    function create_zip()
    {
        //create the archive
        if($this->oZip->open($this->destination,$this->overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }else{
            //return file_exists($this->destination) ? true : false;
            return true;
        }
    }

    function check_files($files)
    {
        //if files were passed in...
        $checkout = false;
        if(is_array($files)) {
            //cycle through each file
            foreach($files as $file) {
                //make sure the file exists
                if(file_exists($file)) {
                    $checkout = true;
                }else{
                    $checkout = false;
                    break;
                }
            }
        }
        return $checkout;
    }


    function __destruct()
    {
        $this->oZip->close();
    }
}
