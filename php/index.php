<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>無標題文件</title>
<link href="../css/init.css" type="text/css" rel="stylesheet" />
<link href="../css/layout1.css" type="text/css" rel="stylesheet" />
<script type="text/javascript" src="../js/kjs.js"></script>
<script src="../js/jquery-1.6.4.min.js" type="text/javascript" language="javascript"></script>
<!--[if IE 6]>
<script type="text/javascript" src="../js/png.js"></script>
<script type="text/javascript" language="javascript">
try{
	//IE6 support png opacity and support background-image for elements by class png or img elements
	DD_belatedPNG.fix('.png');
}catch(e){

}
</script>
<style type="text/css">
body{
	/* IE6 :hover bug fixed plugin */
	behavior:url("../css/csshover3.htc");
}
</style>
<![endif]-->
<script type="text/javascript" language="javascript">
function CanPopup(){
	var check,
	canPopup=false,
	sParam='toolbar=no'+
    ',menubar=no'+
    ',scrollbars=no'+
    ',resizable=no'+
    ',status=no'+
    ',width=1'+
    ',height=1'+
    ',top=0'+
    ',left=0'+
    ',screenX=0'+
    ',screenY=0',
	oWin=window.open('','test',sParam);
alert(oWin.closed);
	if(oWin===null){
		check=false;
	}else{
		oWin.close()
		check=true;

	}
	
	return check;
}
alert(CanPopup());
//alert(oWin===null || oWin.close());
</script>
</head>
<body>
<?php
echo date("w",strtotime("-12 week"));
echo date("w")-(date("w")-1);
echo date("Y-m-d",strtotime("-".(date("w")-1)." day -12 week"));
?>
<?php include('application/core.php');?>
</body>
</html>
