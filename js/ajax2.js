function ajax(url,data,success,dataType){
	if(typeof(data)=='function'){
		success=data;
		data=null;
	}
	
	switch(url.substr(0,url.indexOf(':')).toUpperCase()){
		case'GET':
			var method='GET';
			url=url.substr(method.length+1,url.length);
			break;
		case'POST':
			var method='POST';
			url=url.substr(method.length+1,url.length);
			break;
		default:
			var method='GET'
	}
	
	var dataJson='';
	if(data!=null){
		data=[data];
		for(var key in data){
			for(var k in data[key]){
				dataJson+=k+'='+data[key][k]+'&'
			}
		}
		data=dataJson.substr(0,dataJson.length-1)
	}
	
	var xml=window.XMLHttpRequest?new XMLHttpRequest():new ActiveXobject('Microsoft.XMLHTTP');
	
	if(method=='POST'){
		xml.open(method,url,true);
		xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		xml.send(data)
	}else{
		xml.open(method,data!=null?url+'?'+data:url,true);
		xml.send(null)
	}
	
	xml.onreadystatechange=function(){
		if(xml.readyState==4&&xml.status==200){
			var testStatus='success';
			var XHR=xml;
			var data=xml.responseText;success(data,testStatus,XHR)
		}
	}
}