var stores_count=0;
var stores=new Array();
var imglist=new Array();
var shadow
var shape;
var initImages=function(){
	var path="mkrImages/";
	var char="A";
	shadow=path+'shadow.png';
	shape={coord: [0, 10, 10],type: 'circ'};
	for(var i=0,thischar;i<26;i++){
		thischar=modChar(char,i);
		imglist.push(path+'red_Marker'+thischar+'.png');
	}
}

var updateMap=function(obj){
	//获取中心的经纬度
	kmap.clrmkrs();
	document.getElementById('storeList').innerHTML='';
	for(var i=0,j=0,shu=stores.length;i<shu;i++)
	{
		var index=null;
		var images={}
		if(stores[i]!=undefined){
			if(stores[i].wLocLat=='0' || stores[i].wLocLong=='0'){
				continue;	
			}
			var latlng=kmap.isInMap(kmap.map,stores[i].wLocLat,stores[i].wLocLong);
			if(latlng){
				index=j;
				if(imglist[j]!=undefined){
					images.image=imglist[j];
					images.shadow=shadow;
					images.shape=shape;
				}
				kmap.addmkrs(latlng,images,index);
				kmap.createwin(stores[i],index);
				addstore(stores[i],images,index);
				j++;
			}
		}
	}
	stores_count=j;
	document.getElementById('count').innerHTML=stores_count;
	if(arguments[1]){
		document.getElementById('addr').innerHTML=arguments[1];
	}
}

var newinfo=function(obj){
	var str='<div id="content">';
	str+='<div><b>'+obj.wName+'</b></div>';
	str+='<div>'+obj.wAddr+' '+obj.wCity+'</div>';
	if(obj.wPhoneNo)str+='<div>t. '+obj.wPhoneNo+'</div>';
	if(obj.wWebAddr){
		str+='<div><a href="'+obj.wWebAddr+'">» View Website</a></div>';	
	}
	str+='<div><a target="_blank" href="http://maps.google.com/maps?daddr='+obj.wAddr+' '+obj.wCity+'">» Get Driving Directions</a></div>';	
	str+='</div>';
	return str;
}

function loadstrores(file)
{
	var temp;
	var temparr;
	var wid;
	var inarr;
	var tempstr;
	var xmlDoc=loadXMLDoc(file);
	var xmls=xmlDoc.getElementsByTagName('Store');
	for(var i=0,shu=xmls.length;i<shu;i++)
	{
		wid=null;
		temparr=new Array();
		temp=xmls[i].childNodes;
		for(var j=0,k=0,shu2=temp.length;j<shu2;j++){
			if (temp[j].nodeType==1){
				if(temp[j].nodeName=='wId')wid=temp[j].childNodes[0].nodeValue;
				inarr='\"'+temp[j].nodeName+'":"'+temp[j].childNodes[0].nodeValue+'"';
				temparr.push(inarr);
				k++;
			}
		}
		stores[wid]=eval("({"+temparr.toString()+"})");
	}
	return;
}

var addstore=function(store,images,index){
	var image='icon.gif';
	image=images.image?images.image:image;
	var li=document.createElement('li');
	var content='<div class="icon"><img src="'+image+'" width="20" height="34" /></div>';
	content+='<h2>'+store.wName+'</h2><div>'+store.wAddr+' '+store.wCity+'</div>';
	if(store.wPhoneNo)content+='<div>t. '+store.wPhoneNo+'</div>';
	content+='<div><a href="javascript:void(0)" onclick="popwin('+index+')">»View Store Details</a></div>';
	li.innerHTML=content;
	document.getElementById('storeList').appendChild(li);
	return;
}

var popwin=function(num){
	if(kmap.currentInfo)kmap.currentInfo.close();
	kmap.infowins[num].open(kmap.map,kmap.markers[num]);
	kmap.currentInfo=kmap.infowins[num];
}

var parseJSON=function(str){
	if(str=='')str=null;
	object=eval("("+str+")");
	return object;
}

var modChar=function(char,num){
	var code;
	code=(char && char!='')?char.charCodeAt(0):null;
	if(code){
		code=(num!=undefined && num!=null)?code+num:code+1;
		char=String.fromCharCode(code);
	}else{
		char=false;
	}
	return char;
}


function submitfrm(){
	var frm_text=document.getElementById('text_locate').value;
	if(frm_text!='' && frm_text!='enter postal code or city'){
		document.getElementById('frm').submit();
	}
}

function input(evt,value)
{
	if(value=='')return false;
	var oEvent=getEvent(evt);
	if(checkCode(oEvent.keyCode)){
		kmap.searchAddress(value,updateMap);
	}
}

var checkCode=function(num)
{//check keyCode for inputbox
	if(num==13)
		return true;
	else
		return false;
}

function getEvent(oEvt)
{//event for diff browser
	return oEvt?oEvt:(window.event?window.event:null);
}