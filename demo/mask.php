<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>DIV层居中遮罩</title>
<style>
#overlay {
position:absolute;
top:0;
left:0;
width:100%;
height:100%;
background:#000;
opacity:0.5;
filter:alpha(opacity=50);
}
#win {
position:absolute;
top:50%;
left:50%;
width:400px;
height:200px;
background:#fff;
margin:-102px 0 0 -202px;
line-height: 200px;
text-align: center;
border: 4px solid #CCC;
}
</style>
<script>
</script>
</head>
<body>
<div id="overlay"></div>
<div id="win">层居中:)更多：<a href='http://www.iiwnet.com'>网页特效</a></div>
</body>
</html>
