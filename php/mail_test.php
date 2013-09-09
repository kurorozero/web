<!--发送gmail邮件需要openssl支持，研究了一下午，终于发送成功！

1. linux命令行发送过程，详细参考man s_client：

# -quiet：s_client会认为行首大写"R"为"RENEGOTIATING"的指令，不继续执行，因此需要加上这个条件以屏蔽之，据说改为小写即可通过，尚未试过。
# -crlf：邮件内容以"."结尾，否则难以结束正文。。

 $ openssl s_client -connect smtp.gmail.com:465 -quiet -crlf

 depth=0 /C=US/ST=California/L=Mountain View/O=Google Inc/CN=smtp.gmail.com
 verify error:num=20:unable to get local issuer certificate
 verify return:1
 depth=0 /C=US/ST=California/L=Mountain View/O=Google Inc/CN=smtp.gmail.com
 verify error:num=27:certificate not trusted
 verify return:1
 depth=0 /C=US/ST=California/L=Mountain View/O=Google Inc/CN=smtp.gmail.com
 verify error:num=21:unable to verify the first certificate
 verify return:1
 220 mx.google.com ESMTP 23sm5653149pzk.2

 EHLO YOURNAME
 250-mx.google.com at your service, [127.0.0.1] #--YOUR IP ADDRESS

 250-SIZE 35651584
 250-8BITMIME
 250-AUTH LOGIN PLAIN
 250-ENHANCEDSTATUSCODES
 250 PIPELINING

 AUTH LOGIN
 334 VXNlcm5hbWU6

 xxxxxxxxxxxxxxxxxxxxxxxx #--base64_encode（"XXX@gmail.com"）

 334 UGFzc3dvcmQ6

 xxxxxxxx #--base64_encode("MY PASSWORD")

 235 2.7.0 Accepted

 MAIL FROM: XXX@gmail.com
 250 2.1.0 OK 23sm5653149pzk.2

 RCPT TO: XXX@hotmail.com
 250 2.1.5 OK 23sm5653149pzk.2

 DATA
 354  Go ahead 23sm5653149pzk.2

 SUBJECT: MySubject testing #--邮件标题

 my contents #--邮件内容

 . (回车换行) #--邮件内容结束符

 250 2.0.0 OK 1267609782 23sm5653149pzk.2 #--表邮件发送成功


 QUIT
 221 2.0.0 closing connection 23sm5653149pzk.2
 read:errno=0
-->


<?php
    function mail_command($fp, $message="")
    {
        if ($message) fputs($fp, $message."\r\n"); 
        $return = fgets($fp, 512);
		var_dump($return);
		echo '<br />';
        return $return;
    }

    function send_mail($to, $from, $message, $subject)
    {
        $smtp = "ssl://smtp.gmail.com";
        $port = 465;
        $check = 1; //0-不进行身份验证；1-进行身份验证

      if ($check == 1) {
            $username = "webmaster@kuai77.com";
            $password = "2wsx#EDC";
        }
		var_dump($host,$port,$ischeck,$user,$password);
		echo '<br />';

        $fp = fsockopen($smtp, $port);
        if (!$fp ) return -1;

        $lastmessage = mail_command($fp);
        if (substr($lastmessage, 0, 3) != 220 ) return -2;

        $yourname = "single test"; //随便
      if($check == "1") $lastact="EHLO ".$yourname;
        else $lastact="HELO ".$yourname;

        $lastmessage = mail_command($fp, $lastact);
        if (substr($lastmessage, 0, 3) != 250 ) return -3;

        while (true && $check) {
            $lastmessage = mail_command($fp);
            if ( (substr($lastmessage, 3, 1) != "-") or (empty($lastmessage)) )
            break;
        }

        //身份验证
      if ($check == "1") {
		  echo 'login <br />';
            //验证开始
        $lastact="AUTH LOGIN";
            $lastmessage = mail_command($fp, $lastact);
            if (substr($lastmessage, 0, 3) != 334) return -4;

             //用户姓名
        $lastact = base64_encode($username);
            $lastmessage = mail_command($fp, $lastact);
            if (substr($lastmessage,0,3) != 334) return -5;

             //用户密码
        $lastact = base64_encode($password);
            $lastmessage = mail_command($fp, $lastact);
            if (substr($lastmessage,0,3) != "235") return -6;
        }

        //FROM:
        $lastact = "MAIL FROM: <".$from.">";
        $lastmessage = mail_command($fp, $lastact);
        if (substr($lastmessage,0,3) != 250) return -7;

        //TO:
        $lastact = "RCPT TO: <".$to.">";
        $lastmessage = mail_command($fp, $lastact);
        if (substr($lastmessage,0,3) != 250) return -8;

        //DATA
        $lastact = "DATA";
        $lastmessage = mail_command($fp, $lastact);
        if (substr($lastmessage, 0, 3) != 354) return -9;

        //MESSAGE
        $message = "SUBJECT: ".$subject."\r\n\r\n".$message."\r\n\r\n.";
        $lastmessage = mail_command($fp, $message);
        //QUIT
        $lastact = "QUIT";
        $lastmessage = mail_command($fp, $lastact);
        fclose($fp);

        return 0;
    }

    //test
    $content = "sfsfsdafsa\r\nsfsdafsafdsa\r\ndafdsfsafsdfdsafds";
    var_dump(send_mail("88626619@qq.com", "webmaster@kuai77.com", $content,date('Y-m-d H:m:s',time())));
    
    ?>