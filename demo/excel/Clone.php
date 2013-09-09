<?php
  if (version_compare(phpversion(), '5.0') < 0) {
    eval('
    function clone($object) {
      return $object;
    }
    ');
  }
?>