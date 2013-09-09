<? 

include "smtp.class.php"; 


$smtpserver = "localhost";//SMTP服务器

$smtpserverport =25;//SMTP服务器端口

$smtpusermail = "webmaster@kuai77.com";//SMTP服务器的用户邮箱

$smtpemailto = "88626619@qq.com";//发送给谁

$smtpuser = "someone";//SMTP服务器的用户帐号

$smtppass = "someonepass";//SMTP服务器的用户密码

$mailsubject = "Test Subject";//邮件主题

$mailbody = "<h1>from kuai77 .com  test by ligy hahaha </h1>";//邮件内容

$mailtype = "HTML";//邮件格式（HTML/TXT）,TXT为文本邮件

##########################################

$smtp = new smtp($smtpserver,$smtpserverport,false,$smtpuser,$smtppass);//这里面的一个true是表示使用身份验证,否则不使用身份验证.

$smtp->debug = FALSE;//是否显示发送的调试信息

$smtp->sendmail($smtpemailto, $smtpusermail, $mailsubject, $mailbody, $mailtype);


?>  
