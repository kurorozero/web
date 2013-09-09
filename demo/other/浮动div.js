	var divFloat=function(id){
		_self=this;
		var isIE = !-[1,];
		var isIE6=isIE&&!window.XMLHttpRequest;
		var divBox=document.getElementById(id);
		divBox.style.zIndex="9999";
		divBox.style.display="block"
		//floatbox.style.position = !isIE6 ? "fixed" : "absolute";
		divBox.style.marginTop = - divBox.offsetHeight / 2 + "px";
		
		_self.floatit=function(){
//			$(_self.divBox).animate({ 
//				marginTop: document.documentElement.scrollTop - divBox.offsetHeight / 2 + "px",
//			  }, "fast" );
			divBox.style.marginTop = document.documentElement.scrollTop - divBox.offsetHeight / 2 + "px";
		}
		
//		$(window).scroll(function(){
//			floatit();
//		});

		
		if(isIE6){
			window.attachEvent("onscroll",function(){_self.floatit()});
		}else{
			window.addEventListener("scroll",function(){_self.floatit()},true);
		}
		floatit();
	}