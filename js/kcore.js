(function(){
	//kc的命名空间
	if(!window.kl){window["kl"]={};}
	var _=this,
		_ACC_RE=/[0-9a-zA-Z_-]{3,20}/,
		_EMAIL_RE=/"^[\w-.]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i,
		_PHONE_RE=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})? $/,
		_MOBILE_RE=/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|1[58][0123456789]\d{8}$"/,
		_TRIM_RE=/"(^\s)|(\s$)"/,
		_HTML_TAG_RE=/\s*<(?:\n|\r|.)*?>\s*/gi,//html tag
		_SCRIPT_RE=/"<script[^>]*>(?:\n|\r|.)*?<\/script>/img,//script tag
		_STYLE_RE=/<style[^>]*>(?:\n|\r|.)*?<\/style>/img,//style tag
		_ISINT_RE=/^\d*$/img,
		_ISFLOAT_RE=/^[-+]?[0-9]*\.?[0-9]+$/img,
		DOM=window.document,
		ELS=DOM.all || DOM.getElementsByTagName("*");
		class2type={};
		
	_.isIE=!-[1,];
	_.IE6=isIE&&!window.XMLHttpRequest;
	_.IE8=isIE&&!!document.documentMode;
	_.isIE7=isIE&&!IE6&&!IE8,
	
	window.kl=(function(){
		var kl=function(){
			var dom=typeof(arguments[0])=='string' ? document.getElementById(arguments[0]) : arguments[0];
			return typeof(dom)==undefined ? dom : null;
		}
		
		return kl;
	})();
	
	kl.isArray=function(obj){
		return type(obj)==="array";
	}
	
	kl.isFunction=function(obj){
		return type(obj)==='function';
	}
	
	kl.isInt=function(s){
			return !isNaN(s) && s.match(_ISINT_RE)!==null ? s : false;
	}
	
	kl.isFloat=function(s){
		document.write(s+": "+!isNaN(s)+'<br />');
		return !isNaN(s) && s.match(_ISFLOAT_RE)!==null ? s : false;
	}
	
	kl.autoFloat=function(id){
		_self=this;
		_self.divBox=document.getElementById(id);
		_self.divBox.parentNode.style.position="relative";
		_self.divBox.style.zIndex="9999";
		_self.divBox.style.display="block"
		_self.divBox.style.position = !isIE6 ? "fixed" : "absolute";
		_self.divBox.style.marginTop = - _self.divBox.offsetHeight / 2 + "px";
		addEvt(window,"scroll",function(){_self.divBox.style.marginTop=document.documentElement.scrollTop - _self.divBox.offsetHeight / 2 + "px";});
	}
	
	kl.backTop=function(btnId){
		var btn=document.getElementById(btnId);
		var d=document.documentElement;
		btn.onclick=function (){
			this.timer=setInterval(function(){
			d.scrollTop-=Math.ceil(d.scrollTop*0.1);
			if(d.scrollTop==0) clearInterval(btn.timer);
			},10);
		};
		function set(){btn.style.display=d.scrollTop?'block':"none"}
	}; 
	
	/*
	* change the same name checkbox state 
	*	string name  		element.name
	*	boolean isTagName	choose the cache function, if true name is tagName, else name is element.name
	*	
	*/
	_.checkall=function(name){
		if(name=='') return false;
		
		var aCache=getCheckBoxes(name);
		
		if(aCache.length>0){
			for(var i=0,shu=aCache.length;i<shu;i++){
				aCache[i].checked=aCache[i].checked?false:true;
			}
		}
		
		return true;
	}
	
	function getCheckBoxes(name){
		var a=new Array(),
		els = typeof(name)==="string" ? document.getElementsByName(name) : document.getElementsByTagName("input");
		
		for(var i in els){
			a.push(els[i]);
		}
		
		return a;
	}
	
	kl.getForm=function(id){
		var o={},
		f=document.getElementById(id);
		if(f){
			for(var i in f.elements){
				if(f.elements[i].name!==''){
					o[f.elements[i].name] = f.elements[i].value;
				}
			}
		}
		return o;
	}
	
	kl.setOpacity=function(el,i){
		if(window.getComputedStyle){// for non-IE
			el.style.opacity = i;
		}else if(document.documentElement.currentStyle){ // for IE
			if(!el.currentStyle.hasLayout){
				el.style.zoom = 1;
			}
			
			if(!el.currentStyle.hasLayout){ //在IE8中zoom不生效，所以再次设置inline-block
				el.style.display = 'inline-block';
			}
			
			try{
				//测试是否已有filter
				//http://msdn.microsoft.com/en-us/library/ms532847%28VS.85%29.aspx
				if(el.filters){
					if(el.filters('alpha')){
						el.filters('alpha').opacity = i * 100;
					}else{
						el.style.filter += 'alpha(opacity='+ i * 100 +')';
					}
				}
			}catch(e){
				el.style.filter = 'alpha(opacity='+ i * 100 +')';
			}
		}
	}
	
	//获取CSS opacity 属性值的函数
	//借鉴自http://developer.yahoel.com/yui/docs/YAHOO.util.Dom.html#method_getStyle
	kl.getOpacity = function(el){
		var value;
		if(window.getComputedStyle){
			value = el.style.opacity;
			if(!value){
				value = el.ownerDocument.defaultView.getComputedStyle(el,null)['opacity'];
			}
			return value;
		}else if(document.documentElement.currentStyle){
			value = 100;
			try { // will error if no DXImageTransform
				value = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
			} catch(e) {
				try { // make sure its in the document
					value = el.filters('alpha').opacity;
				} catch(err) {
					
				}
			}
			return value / 100;
		}
	}
	
	kl.ellipsis=function(d){//ellipsis words in the div
		var width=d.getAttribute("rel");
		width=width!=null?width:d.offsetWidth;
		d.style.width=width+"px";
		d.style.display="block";
		d.style.overflow="hidden";
		d.style.textOverflow="ellipsis";
		d.style.whiteSpace="nowrap";
		return;
	}
	
	/* get time from the client browser */
	kl.getTimes=function(){
		var date=new Date();
		var h=date.getHours();
		var m=date.getMinutes();
		var s=date.getSeconds();
		m=m<10?"0"+m:m;
		s=s<10?"0"+s:s;
		return h+":"+m+":"+s;
	}
	
	kl.getPos=function(e){
		var left=e.offsetLeft;
		var top=e.offsetTop;
		var curEl=e.offsetParent;
		while(curEl!==null){
			left += curEl.offsetLeft;
			top += curEl.offsetTop;
			curEl = curEl.offsetParent;
		}
		var pos={left:left,top:top}
		return pos;
	}
	
	var getmPos=function(e){
		
	}
	
	kl.getIframe=function(id){
		if(id==undefined || id==null || id=='')return null;
		var iframe=document.getElementById(id);
		if(iframe==undefined)return null;
		var dom=iframe.contentDocument||iframe.contentWindow.document;//contentWindow for ie
		return dom;
	}
	
	kl.NumOnly=function(){
		var o=document.getElementsByClassName("NumOnly");
		for(var i=0,shu=o.length;i<shu;i++){
			NumLoad(o)
		}
		return;
	}
	
	kl.setCookie=function(c_name,value,expiredays,path,domain){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays);
		
		var cookie_str=c_name+ "=" +escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString())+
		((path==null)?";path=/":";path="+path)+
		((domain==null)?"":";domain="+domain)
		document.cookie=cookie_str;
	}
	
	kl.getCookie=function(c_name){
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
	
	kl.delCookie=function (c_name){
	   var date = new Date();
	   date.setTime(date.getTime() - 10000);
	   document.cookie = c_name + "=a; expires=" + date.toGMTString();
	}
	
	/*
	* add a simple listener of dom events for DOM
	*	object element  dom object
	*	string type		type of dom event
	*	object func		function for event handler
	*	
	*/
	kl.addEvent=function(element,type,func){
		if(element.attachEvent){
			element[type+func]=function(){func(window.event);}
			element.attachEvent("on"+type,element[type+func]);
		}else{
			element.addEventListener(type,func,false);
		}
	}
	
	kl.removeEvent=function(element,type,func){
		if(element.detachEvent){
			element[type+func]=function(){func(window.event);}
			element.detachEvent("on"+type,element[type+func]);
		}else{
			element.removeEventListener(type,func,false);
		}
	}
	
	kl.getEvent=function(e){
		return e ? e : window.event;
	}
	
	kl.stop=function(e)
	{	if(!e)e=arguments[0];
		if (e && e.stopPropagation){//for notIE
			e.preventDefault();//阻止默認行為
			e.stopPropagation();//阻止事件傳遞
		}else{//for IE
			window.event.returnValue=false;//阻止默認行為
			window.event.cancelBubble=true;//阻止冒泡
		}
	}
	
	function NumLoad(o,isFloat){
		 //onkeydown="return num_input_limit(event,this.value)" onpaste="return false" ondragenter="return false" style="ime-mode:Disabled"
		 o[i].style.imeMode="Disabled";
		 o[i].ondragenter=function(event){
			 preventDefault(event);
		 }
		 o[i].onpaste=function(event){
			 preventDefault(event);
		 }
		 o[i].onkeydown=function(event){
			var e=getEvent(event);
			var n=e.keyCode;
			if((n>=48 && n<=57) || (n>=96 && n<=105) || (n>=37 && n<=40) || n==8 || n==46 || n==110 || n==190){
				return true;
			}else{
				preventDefault(event);
			}
		 }
		 
		 o[i].onkeyup=function(event){

		 }
		
		function preventDefault(e){
			if(!e)e=arguments[0];
			if(e && e.preventDefault){
				e.preventDefault();
			}else{
				window.event.returnValue=false;//for IE
			}
		}
	}
	
	kl.ajax=function(cfg){//Asynchronous JavaScript XML 
		var method=cfg.method || "POST",
		type=cfg.type || 'text',
		header=cfg.header || "application/x-www-form-urlencoded",
		async=cfg.async===false?false:true,
		cache=cfg.cache===false?false:true,
		rand=!cfg.cache?Math.round(Math.random()*1000):0,
		url=cfg.url,
		param=cfg.param?cfg.param.serialize():null,
		timeout=Number(cfg.timeout)*1000 || 30,
		timing=null,
		b4send=cfg.b4send || function(){},
		receiving=cfg.receiving || function(){},
		success=cfg.success || function(){},
		xhr=getXhr();
		if(Boolean(rand)){
			url+=url.match(/\?/)===null ? "?v="+rand : "&v="+rand;
		}
		
		return request();
		
		function request(){
			if(xhr){
				if(timeout){
					timing=window.setInterval(function(){xhr.abort();},timeout);
				}
				// Setup a function for the server to run when it's done
				addEvent(xhr,'readystatechange',function(){
					res=parseRes.call(this,type);
					switch(this.readyState){
						case 1:
							b4send.call(this,this.statusText);
							break;
						case 2:
							break;
						case 3:
							this.status==200 && receiving.call(this,res,this.statusText);
							break;
						case 4:
							this.status==200 && success.call(this,res,this.statusText);
							break;
						default:
							break;
					}

				});
				// Open a connection to the server
				xhr.open(method,url,async);
				method==="POST" && xhr.setRequestHeader("Content-type",header);
				xhr.send(param);
				async || func(xhr.responseText);
			}
			return;
		}
		
		function parseRes()
		{
			var res=false;
			switch(type){
				case 'xml':
					res=this.responseXML;
					break;
				case 'json':
					break;
				case 'html':
					break;
				case 'script':
					break;
				default:
					res=this.responseText;
					break;
			}
			return res;
		}
	}
	
	function getXhr()
	{//兼容各浏览器获取XmlHttpRequest对象
		var xhr;
		if(window.XMLHttpRequest){
			xhr = new XMLHttpRequest();
		}else{
			try {
				  xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (err) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (err) {
					xhr = false;
				}
			}
		}
		
		return xhr;
	}
	
	function type(obj){
		return obj==null ? String(obj) : class2type[Object.prototype.toString.call(obj)] || 'object';
	}
	
	String.prototype.trim=function(){//去除字符串首尾空白
		return this.replace(_TRIM_RE,"");
	}
	
	Object.prototype.serialize=function(){//序列化
		var o=this,
		s,
		a=[];
		for(var i in o){
			if(typeof(o[i])!='function'){
				a.push(i+"="+escape(o[i]));
			}
		}
		s=a.length>0?a.join("&"):'';
		return s;
	}
	
	var arr=['Boolean','Number','String','Function','Array','Date','RegExp','Object'];
	for(var i=0,shu=arr.length;i<shu;i++){
		class2type["[object " + arr[i] + "]"]=arr[i].toLowerCase();
	}
	
	//its for kcore create object
	window.kl.prototype={
		
	}
	
	var els=DOM.all || DOM.getElementsByTagName("*");


	if(document.getElementsByClassName==undefined){//IE没有getELementsByClassName方法
		document.getElementsByClassName=function(className,parents){
			var dom=parents || DOM,
			els=[],
			patten = new RegExp("(^|\\s)" + className + "(\\s|$)","g"),
			all=dom.getElementsByTagName("*");
			for(var i=0,shu=all.length;i<shu;i++){
				//如果是节点元素并拥有className并跟参数1匹配的节点则入栈
				if(all[i].nodeType=='1' && all[i].className!='' && all[i].className.match(patten)!=null){
					els.push(all[i]);
				}
			}
			return els;
		}
	}

	if(isIE){
//		addEvent(window,'load',function(){
//			var a=document.getElementsByTagName("a");
//			for(var i=0,q=a.length;i<q;i++){
//				a[i].hideFocus=true;
//			}
//		});
	}
	
	if(window.JSON===undefined){//IE9前没有JSON对象
		//添加String原型方法paseJSON
		String.prototype.parseJSON=function(){
			try{
				return (new Function('return '+this))();//使用函数对象返回json对象实例
			}catch(e){
				return false;
			}
		}
		
		Object.prototype.toJSON=function(){
			var json=[];
			for(var i in this){
				switch(true){
					case typeof(this[i])==='string':
						json.push('"'+i+'":"'+this[i]+'"');
						break;
					case typeof(this[i])==='number':
						json.push('"'+i+'":'+this[i]);
						break;
					case typeof(this[i])==='object':
						json.push(this[i].toJSON());
						break;
					case typeof(this[i])==='array':
						for(var j=0,shu=this[i].length;j<shu;j++){
							if(typeof(this[i][j])=="object"){
								this[i][j]=this[i][j].toJSON();
							}
						}
						json.push(this[i].toSource());
						break;
					default:
						break;
				}
			}
			return "{"+json.toString()+"}";
		}
		//IE模拟firefoxJSON对象下的parse函数
		window.JSON={
			parse:function(s){
				return s.parseJSON();
			},
			stringify:function(o){
				return o.toJSON();
			}
		}
	}
	
})();