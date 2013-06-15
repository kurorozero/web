(function(a, b, c, d){
d = {
        ready:function(handle){
                d.this = [];
                eval("window.onload = function(event){var e = event?event:window.event; handle(e);}");
        },
        b:function(c){
                if(typeof c == 'object'){ return c};
                switch(c.substr(0,1)){
                        case '.':
                                var i = 0;
                                var arr = d.array();
                                d.e = document.getElementsByTagName('*');
                                for(var k in d.e){
                                        if(d.e[k].className && d.e[k].className !='undefined' && d.e[k].className.indexOf(c.substr(1)) > -1){
                                                arr[i] = d.e[k];i++;
                                        }
                                }
                                return arr.length == 1 ? arr[0] : arr;
                                break;
                        case '#':
                                return c.indexOf('#') >-1 ? document.getElementById(c.substr(1)) : [];
                                break;
                        default:
                                var arr = d.array();
                                d.e = document.getElementsByTagName(c);
                                for(var i = 0; i < d.e.length; i++){
                                        arr[i] = d.e[i];
                                }
                                return arr;
                        break;
                }
                return [];
        },
        print:function(string){
                document.body.innerHTML += string;
        },
        cookie:function(json){
                json=[json];
                if(json[0]['name'] && !json[0]['value']) {
                        var cookie = document.cookie;
                        if(cookie.indexOf(';')) {
                                cookie = cookie.split(';');
                                for(var k in cookie){
                                        if(cookie[k].indexOf(json[0]['name']) > -1){
                                                return cookie[k].substr(json[0]['name'].length+1,cookie[k].length);
                                        }
                                }
                        }
                        if(cookie.indexOf(json[0]['name']) > -1){
                                return cookie.substr(json[0]['name'].length+1,cookie.length);
                        }
                        return e;
                }else
                if(json[0]['name'] && json[0]['value']) {        
                        var expDate = new Date(new Date().getTime()+(json[0]['expires'] ? parseInt(json[0]['expires']*1000) :0));
                        if(!json[0]['path'] && !json[0]['doamin']) {
                                document.cookie=json[0]['name']+"="+escape(json[0]['value'])+";expires="+expDate.toGMTString();
                        }else{
                                document.cookie=json[0]['name']+"="+escape(json[0]['value'])+";expires="+expDate.toGMTString()+";path="+
                                json[0]['path']+";dain="+json[0]['dain'];

                        }
                }
        },
        array:function(){
                var array = new Array();
                if(!arguments.length){return array;}
                for(var k=0;k<arguments.length;k++){array[k]=arguments[k];}
                return array;
        },
        inarray:function(needle,array){
                for(var k in array){ if(array[k] == needle){return d.t = true;}}
                return d.f = false;
        },
        css:function(o,attr){
                o = d.b(o);
                json=[attr];
                if(typeof o[0] == 'object'){
					for(var i in o){
						for(var key in json[0]){
							if(typeof key != 'number'){
								o[i].style.cssText += key+':'+json[0][key]+';';
							}else{
								return o[i].currentStyle ? o[i].currentStyle[attr] : 
								document.defaultView.getComputedStyle(o[i],null)[attr];
							}
						}
					}
                    return [];
                }else{
					for(var key in json[0]){
						if(typeof key != 'number'){
							o.style.cssText += key+':'+json[0][key]+';';
						}else{
							return o.currentStyle ? o.currentStyle[attr] : 
							document.defaultView.getComputedStyle(o,null)[attr];
						}
					}
                }
        },
        html:function(o,html){
                o = d.b(o);
                if(typeof o[0] == 'object'){
                        for(var i in o){if(!html){ return o[i].innerHTML; }o[i].innerHTML = html;}
                }
                return !html ? o.innerHTML : o.innerHTML = html;        
        },
        remove:function(o){
                d.this = o = d.b(o);
                if(typeof o[0] == 'object'){
                        for(var i in o){
                                o[i].parentNode.removeChild(o[i]);
                        }
                }
                o.parentNode.removeChild(o);        
        },
        click:function(o,functions){
                d.this = o = d.b(o);
                o.onclick = function(e){functions(e);}
        },
        submit:function(o,functions){
                d.this = o = d.b(o);
                o.onsubmit = function(e){functions(e);}
        },
        mousemove:function(o,functions){
                d.this = o = d.b(o);
                o.onmousemove = function(e){functions(e);}
        },
        mouseout:function(o,functions){
                d.this = o = d.b(o);
                o.onmouseout = function(e){functions(e);}
        },
        keydown:function(o,functions){
                d.this = o = d.b(o);
                o.onkeydown = function(e){functions(e);}
        },
        keyup:function(o,functions){
                d.this = o = d.b(o);
                o.onkeyup = function(e){functions(e);}
        },
}
dom = d;
})(window)