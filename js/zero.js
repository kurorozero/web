// JavaScript Document
if(!window.$ && !window.jquery !window.mySpace){
	(function(window){
		var mySpace=(function(){
			var mySpace=function(s){
				return new mySpace.ex.init(s);
			}	// Map over jQuery in case of overwrite
			_mySpace = window.mySpace,
		
			// Map over the $ in case of overwrite
			_$ = window.$,
		
		
			// A simple way to check for HTML strings or ID strings
			// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
			quickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
		
			// Check if a string has a non-whitespace character in it
			rnotwhite = /\S/,
		
			// Used for trimming whitespace
			trimLeft = /^\s+/,
			trimRight = /\s+$/,
		
			// Check for digits
			rdigit = /\d/,
		
			// Match a standalone tag
			rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
		
			// JSON RegExp
			rvalidchars = /^[\],:{}\s]*$/,
			rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
			rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
			rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
		
			// Useragent RegExp
			rwebkit = /(webkit)[ \/]([\w.]+)/,
			ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
			rmsie = /(msie) ([\w.]+)/,
			rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
		
			// Matches dashed string for camelizing
			rdashAlpha = /-([a-z]|[0-9])/ig,
			rmsPrefix = /^-ms-/,
			_ACC_RE=/[0-9a-zA-Z_-]{3,20}/,
			_EMAIL_RE=/"^[\w-.]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i,
			_PHONE_RE=/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})? $/,
			_MOBILE_RE=/^((\(\d{3}\))|(\d{3}\-))?13[0-9]\d{8}|1[58][0123456789]\d{8}$"/,
			_TRIM_RE=/"(^\s)|(\s$)"/,
			_BLANK_RE=/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+\x24)/,
			_HTML_TAG_RE=/\s*<(?:\n|\r|.)*?>\s*/gi,//html tag
			_SCRIPT_RE=/"<script[^>]*>(?:\n|\r|.)*?<\/script>/img,//script tag
			_STYLE_RE=/<style[^>]*>(?:\n|\r|.)*?<\/style>/img,//style tag
			_ISINT_RE=/^\d*$/img,
			_ISFLOAT_RE=/^[-+]?[0-9]*\.?[0-9]+$/img,
			// Used by jQuery.camelCase as callback to replace()
			fcamelCase = function( all, letter ) {
				return ( letter + "" ).toUpperCase();
			},
		
			// Keep a UserAgent string for use with jQuery.browser
			userAgent = navigator.userAgent,
		
		
			// Save a reference to some core methods
			toString = Object.prototype.toString,
			hasOwn = Object.prototype.hasOwnProperty,
			push = Array.prototype.push,
			slice = Array.prototype.slice,
			trim = String.prototype.trim,
			indexOf = Array.prototype.indexOf,
			DOM=window.document,
			ELS=DOM.all || DOM.getElementsByTagName("*"),
			isIE=!-[1,],
			isIE6=isIE&&!window.XMLHttpRequest,
			isIE8=isIE&&!!document.documentMode,
			isIE7=isIE&&!isIE6&&!isIE8,
			// [[Class]] -> type pairs
			class2type = {};
			
			mySpace.ex=mySpace.prototype={
				constructor:mySpace,
				init:function(str){
					return this;
				}
			};
	
			mySpace.ex.init.prototype=mySpace.ex;
			
			mySpace.extend=mySpace.ex.extend=function(){
				var options, name, src, copy, copyIsArray, clone,
					target = arguments[0] || {},
					i = 1,
					length = arguments.length,
					deep = false;
			
				// Handle case when target is a string or something (possible in deep copy)
				if ( typeof target !== "object" && typeof target !== "function" ) {
					target = {};
				}
			
				// extend jQuery itself if only one argument is passed
				if ( length === i ) {
					target = this;
					--i;
				}
			
				for ( ; i < length; i++ ) {
					// Only deal with non-null/undefined values
					if ( (options = arguments[ i ]) != null ) {
						// Extend the base object
						for ( name in options ) {
							src = target[ name ];
							copy = options[ name ];
			
							// Prevent never-ending loop
							if ( target === copy ) {
								continue;
							}
			
							if ( copy !== undefined ) {
								target[ name ] = copy;
							}
						}
					}
				}
				// Return the modified object
				return target;
			}
	
			mySpace.extend({
				noConflict: function( deep ) {
					if ( window.$ === mySpace ) {
						window.$ = _$;
					}
			
					if ( deep && window.mySpace === mySpace ) {
						window.mySpace = _mySpace;
					}
			
					return mySpace;
				},
			
				// Is the DOM ready to be used? Set to true once it occurs.
				isReady: false,
			
				// A counter to track how many items to wait for before
				// the ready event fires. See #6781
				readyWait: 1,
			
				// See test/unit/core.js for details concerning isFunction.
				// Since version 1.3, DOM methods and functions like alert
				// aren't supported. They return false on IE (#2968).
				isFunction: function( obj ) {
					return mySpace.type(obj) === "function";
				},
			
				isArray: Array.isArray || function( obj ) {
					return mySpace.type(obj) === "array";
				},
			
				// A crude way of determining if an object is a window
				isWindow: function( obj ) {
					return obj && typeof obj === "object" && "setInterval" in obj;
				},
			
				isNaN: function( obj ) {
					return obj == null || !rdigit.test( obj ) || isNaN( obj );
				},
			
				type: function( obj ) {
					return obj == null ?
						String( obj ) :
						class2type[ toString.call(obj) ] || "object";
				},
			
				isPlainObject: function( obj ) {
					// Must be an Object.
					// Because of IE, we also have to check the presence of the constructor property.
					// Make sure that DOM nodes and window objects don't pass through, as well
					if ( !obj || mySpace.type(obj) !== "object" || obj.nodeType || mySpace.isWindow( obj ) ) {
						return false;
					}
			
					try {
						// Not own constructor property must be Object
						if ( obj.constructor &&
							!hasOwn.call(obj, "constructor") &&
							!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
							return false;
						}
					} catch ( e ) {
						// IE8,9 Will throw exceptions on certain host objects #9897
						return false;
					}
			
					// Own properties are enumerated firstly, so to speed up,
					// if last one is own, then all properties are own.
			
					var key;
					for ( key in obj ) {}
			
					return key === undefined || hasOwn.call( obj, key );
				},
			
				isEmptyObject: function( obj ) {
					for ( var name in obj ) {
						return false;
					}
					return true;
				},
			
				error: function( msg ) {
					throw msg;
				},
			
				parseJSON: function( data ) {
					if ( typeof data !== "string" || !data ) {
						return null;
					}
			
					// Make sure leading/trailing whitespace is removed (IE can't handle it)
					data = mySpace.trim( data );
			
					// Attempt to parse using the native JSON parser first
					if ( window.JSON && window.JSON.parse ) {
						return window.JSON.parse( data );
					}
			
					// Make sure the incoming data is actual JSON
					// Logic borrowed from http://json.org/json2.js
					if ( rvalidchars.test( data.replace( rvalidescape, "@" )
						.replace( rvalidtokens, "]" )
						.replace( rvalidbraces, "")) ) {
			
						return (new Function( "return " + data ))();
			
					}
					mySpace.error( "Invalid JSON: " + data );
				},
			
				// Cross-browser xml parsing
				parseXML: function( data ) {
					var xml, tmp;
					try {
						if ( window.DOMParser ) { // Standard
							tmp = new DOMParser();
							xml = tmp.parseFromString( data , "text/xml" );
						} else { // IE
							xml = new ActiveXObject( "Microsoft.XMLDOM" );
							xml.async = "false";
							xml.loadXML( data );
						}
					} catch( e ) {
						xml = undefined;
					}
					if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
						mySpace.error( "Invalid XML: " + data );
					}
					return xml;
				},
	
				// args is for internal usage only
				each: function( object, callback, args ) {
					var name, i = 0,
						length = object.length,
						isObj = length === undefined || mySpace.isFunction( object );
			
					if ( args ) {
						if ( isObj ) {
							for ( name in object ) {
								if ( callback.apply( object[ name ], args ) === false ) {
									break;
								}
							}
						} else {
							for ( ; i < length; ) {
								if ( callback.apply( object[ i++ ], args ) === false ) {
									break;
								}
							}
						}
			
					// A special, fast, case for the most common use of each
					} else {
						if ( isObj ) {
							for ( name in object ) {
								if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
									break;
								}
							}
						} else {
							for ( ; i < length; ) {
								if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
									break;
								}
							}
						}
					}
			
					return object;
				},
	
				inArray: function( elem, array ) {
					if ( !array ) {
						return -1;
					}
			
					if ( indexOf ) {
						return indexOf.call( array, elem );
					}
			
					for ( var i = 0, length = array.length; i < length; i++ ) {
						if ( array[ i ] === elem ) {
							return i;
						}
					}
			
					return -1;
				},
			
				merge: function( first, second ) {
					var i = first.length,
						j = 0;
			
					if ( typeof second.length === "number" ) {
						for ( var l = second.length; j < l; j++ ) {
							first[ i++ ] = second[ j ];
						}
			
					} else {
						while ( second[j] !== undefined ) {
							first[ i++ ] = second[ j++ ];
						}
					}
			
					first.length = i;
			
					return first;
				},
			
				// A global GUID counter for objects
				guid: 1,
			
				now: function() {
					return (new Date()).getTime();
				},
			
				browser: {}
			});
			
			// Populate the class2type map
			mySpace.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
				class2type[ "[object " + name + "]" ] = name.toLowerCase();
			});
			
			// Cleanup functions for the document ready method
			if ( document.addEventListener ) {
				DOMContentLoaded = function() {
					document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
					mySpace.ready();
				};
			
			} else if ( document.attachEvent ) {
				DOMContentLoaded = function() {
					// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
					if ( document.readyState === "complete" ) {
						document.detachEvent( "onreadystatechange", DOMContentLoaded );
						mySpace.ready();
					}
				};
			}
			
			// The DOM ready check for Internet Explorer
			function doScrollCheck() {
				if ( mySpace.isReady ) {
					return;
				}
	
				try {
					// If IE is used, use the trick by Diego Perini
					// http://javascript.nwbox.com/IEContentLoaded/
					document.documentElement.doScroll("left");
				} catch(e) {
					setTimeout( doScrollCheck, 1 );
					return;
				}
			
				// and execute any waiting functions
				mySpace.ready();
			}		
	
			return mySpace;
		})();
		
		window.mySpace=window.$=mySpace;
	})(window);
}

$.extend({
	query:function(){
		var oQuery={};
		if(this.uri!==''){
			var aQuery=this.uri.split('&');
			for(var i=0,shu=aQuery.length;i<shu;i++){
				var tmp=aQuery[i].split('=');
				oQuery[tmp[0]]=tmp[1] ? tmp[1] : '';
			}
		}
		return oQuery;
	},
	encodeURI:function(){
		var aQuery=[];
		var oQuery=this.query();
		for(var i in oQuery){
			aQuery.push(i+'='+(oQuery[i] ? encodeURIComponent(oQuery[i]) : oQuery[i]));
		}
		return aQuery.join('&');
	},
	trim:function (s){//去除字符串首尾空白
		return s.replace(_TRIM_RE,"");
	},
	
	delBlank:function (s){
		return ((typeof s).toLowerCase() === 'string') ? s.replace(new RegExp(_BLANK_RE, "g"), "") : false;
	},
	
	serialize:function (o){//序列化
		var s,
		a=[];
		for(var i in o){
			if(typeof(o[i])!='function'){
				a.push(i+"="+escape(o[i]));
			}
		}
		s=a.length>0?a.join("&"):'';
		return s;
	},
	
	isInt:function(s){
		return (typeof s === 'number' || !isNaN(s)) && _ISINT_RE.test(s) ? s : false;
	},
	
	isFloat:function(s){
	//	document.write(s+": "+!isNaN(s)+'<br />');
		return (typeof s === 'number' || !isNaN(s)) && _ISFLOAT_RE.test(s) ? s : false;
	}
});

/* get time from the client browser */
function getTimes(){
	var date=new Date();
	var h=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	m=m<10?"0"+m:m;
	s=s<10?"0"+s:s;
	return h+":"+m+":"+s;
}

//when the user click submit, disable btn
function onSubmitDisable()
{

}

function attr(name,d){
	var attr=false;
	if(d){
		attr=d.getAttribute(name);
	}else{
		var elms=document.getElementsByTagName('*');
		for(var i=0,shu=elms.length;i<shu;i++){
			var attr=elms[i].getAttribute(name);
			if(attr){
				break;
			}
		}
	}
	return attr?attr:false;
}

/*
* change the same name checkbox state 
*	string name  		element.name
*	boolean isTagName	choose the cache function, if true name is tagName, else name is element.name
*	
*/
function checkall(name){
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

function serializeFrom(o){
	var oArr=[],
	sArr=[]
	oFrm={};
	try{
		oArr=o.getElementsByTagName('*');
	}catch(e){
		
	}
//	document.getElementById().checked	
	for(var i=0,shu=oArr.length;i<shu;i++){
		var str="";
		var tagname=oArr[i].tagName.toLowerCase();
		switch(true){
			case tagname==='input' && oArr[i].type==='radio' && oArr[i].checked===true:
				str='value';
				break;
			case tagname==='input' && oArr[i].type==='checkbox' && oArr[i].checked===true:
				str='value';
				break;
			case tagname==='input':
				str='value';
				break;
			case tagname==='select':
				str='value';
				break;
			case tagname==='textarea':
				str='value';
				break;
			default:
				break;
		}

		if(oArr[i].name && str!==""){
//			sArr.push(oArr[i].name+"="+oArr[i][str]);
			oFrm[oArr[i].name]=oArr[i][str]?oArr[i][str]:'';
		}

	}
	
	for(var i in oFrm){
		sArr.push(i+'='+oFrm[i]);
	}
	alert(sArr.join("&"));
	return o;
}

function getPos(e){
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

/**
*	get position by mouse
*	object e	DOM event
*	return object int x, int y
**/
function getmPos(e){
	e=getEvent(e);
	return { 
		x:e.pageX || e.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:e.pageY || e.clientY + document.body.scrollTop - document.body.clientTop
	};
}

//get CSS value
function css(o,cssName){
	var cssProps={
		// normalize float css property
		"float": !!o.style.cssFloat ? "cssFloat" : "styleFloat"
	}

	cssName=!window.getComputedStyle && cssName!=undefined?camelCase(cssName):cssName;
	cssName=cssProps[cssName]||cssName;
	cssName=cssName === "cssFloat" ? "float" : cssName;
	
	return window.getComputedStyle?getComputedStyle(o,null).getPropertyValue(cssName):o.runtimeStyle[cssName]+" "+o.currentStyle[cssName];
	function camelCase(name) {
		return name.replace( /-([a-z]|[0-9])/ig, fcamelCase );
	}
	function fcamelCase( all, letter ) {
		return ( letter + "" ).toUpperCase();
	}
}

function include(url,type,content){
	if(url!==''){
		var head=document.getElementsByTagName('head').item(0),
		d;
		switch(true){
			case content!==undefined && type==='style':
				d=document.createElement('style');
				d.type='text/css';
				d.innerHTML=content;
				break;
			case type==='javascript':
				d=document.createElement('script');
				d.type='text/javascript';
				d.language='javascript';
				d.src=url;
				break;
			case type==='css':
				d=document.createElement('link');
				d.type='text/css';
				d.rel="stylesheet";
				d.href=url;
				break;
			default:
				break;
		}
		head.appendChild(d);
	}
	return;
}

function autoFloat(id){
	var divBox=document.getElementById(id);
	var parent=divBox.parentNode;
	parent.style.position="relative";
	divBox.style.zIndex="9999";
	divBox.style.display="block";
	divBox.style.position = !isIE6 ? "fixed" : "absolute";
	dofloat();
	addEvent(window,"scroll",dofloat);
	addEvent(window,"resize",dofloat);
	function dofloat(){
		var move=document.documentElement.scrollTop - divBox.offsetHeight/2;
		divBox.style.marginTop=move + 'px';
		//divBox.style.marginTop=document.documentElement.clientHeight - divBox.offsetHeight + "px";
		//divBox.innerHTML=document.documentElement.scrollTop+' '+divBox.style.marginTop;
	}
}


/**
*	backTop function
*	return	null
**/
function backTop(){
	var d=document.documentElement,timer;
	timer=setInterval(function(){
		d.scrollTop-=Math.ceil(d.scrollTop*0.1);
		if(d.scrollTop==0) clearInterval(timer);
	},10);
	return;
}

/** 
*	serOpacity function 
*	object	el	documentElement
*	int		i	透明度指数
*	return	null
**/

//获取CSS opacity 属性值的函数
//借鉴自http://developer.yahoel.com/yui/docs/YAHOO.util.Dom.html#method_getStyle
function setOpacity(el,i){
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
	return;
}

/** 
*	getOpacity function 
*	object	el	documentElement
*	return	null
**/
function getOpacity(el){
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

/** 
*	function ellipsis
*	elllipsis string in one line
*	object	d	documentElement
*	return	null
**/
function ellipsis(d){//ellipsis words in the div
	var width=d.getAttribute("rel");
	width=width!=null?width:d.offsetWidth;
	d.style.width=width+"px";
	d.style.display="block";
	d.style.overflow="hidden";
	d.style.textOverflow="ellipsis";
	d.style.whiteSpace="nowrap";
	return;
}

/** 
*	function strlen
*	get string length for utf8 ps: support chinese
*	string	s	string
*	return	null
**/
function strlen(s){
	var len=s.length;
	return s.replace(/[^\x00-\xff]/g,"xx").length; 
}

/** 
*	function getIframe
*	get DOM for iframe
*	object	d	documentElement
*	return	null
**/
function getIframe(id){
	if(id==undefined || id==null || id=='')return null;
	var iframe=document.getElementById(id);
	if(iframe==undefined)return null;
	var dom=iframe.contentDocument||iframe.contentWindow.document;//contentWindow for ie
	return dom;
}

/** 
*	function getIframe
*	get DOM for iframe
*	object	d	documentElement
*	return	null
**/
function NumOnly(){
	var o=document.getElementsByClassName("NumOnly");
	for(var i=0,shu=o.length;i<shu;i++){
		NumLoad(o)
	}
	return;
}

/** 
*	function NumLoad
*	object	o	documentElement
*	boolean isFloat
*	return	null
**/
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
		var n=getKeyCode(event);
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
	return;
}

function getKeyCode(e){
	var event=getEvent(e);
	return event.keyCode;	
}

function setCookie(c_name,value,expiredays,path,domain){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	
	var cookie_str=c_name+ "=" +escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString())+
	((path==null)?";path=/":";path="+path)+
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

function delCookie(c_name){
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
function addEvent(element,type,func){
	if(element.attachEvent){
		element[type+func]=function(){func(window.event);}
		element.attachEvent("on"+type,element[type+func]);
	}else{
		element.addEventListener(type,func,false);
	}
}

function removeEvent(element,type,func){
	if(element.detachEvent){
		element[type+func]=function(){func(window.event);}
		element.detachEvent("on"+type,element[type+func]);
	}else{
		element.removeEventListener(type,func,false);
	}
}

function getEvent(e){
	return e||window.event;
}

function stopALL(e)
{	
	if(!e)e=arguments[0];
	if (e && e.stopPropagation){//for notIE
		e.preventDefault();//阻止默認行為
		e.stopPropagation();//阻止事件傳遞
	}else{//for IE
		window.event.returnValue=false;//阻止默認行為
		window.event.cancelBubble=true;//阻止冒泡
	}
}

function ajax(cfg){//Asynchronous JavaScript XML 
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


var els=DOM.all || DOM.getElementsByTagName("*");


if(document.getElementsByClassName==undefined){//IE没有getELementsByClassName方法
	document.getElementsByClassName=function(className,parents){
		var dom=parents || DOM,
		els=[],
		patten = new RegExp('[^\s]?'+className+'[\s$]?',"g"),
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