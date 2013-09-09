<?php
/*
 * PHP调用谷歌翻译
 * author:野草
 * date:2012/3/23
 * email:129@jinzhe.net
 * site:http://yckit.com
	Google翻译的实现是通过：抓取网页翻译的结果的。
	Bing翻译是调用它的API，纠正官方示例代码的错误。
	Youdao翻译是调用它的API的。
	原文：http://blog.satikey.com/?p=183  
	另外有一些接口可以用，返回的是json数据格式
	
	比如
	
	通过youdao: http://api.satikey.com/?via=youdao&text=翻译示例
	
	通过google: http://api.satikey.com/?via=google&text=翻译示例
	
	通过bing:http://api.satikey.com/?via=bing&text=翻译示例
 
 */
function translate($text,$language='zh-cn|en'){
	if(empty($text))return false;
	@set_time_limit(0);
	$html = "";
	$ch=curl_init("http://google.com/translate_t?langpair=".urlencode($language)."&text=".urlencode($text));
	curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
	curl_setopt($ch,CURLOPT_HEADER, 0);
	curl_setopt($ch,CURLOPT_FOLLOWLOCATION,1);
    $html=curl_exec($ch);
    if(curl_errno($ch))$html = "";
	curl_close($ch);
	if(!empty($html)){
		$x=explode("</span></span></div></div>",$html);
		$x=explode("onmouseout=\"this.style.backgroundColor='#fff'\">",$x[0]);
		return $x[1];
	}else{
		return false;
	}
}
echo translate('개','kr|zh-cn');
?>
