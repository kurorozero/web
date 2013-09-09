

(function () {//Start scope

//Variable list-->private var prefixed '_',other var is uppercased
var _w=this,//window
	_d=_w.document,
	_de=_d.documentElement,
	_b=_d.body,
	_dv=_d.defaultView,
	_toi=parseInt,
	_tof=parseFloat,
	undefined,
	ES="",//empty string
	S=String,
	EA=[],//empty array
	A=Array,
	F=Function,
	EF=F(),//empty function,anonymous function
	O=Object,
	_toS=O.prototype.toString,
	B=Boolean,
	M=Math,
	_euc=encodeURIComponent,
	_duc=decodeURIComponent,
	
	
	_nshistory={},//namespace history pool
	_data={},
	_ =jKit,//jKit short name
	_j=jKitObject,//jKitObject short name
	
	_HE_Text=_d.createTextNode(''),//htmlEncode text node
	_HE_Div=_d.createElement('div'),//htmlEncode div element
	_HD_Div=_HE_Div.cloneNode(false),//htmlDecode div element
	
	_DCHAR_RE=/[^\x00-\xff]/g,

	_SLASH_RE=/[\n\r\t\b\f\\'"]/gi,
	_SLASH_CHARS={'\n':'\\n','\r':'\\r','\t':'\\t','\b':'\\b','\f':'\\f','\\':'\\\\','"':'\\"',"'":"\\'"},

	_HD_RE=/&(?:[a-z]+|#\d+);/gi,//htmlDecode RegExp
	
	_CAMEL_RE=/-[A-Z]/gi,//camelize RegExp
	
	_HTML_TAG_RE=/\s*<(?:\n|\r|.)*?>\s*/gi,//html tag
	
	_SCRIPT_TAG_RE=/<script[^>]*>(?:\n|\r|.)*?<\/script>/img,//script tag
	_STYLE_TAG_RE=/<style[^>]*>(?:\n|\r|.)*?<\/style>/img,//style tag


	dom,//dom helper
	event,//event helper
	NULL=null;//Variable declare end
	
	_HE_Div.appendChild(_HE_Text);//htmlEncode used

function jKit(exp,context) {
	return new _j(exp);
}


_.extend=function (src) {
	var args=EA.slice.call(arguments),i,j,len=args.length;
	if (len==1) len=args.push(this);
	for (i in src) {
		for (j=1;j<len;j++) {
			if (args[j]) args[j][i]=src[i];
		}
	}
	return len==2?args[1]:args.slice(1);
}
_.Browser=(function () {
	var ua=navigator.userAgent,
	Opera=S(_w.opera)=='[object Opera]',
	IE=!Opera && _w.attachEvent;
	return {
		IE:IE,
		IE6:IE && ua.indexOf('MSIE 6')>-1,
		IE7:IE && ua.indexOf('MSIE 7')>-1,
		IE8:IE && ua.indexOf('MSIE 8')>-1,
		Opera:Opera,
		Safari:ua.indexOf('AppleWebKit/') > -1,
		Gecko:ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') === -1
	}
})();
_.Able=(function () {// Able of browser
	var div=document.createElement('div');
	div.innerHTML=' <span style="opacity:.1;"></span><select><option>ABC</option></select>';
	return {
		sliceAny:!_.Browser.IE,//whether can apply slice method on any object,IE will throw an error
		preLW:div.firstChild.nodeType==3,//whether pre leading whitespace
		
		//cssFloat attribute real name,in IE and Opera :'styleFloat',other:'cssFloat'
		//Opera support both 'cssFloat' and 'styleFloat' 
		cssFloat:_de.style.styleFloat===undefined?'cssFloat':'styleFloat',
		
		//whether select has attr 'value'(false in IE)
		selectValue:!!div.getElementsByTagName('select')[0].value,
		
		//in IE<8,the option element hasn't value when the value attr is not specified
		optionValue:!!div.getElementsByTagName('option')[0].value,
		
		opacity:div.getElementsByTagName('span')[0].style.opacity==='0.1'
		//offsetInculdeMargin:
		
	};
})();

_.extend({
	K:function(x) {return x}, //virtual "()" function
	ns:function (ns,pkg,context) {//bind namespace
		var i=0,_n=context || _w,nsa=ns.split('.'),n,mi=nsa.length-1;
		for (;n=nsa[i],i<mi;i++) {
			_n=_n[n]=_n[n] || {};
		}
		if (pkg===false) {//unbind operation
			_n[n]=_nshistory[ns];
		} else if (pkg!==true) {//bind and backup
			_nshistory[ns]=_n[n];
			_n[n]=pkg || this;
		}
		return _n[n];//get operation when pkg is true
	},//End ns
	str:function (obj,s) {//the same as 'toString',also can set!
		if (s!==undefined) obj.toString=function () {return s};
		return S(obj);
	},//End str
	type:function (obj) {
		return _toS.call(obj);
	},//End type
	repr:function (obj,depth,_ATTR) {//named from Python,often used to serialize JSON, parameter _ATTR needn't order
		switch (typeof obj) {
			case 'string':
				return '"'+_.slash(obj)+'"';
			case 'number':
			case 'boolean':
				return S(obj);
			case 'function':
				return 'Function()';
			case 'undefined':
				return 'null';
			default:
				if (!obj || depth===0) return S(obj);
				var n,
					ary=[],
					f=arguments.callee;
					
				_ATTR=_ATTR || _.randName();
					
				if (obj[_ATTR]) 
					return '/**/ null';//recursive reference
				
				depth=depth ||  18; //disallow the 19th hell
				depth--;
				
				obj[_ATTR]=true;//mark the object
				if (obj instanceof A) {
					for (var i=0,len=obj.length;i<len;i++) {
						if (obj[i]!==undefined) {
							ary.push(f( obj[i],depth,_ATTR));
						}
					}
					n='['+ary.join(',')+']';
				} else {
					for (n in obj) {
						if (obj[n]!==undefined && n !==_ATTR) {
							ary.push('"'+_.slash(n)+'":'+f( obj[n],depth,_ATTR));
						}
					}
					n='{'+ary.join(',')+'}';
				}
				delete obj[_ATTR];//delete the mark
				return n;

		}
	},//End repr
	slash:function (s) {return S(s).replace(_SLASH_RE,function (m) {return _SLASH_CHARS[m]})},
	isStr:function (o) {return typeof o=='string'},
	isNum:function (o) {return typeof o=='number'},
	isFun:function (o) {return o instanceof F},
	isAry:function (o) {return o instanceof A},
	isDef:function (o) {return o !==undefined},
	isBool:function (o) {return o===true || o ===false},
	isScalar:function (o) {return _.isStr(o) || _.isNum(o) || _.isBool(o)},
	ltrim:function (s) {return s.replace(/^\s+/,'')},
	rtrim:function (s) {return s.replace(/\s+$/,'')},
	trim:function (s) {return _.rtrim(_.ltrim(s))},
	endsWith:function(s,ends) {
		var i=s.indexOf(ends);
		return i>-1 && s.length-ends.length ==i;
	},//End endsWith
	startsWith:function (s,prefix) {
		return s.indexOf(prefix) === 0;
	},//End startsWith
	htmlEncode:function (html) {
		_HE_Text.nodeValue=html;
		return _HE_Div.innerHTML;
	},//End htmlEncode
	htmlDecode:function (html) {
		return html.replace(_HD_RE,function (m) {
			_HD_Div.innerHTML=m;
			return _HD_Div.firstChild.nodeValue;
		});
	},//End htmlDecode
	stripTags:function (html) {
		return html.replace(_HTML_TAG_RE,'');
	},//End stripTags
	stripScripts:function(html) {
		return html.replace(_SCRIPT_TAG_RE,'').replace(_STYLE_TAG_RE,'');
	},//End stripScripts
	rescape:function (res) {
		throw 'Not implementation yet!!!';
	},//End rescape
	camelize:function (s) {
		return s.toLowerCase().replace(_CAMEL_RE,function (m) {
			return m.charAt(1).toUpperCase();
		});
	},//End camelize
	bytes:function (s) {
		return s.replace(_DCHAR_RE,"**").length;
	},//End bytes
	each:function(obj,fn) {
		var i,ret,ary=[];
		for (i in obj) {
			if (obj.hasOwnProperty(i)) {
				ret=fn.call(obj[i],i,obj[i]);
				if (ret===false) break;
				if (ret===undefined) continue;
				ary.push(ret);
			}
		}
		return ary;
	},//End each
	iter:function (items,fn) {
		for (var i=0,len=items.length,ret,ary=[];
			i<len && ret!==false;(ret=fn.call(items[i],i,items[i]))==undefined || ary.push(ret),i++);
		return ary;
	},//End iter
	reduce:function (items,fn) {//reduce process an array
		var i=1,l=items.length,val=items[0];
		if (fn!=null) 
			for (;i<l && ((val=fn(val,items[i])) !==false);i++);
		else if (l>1) 
			val=items;
		return val;
	},//End reduce
	flatten:function (ary) {
		if (!_.isAry(ary)) return [ary];
		return _.reduce(ary,function (one,second) {
			if (!_.isAry(one)) one=[one];
			return one.concat(_.flatten(second));
		});
	},//End flatten
	index:function (e,ary) {//search an element in an array,return it's index
		for	(var i=0,len=ary.length;i<len;i++)
			if (e===ary[i]) return i;
		return -1;
	},//End index
	toAry:(function () {//convert any object to array
		var f=_.Able.sliceAny?function (o) {return EA.slice.call(o)}:function (o) {var l=o.length,ary=[];while(l--) ary[l]=o[l];return ary};
		return function (items) {
			if (items==null) return [];
			if (_.isAry(items)) return items.slice();
			if (_.isNum(items.length) && !_.isStr(items) && !_.isFun(items) && items!==_w) return f(items);
			return [items];
		};
	})(),//End toAry
	merge:_.Able.sliceAny? //merge the second array into the first array,warning:it will change the first array
	function (first,second) {
		EA.push.apply(first,_.toAry(second));
		return first;
	}:function (first,second) {
		var i=0,len=first.length,ele;
		second=_.toAry(second);
		while ((ele=second[i++]) !=null)
			first[len++]=ele;
		return first;
	},//End merge
	unique:(function () {//unique a large array
		function test(value,hash) {
			return (value in hash) || (hash[value]=false);
		}
		return function (ary) {
			for (var i=0,objs=[],tr=false,tp,hash={'string':{},'boolean':{},'number':{}},p,id=_.randName(),l=ary.length,ret=[];i<l;i++) {
				p=ary[i];
				if (p==null) continue;
				tp=typeof p;
				tr=(tp in hash)?test(p,hash[tp]):(test(id,p) || (objs.push(p),false));
				if (!tr) ret.push(p);
			}
			for (i in objs) delete objs[i][id];
			return ret;
		};
	})(),//End unique
	rand:function (start,end) {//generate a random number in the range
		var args=arguments,r=M.random();
		if (!args.length) return r;
		if (args.length===1) {end=start;start=0;}
		return M.floor(start+(end-start)*r);
	},//End rand
	randName:function () {
		return 'jkit:gid'+_.rand(1000,10000)+_.date();
	},//End randName
	date:(function () {
		var re=/%(d|j|D|w|l|N|S|z|W|F|m|M|n|t|L|Y|y|a|A|g|G|h|H|i|s|O|P|Z|c|r|U|X)/g,
			dsx=['th','st','nd'],
			OD=86400000,//one day milliseconds
			OW=604800000,//one week milliseconds
			lang;
			
		function prefix(n) {return ('0'+n).slice(-2)}
		
		function tzo(d) {//timezone offset
			var t=-d.getTimezoneOffset(),
				h=M.floor(t/60),m=t%60;
			return [(h<0?'-':'+')+prefix(M.abs(h)),prefix(m)];
		}
		
		//start of year
		function sof(d) {return new Date(d.getFullYear(),0,1,0,0,0,0)}
		
		function nm(d) {
			return new Date(d.getFullYear(),
							d.getMonth()+1,
							d.getDate(),
							d.getHours(),
							d.getMinutes(),
							d.getSeconds(),
							d.getMilliseconds());
		}//next month
		function g(d) {return d.getHours()>12?d.getHours()-12:d.getHours()}
		function format(tag,d) {
			switch (tag) {
				case 'd':return prefix(d.getDate());//01-31 day
				case 'j':return d.getDate();//1-31 day
				case 'D':return lang.SHORT_WEEK_NAMES[d.getDay()];//Sun-Mon
				case 'l':return lang.WEEK_NAMES[d.getDay()];//Sunday-Monday
				case 'N':return d.getDay()+1;//1-7 of week
				case 'S':return dsx[d.getDate()] || dsx[0];//st,nd,th suffix of day
				case 'w':return d.getDay();//0-6
				case 'z':return M.floor((d-sof(d))/OD);//0-366
				case 'W':return M.floor((d-sof(d))/OW);
				case 'F':return lang.MONTH_NAMES[d.getMonth()];//January-December
				case 'n':return d.getMonth()+1;//1-12
				case 'm':return prefix(d.getMonth()+1);//01-12
				case 'M':return lang.SHORT_MONTH_NAMES[d.getMonth()];//Jan-Dec
				case 't':return M.floor((nm(d)-d)/OD);//day counts of month 28-31
				case 'Y':return d.getFullYear();//fullyear
				case 'y':return d.getYear();//year name,before 2000,it will return two numbers
				case 'a':return d.getHours()<12?'am':'pm';//am or pm
				case 'A':return d.getHours()<12?lang.AM:lang.PM;//AM or PM
				case 'g':return g(d);//1-12
				case 'G':return d.getHours();//0-23
				case 'h':return prefix(g(d));//01-12
				case 'H':return prefix(d.getHours());//00-23
				case 'i':return prefix(d.getMinutes());//00-59
				case 's':return prefix(d.getSeconds());//00-59
				case 'O':return tzo(d).join('');//timezone
				case 'P':return tzo(d).join(':');//timezone with ':'
				case 'Z':return d.getTimezoneOffset()*60;//timezone minutes
				case 'U':return d.getTime();
				case 'c':return _.date('%Y-%m-%dT%H:%i:%s%P',d,_.Lang.en_US);//ISO 8601  format date
				case 'r':return _.date('%D, %d %M %Y %H:%i:%s %O',d,_.Lang.en_US);//RFC 822 format date
				default:return tag;
				
			};
		}

		return function (fmt,t,_lang) {
			var d=new Date();
			if (!arguments.length) return +d;
			lang=_lang || _.Lang.en_US;
			if (_.isStr(t)) {
				//decode
				return 'Not implementation yet!!!';
			} else {
				_.isNum(t)?d.setTime(t):t=+d;
				
				return fmt.replace(re,function (s) {
					return format(s.charAt(1),d);
				});
			}
		};
	})(),//End date
	Node:{
		ELEMENT_NODE: 1,
		ATTRIBUTE_NODE: 2,
		TEXT_NODE: 3,
		CDATA_SECTION_NODE: 4,
		ENTITY_REFERENCE_NODE: 5,
		ENTITY_NODE: 6,
		PROCESSING_INSTRUCTION_NODE: 7,
		COMMENT_NODE: 8,
		DOCUMENT_NODE: 9,
		DOCUMENT_TYPE_NODE: 10,
		DOCUMENT_FRAGMENT_NODE: 11,
		NOTATION_NODE: 12
	},//End Node
	bind:function (fun,args,p) {
		return function () {
			fun.apply(p || _w , _.merge(args,arguments));
		}
	},//End bind
	param:function (obj,val) {
		var a=[],i,m={};
		if (_.isScalar(obj))  {
			if (arguments.length===1) {//decode
				if ((i=obj.indexOf('?'))>-1) obj=obj.substring(i+1);
				if (!obj || obj.indexOf('=')<0) return [obj];
				_.iter(obj.split('&'),function (k,v,tmp) {
					tmp=v.split('=');
					k=_duc(tmp[0]);
					v=_duc(tmp[1]);
					if (_.endsWith(k,'[]')) {
						k=k.slice(0,-2);
						if (!m[k]) m[k]=[];
						m[k].push(v);
					} else m[k]=v;
				});
				return m;
			}
			obj=_euc(obj);
			if (_.isAry(val)) {
				for (i=0,k=obj+'[]=',len=val.length;i<len;i++) 
					val[i]!=null && a.push(k+_euc(val[i]));
			} else return obj+'='+_euc(val);
		} else a=_.each(obj,_.param);
		
		return a.join('&');
	},//End param
	version:0.1,
	versionInfo:'jKit Alpha 0.1'
});


dom=_.dom=(function () {
	var _quirk_names={
		'for':'htmlFor',
		'class':'className',
		'float':_.Able.cssFloat,
		accesskey:'accessKey',
		readonly:'readOnly',
		maxlength:'maxLength',
		cellspacing:'cellSpacing',
		cellpadding:'cellPadding',
		rowspan:'rowSpan',
		colspan:'colSpan',
		valign:'vAlign',
		tabindex:'tabIndex'
	},
	_sep_attr={src:1,href:1};
	
	function isXMLNode(n) {
		var de=(n.ownerDocument || n).documentElement;
		return de?de.nodeName!=='HTML':false;
	}
	function nodeName(node,name) {
		var n=node.nodeName;
		return name?(n &&  n.toUpperCase()==name.toUpperCase()):n;
	}
	return {
		isXMLNode:isXMLNode,
		nodeName:nodeName,
		attr:function (o,name,value) {
			var t=o.nodeType,n,x,se;
			if (t==3 || t==8) 
				return undefined;
			n=_quirk_names[name] || name;
			x=isXMLNode(o);
			if (value===undefined) {//get
				if (x || (name in _sep_attr)) return o.getAttribute(name,2);
				if (n==='style') return o.style.cssText;
				if (nodeName(o,'form')) 
					return o.getAttributeNode(name).nodeValue;
				return o[n];
			} else {//set
				value+='';
				if (x) 
					o.setAttribute(name,value);
				else if (nodeName(o,'form')) 
					o.getAttributeNode(name).nodeValue=value;
				else if (n==='style')
					o.style.cssText=value;
				else
					o[n]=value;
			}
			return value;
		},//End attr
		delAttr:function (o,name) {
			if (o.removeAttribute) o.removeAttribute(name);
		},//End delAttr
		hasClass:function (o,name) {
			return _.index(name,(o.className|| '').split(/\s+/))>-1;
		},//End hasClass
		addClass:function (o,name) {
			if (!dom.hasClass(o,name)) o.className+=' '+name;
		},//End addClass
		delClass:function (o,name) {
			var names=o.className.split(/\s+/),
				i=_.index(name,names);
			if (i>-1) {
				names.splice(i,1);
				o.className=names.join(' ');
			}
		},//End delClass
		toggleClass:function (o,name,b) {
			if (b===undefined)
				b=!dom.hasClass(o,name);
			dom[b?'addClass':'delClass'](o,name);
		},//End togClass
		del:function (o) {
			if (o.parentNode) o.parentNode.removeChild(o);
		},//End del
		empty:function (o) {
			if (!isXMLNode(o)) {
				o.innerHTML='';
			} else {
				_.iter(o.childNodes,function () {
					dom.del(this);
				});
			}
		},//End empty
		html:function (o,t) {
			return t===undefined?o.innerHTML:o.innerHTML=t;
		},//End html
		text:function (o,t) {
			if (t===undefined) {
				return _.stripTags(_.stripScripts(o.innerHTML));
			} else {
				return o.innerHTML=_.htmlEncode(t);
			}
		},//End text
		val:function (o,v) {
			var op= (v===undefined),single;
			if (op && nodeName(o,'option') && !(o.attributes.value || {}).specified) {
				return o.text;
			} else if (nodeName(o,'select') && !((single=o.type=='select-one') && _.Able.selectValue)) {
				var tmp,opt,find=false,
					i=o.selectedIndex,
					opts=o.options,
					l=opts.length,
					rvs=[],
					svs=_.isAry(v)?v:[v];
				if (single && op) {
					return dom.val(opts[i],v);
				} else {
					for (i=!op?0:(i<0?0:i);i<l;i++) {
						opt=opts[i];
						tmp=dom.val(opt);
						if (!op) {
							find=_.index(tmp,svs)>-1;
							if (find && single) {
								o.selectedIndex=i;
								return tmp;
							}
							opt.selected=find;
						}
						
						if (opt.selected) rvs.push(tmp);
					}
					return rvs;
				}
			
			} else {
				return op?o.value:(o.value=v);
			}
		},//End val
		children:function (o,nodeType,exclude) {
			nodeType=nodeType || 1;
			return _.iter(o.childNodes,function () {
				if (this.nodeType==nodeType && this !=exclude) 
					return true;
			});
		},//End children
		parents:function (o,max) {
			return dom.walk(o,'parentNode',1,0,max);
		},//End parents
		contents:function (o,nodeType) {
			return nodeName(o,'iframe')?(o.contentDocument || o.contentWindow.document):_.toAry(o.childNodes);
		},//End contents
		walk:function (o,dir,nt,exclude,max) {
			var eles = [], cur = o[dir],i=0;
			nt = nt || 1;//nodeType
			max=max || 1;//max numbers returned
			while ( cur && cur!= _d && cur!=exclude && i++!=max) {
				if ( cur.nodeType == nt )
					eles.push( cur );
				cur = cur[dir];
			}
			return eles;
		},//End walk
		siblings:function (o) {
			return dom.children(o.parentNode,1,o);
		},//End siblings
		next:function (o,nt,max) {return dom.nextAll(o,nt,1)},
		prev:function (o,nt,max) {return dom.prevAll(o,nt,1)},
		nextAll:function (o,nt,max) {return dom.walk(o,'nextSibling',nt,0,max)},
		prevAll:function (o,nt,max) {return dom.walk(o,'previousSibling',nt,0,max)},
		offsetParent:function (o) {
			var p = o.offsetParent || _b;
			while ( p && p!=_d && p!=_b && dom.css(p, 'position') == 'static' )
				p = p.offsetParent;
			return p;
		},//End offsetParent
		opacity:function (o,v) {
			var s= v===undefined;
			if (_.Able.opacity) {
				return s?dom.getRealStyle(o,'opacity'):o.style.opacity=v;
			} else {
				o.zoom=1;
				v*=100;
				return (o.filters && o.filters.alpha && (o.filters.alpha.opacity=v)) 
				|| (o.style.filter="alpha(opacity=" + v + ")");
			}
		},//End opacity
		getRealStyle:function (o,name) {
			if (_dv && _dv.getComputedStyle) {
				name = name.replace(/([A-Z])/g,"-$1").toLowerCase();
				var s = _dv.getComputedStyle(o,"");
				return s && s.getPropertyValue(name);
			} else {
				name=_quirk_names[name] || _.camelize(name);
				return o.currentStyle && o.currentStyle[name];
			}
		},//End getRealStyle
		css:function (o,k,v) {
			var args=arguments;
			if (k==='opacity') 
				dom.opacity(o,v);
			if (args.length===2 && _.isStr(k)) {
				return dom.getRealStyle(o,k);
			} else if (args.length===3) {
				k=_quirk_names[k] || _.camelize(k);
				return o.style[k]=''+v;
			} else {
				_.each(k,function (i) {
					dom.css(o,i,this);
				});
			}
		},//End css
		offset:function (o) {
			//TODO
			var l=o.offsetLeft,t=o.offsetTop;
			return {top:t,left:l};
		}//End offset
	};
})();


event=_.event=(function () {
	
})();


_.query=(function () {

	
	var $C,
		selector={
			'':function (tag) {
				return _.toAry(_d.getElementsByTagName(tag || '*'));
			},
			' ':function (tag) {
				return _.toAry(this.getElementsByTagName(tag || '*'));
			},
			'#':function (id) {
				return _d.getElementById(id);
			},
			'.':function (className) {
				if (dom.hasClass(this,className)) return [this];
			},
			'>':function (tag) {
				return _.iter(_.toAry(this.childNodes),function () {
					if (this && dom.nodeName(this,tag)) return this;
				});
			}
		},
		_sre=/([.# >:~+]?)([^ \t.#>+~:]*)/gi,
		_ws_re1=/\s+(?=\[|:)/gi,
		_ws_re2=/\s*(\+|~|>)\s*/gi,
		_rules_split_re=/\s*,\s*/g;
	
	
	function $T(tag,context) {//getElementsByTagName
		return (context || _d).getElementsByTagName(tag || '*');
	}
	$C=_.getElementsByClassName?function (name,context) {
		return _.toAry((context || _d).getElementsByClassName(name));
	}:function (name,context) {
		name=name.split(/\s+/);
		return _.iter((context || _d).getElementsByTagName('*'),function () {
			if (!this || !this.className) return;
			var s=this.className.split(/\s+/);
			if (_.unique(s.concat(name)).length===s.length) return this;
		});
	};
	return $C;
	
	
	
	function fixExp(exps) {
		exps=_.trim(exps);
		exps=exps.replace(_ws_re1,'').replace(_ws_re2,'$1');
		exps=exps.split(_rules_split_re);
		return exps;
	}
	function find(exp) {
		var items=[_d];
		exp.replace(_sre,function ($0,$1,$2) {
			if (!$1 && !$2) return;
			var f=selector[$1];
			if (!f) return;
			items=_.iter(items,function () {
				return this  && f.call(this,$2);
			});
			items=_.flatten(items);
		});
		return items;
	}
	return function (exps) {
		exps=fixExp(exps);
		return [];
		return _.flatten(_.iter(exps,function (i,exp) {
			if (exp.indexOf('#')>-1) {
				exp=exp.substr(exp.indexOf('#'));
			}
			return find(exp);
		}));
	};
})();






_.GID=_.randName();//Global jKit ID,set for every element
_.jKitObject=_j;
function jKitObject(items) {
	items=_.toAry(items);
	this.add(items).mark();
}

function touchData(o) {
	var id=o[_.GID],d=_data[id];
	if (!d) d=_data[id]={};
	return d;
}
function removeData(o,name) {
	var id=o[_.GID],d=_data[id];
	if (name===undefined) delete _data[id];
	else delete d[name];
}

_.extend({//jKitObject extend
	addMethod:function (name,fn,get) {
		var $this=this;
		if (_.isStr(name)) {
			this.prototype[name]=this.makeMethod(fn,get);
		} else {
			get=fn;
			_.each(name,function (k) {
				$this.addMethod(k,this,get);
			});
		}
		return this;
	},
	makeMethod:function (fn,get) {
		return function () {
			var val=fn.apply(this,arguments);
			if (get) return val;
			else return this;
		};
	},
	guidCounter:1
},_j);

_j.addMethod({//some methods that have no returned
	mark:function () {
		_.iter(this,function () {
			if (this && !this[_.GID]) {
				this[_.GID]=_j.guidCounter++;
			}
		});
	},
	add:function (items) {
		if (_.isStr(items))  items=_.query(items);
		if (items.nodeType) items=_.toAry(items);
		EA.push.apply(this,items);
	},//End add
	each:function (fn) {
		_.iter(this,function () {
			return fn.apply(new _j(this),arguments);
		});
	},//End each
	slice:EA.slice,
	splice:EA.splice,
	push:EA.push,
	pop:EA.pop,
	shift:EA.shift,
	unshift:EA.unshift,
	delData:function (name) {
		_.iter(this,function () {
			removeData(this,name);
		});
		return this;
	}//End delData
});
_j.addMethod({
	attr:function (name,value) {
		if (this[0]) {
			if (value===undefined) return dom.attr(this[0],name,value);
			else _.iter(this,function () {
				dom.attr(this,name,value);
			});
		}
		return this;
	},//End attr
	index:function (obj) {
		return _.index(obj,this);
	},//End index
	data:function (name,value) {
		var d=touchData(this[0]);
		if (value===undefined) return d[name];
		else {
			_.iter(this,function () {
				var d=touchData(this);
				d[name]=value;
			});
		}
		return this;
	},//End data
	on:function (name) {
	}//

},true);

_.str(_j.prototype,'[object jKitObject]');
_.str(_j,'[object jKitObjectConstructor]');




















//Language Define
_.Lang={
	defaultLang:'en_US',
	getDefault:function () {return this[this.defaultLang]},
	zh_CN:(function (){
		var SWN=['日','一','二','三','四','五','六'],
			SMN=['一','二','三','四','五','六','七','八','九','十','十一','十二'];
		return {
			AM:'上午',
			PM:'下午',
			WEEK_NAMES:_.iter(SWN,function () {return '星期'+this}),
			SHORT_WEEK_NAMES:SWN,
			MONTH_NAMES:_.iter(SMN,function () {return this+'月'}),
			SHORT_MONTH_NAMES:SMN
			/*,
			HEAVENLY_STEM:['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'],
			EARTH_STEM:['甲','乙','丙','丁','戊','已','庚','辛','壬','癸']
			*/
		}
	})(),
	en_US:(function (){
		var WN=['Sunday','Monday','Tuesday','Wednesday','Thusday','Friday','Saturday'],
			MN=['January','February','March','April','May','June','July','August','September','October','November','December'];
		function f(a) {return _.iter(a,function () {return this.slice(0,3)})}
		return {
			AM:'AM',
			PM:'PM',
			WEEK_NAMES:WN,
			SHORT_WEEK_NAMES:f(WN),
			MONTH_NAMES:MN,
			SHORT_MONTH_NAMES:f(MN)
		}
	})()
};
















return _;//return jKit

//End scope
})().ns('jKit');//bind namespace 'jKit'





