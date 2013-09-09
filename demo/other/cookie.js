function delCookie(name){
   var date = new Date();
   date.setTime(date.getTime() - 10000);
   document.cookie = name + "=a; expires=" + date.toGMTString();
}


function setCookie(c_name,value,expiredays,path,domain){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	
	var cookie_str=c_name+ "=" +escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString())+
	((path==null)?"":";path="+path)+
	((domain==null)?"":";domain="+domain)
	document.cookie=cookie_str;
}

function getCookie(c_name){
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1) { 
    		c_start=c_start + c_name.length+1 
    		c_end=document.cookie.indexOf(";",c_start)
    		if (c_end==-1) c_end=document.cookie.length
    		return unescape(document.cookie.substring(c_start,c_end))
    	} 
  	}
	return ""
}

/*　　
	NAME=VALUE：
　　这是每一个Cookie均必须有的部分。NAME是该Cookie的名称，VALUE是该Cookie的值。在字符串"NAME=VALUE"中，不含分号、逗号和空格等字符。

　　Expires=DATE：Expires变量是一个只写变量，它确定了Cookie有效终止日期。该属性值DATE必须以特定的格式来书写：星期几，DD－MM－YY HH:MM:SS GMT，GMT表示这是格林尼治时间。反之，不以这样的格式来书写，系统将无法识别。该变量可省，如果缺省时，则Cookie的属性值不会保存在用户的硬盘中，而仅仅保存在内存当中，Cookie文件将随着浏览器的关闭而自动消失。

　　Domain=DOMAIN－NAME:Domain该变量是一个只写变量，它确定了哪些Internet域中的Web服务器可读取浏览器所存取的Cookie，即只有来自这个域的页面才可以使用Cookie中的信息。这项设置是可选的，如果缺省时，设置Cookie的属性值为该Web服务器的域名。

　　Path=PATH：Path属性定义了Web服务器上哪些路径下的页面可获取服务器设置的Cookie。一般如果用户输入的URL中的路径部分从第一个字符开始包含Path属性所定义的字符串，浏览器就认为通过检查。如果Path属性的值为"/"，则Web服务器上所有的WWW资源均可读取该Cookie。同样该项设置是可选的，如果缺省时，则Path的属性值为Web服务器传给浏览器的资源的路径名。
　　可以看出我们借助对Domain和Path两个变量的设置，即可有效地控制Cookie文件被访问的范围。
	
　　Secure：在Cookie中标记该变量，表明只有当浏览器和Web Server之间的通信协议为加密认证协议时，浏览器才向服务器提交相应的Cookie。当前这种协议只有一种，即为HTTPS。
*/