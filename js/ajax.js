void(function(window){
	var self = this;
	var ajax = window.ajax = {
		"xhr" : function(){
			   return new XMLHttpRequest();
				//预先定义一个 ajax 对象
				//因为自从IE7开始就已经兼容XMLHttpRequest对象.
				//现在的浏览器几乎都是支持XMLHttpRequest的
				//对于ie6这个古董下面的将继续执行.
		},
		"request" : function(option) { //构造一个HTTP请求
					var xhr=this.xhr(),self=this; 
					xhr.open("POST", option.url, true); //option将以对象的方式传输请求的值
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
					//设置 ajax 请求头，一般来说javascript默认编码就是utf-8
					//如果网页编码是 gb2312 必须更改为 gb2312 或在服务器header头输出编码
					xhr.send(option.data); //发送
					xhr.onreadystatechange = function() {
							if (xhr.readyState == 4 && xhr.status < 400 ) {
									//如果ajax状态是4(完成)和HTTP状态值小于400
									//则判断认为这是一次成功的ajax请求
									option.success(xhr.responseText);
									//把ajax的结果值返回至success函数，以便调用.
					 }
			}
			return self;
		},
		"parse" : function(data) {
				return eval("("+data+")"); //传入把json的值格式化后赋值给 ajax.parse([date]) 函数
		}

	}


	//以下代码是为了兼容IE的ajax组件的.
	if(!window.ActiveXObject) return self;
	//如果ActiveXObject 为空不是微软的浏览器，
	//则停止本函数的执行,后面的代码不要再执行。
	//原因是不是微软的肯定就是支持 XMLHttpRequest() only 的~~
	//如果是微软的浏览器则继续判断协议.
	
	if (window.location.protocol !== "file:" ) {
		//如果 window.ActiveXObject 存在就进一步判断协议:
		//file: 就是本地文件
		//如果是网络协议则是 http or https
		ajax.xhr = function() {
			try {
				return new window.XMLHttpRequest();
				//如果是微软的浏览器又不是本地环境将尝试用 XMLHttpRequest()
			} catch(xhrError) {}
		}
	}

	ajax.xhr = function() {
		try {
			return new window.ActiveXObject("Microsoft.XMLHTTP");
		} catch(activeError) {}
		//IE6无论如何都是使用 Microsoft.XMLHTTP
		//但是如果是IE6浏览器以上
		//存在本地环境(file:存在)将使用 Microsoft.XMLHTTP 初始化.
	}

//至此本函数结束.
})(window);