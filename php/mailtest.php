<? 

include "smtp.class.php"; 


$smtpserver = "localhost";//SMTP������

$smtpserverport =25;//SMTP�������˿�

$smtpusermail = "webmaster@kuai77.com";//SMTP���������û�����

$smtpemailto = "88626619@qq.com";//���͸�˭

$smtpuser = "someone";//SMTP���������û��ʺ�

$smtppass = "someonepass";//SMTP���������û�����

$mailsubject = "Test Subject";//�ʼ�����

$mailbody = "<h1>from kuai77 .com  test by ligy hahaha </h1>";//�ʼ�����

$mailtype = "HTML";//�ʼ���ʽ��HTML/TXT��,TXTΪ�ı��ʼ�

##########################################

$smtp = new smtp($smtpserver,$smtpserverport,false,$smtpuser,$smtppass);//�������һ��true�Ǳ�ʾʹ�������֤,����ʹ�������֤.

$smtp->debug = FALSE;//�Ƿ���ʾ���͵ĵ�����Ϣ

$smtp->sendmail($smtpemailto, $smtpusermail, $mailsubject, $mailbody, $mailtype);


?>  
