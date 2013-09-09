<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>

<script language="javascript">
function checkSubmit() {
	
	if (document.getElementById("josso_username").value != "" && document.getElementById("josso_password").value != ""){
		document.getElementById("login_form").action ="http://leap.ilongman.com:80/josso/signon/usernamePasswordLogin.do?josso_back_to=http://donaldtest.dev1.ilongman.com/josso_demo/index.php?back=y";
		document.getElementById("login_form").submit();
	} else {
		document.getElementById("josso_password").focus();
	}
	
}
</script>

</head>

<body>
<form name="login_form" id="login_form" method="post"  onSubmit="checkSubmit()">
<input type="hidden" id="josso_cmd" name="josso_cmd" value="login">
<TABLE border="0" cellspacing="0" cellpadding="0" width="180">
<tr><td colspan=2>Leap Login</td></tr>
<TR>
<TD width="70">Login</TD>
<TD width="110"><input id="josso_username" name="josso_username" type="text" value="" style="border: 1 #cccccc solid; width:100;"></TD>
</TR>
<TR VALIGN=TOP>
<TD>Password</TD>
<TD><input id="josso_password" name="josso_password" type="password" value="" style="border: 1 #cccccc solid;width:100;"></TD>
</TR>
<tr><td colspan=2 align=center><input type=submit name=sub_btn value=Login></td></tr>
</table>
</form>

</body>
</html>
