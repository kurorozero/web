<?php
ini_set("display_errors", 1);
error_reporting(E_ALL);
function test($abc=''){
	json_encode($abc);
}
echo test('');
?>
