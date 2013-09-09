var isIE = !-[1,];
var ie6=isIE&&!window.XMLHttpRequest;
function num_input_limit(evt,value)
{
	var oEvent=getEvent(evt);
	if(value.length<4)
		return checkCode(oEvent.keyCode);
	else
		return checkCode2(oEvent.keyCode);
}

var checkCode=function(num)
{//check keyCode for inputbox
	if((num>=48 && num<=57) || (num>=96 && num<=105) || num==8 || num==46)
		return true;
	else
		return false;
}

var checkCode2=function(num){
	if(num==8 || num==46)
		return true;
	else
		return false;	
}

var readMemCard=function(){
	var url='index.php?option=com_users&view=transaction&format=detail';
	var post={}
	$.post(url,post,function(result){
			if(result){
				popwin('popdetail',result);
				$('#selcard,#selcat,#seldate').selectbox({func:selthis});
			}else{
				alert("Connect Error");
			}
		});
}

var updatefilter=function(num){
	var url='index.php?option=com_users&view=transaction&format=list';
	var post={cardnum:num}
	$.post(url,post,function(result){
			if(result){
				var url2='index.php?option=com_users&view=transaction&format=total';
				var post2={cardnum:num}
				$.post(url2,post2,function(result2){
						if(result2){
							var oTotal=eval("("+result2+")");
							document.getElementById('dtlwallet').innerHTML=oTotal.wallet;
							document.getElementById('dtlcoupon').innerHTML=oTotal.qpn;
							document.getElementById('dtlpoint').innerHTML=oTotal.point;
							document.getElementById('dtlcardnum').innerHTML=oTotal.num;
							document.getElementById('totalstr').innerHTML=oTotal.totalstr;
						}else{
							alert("Connect Error");
						}
				});
				$('#listBox').html(result);
			}else{
				alert("Connect Error");
			}
	});
}

var selthis=function(obj){
	var value=$(obj).val();
	if(value.length==0){
		return;
	}
	updatefilter(value);
	
}


var incart=function(oProd){
	var saveCookie=new Array();
	var sCookieName='Dvn_Cart';
	var oCookie=getCookie(sCookieName);
	if(oCookie==''){
		oCookie=new Array();
	}else{
		oCookie=eval("["+oCookie+"]");
	}
	var prodExists=false,tmpObj,subtotal,amounts;
	for(var i=0,shu=oCookie.length;i<shu;i++)
	{
		if(oCookie[i].pid==oProd.pid){
			//if prod exists then change the prod record
			oCookie[i].count=parseInt(oCookie[i].count)+parseInt(oProd.count);
			prodExists=true;
		}
		oCookie[i].subtotal=parseInt(oCookie[i].count)*parseFloat(oCookie[i].price);
		oCookie[i].amounts=parseInt(oCookie[i].count)*parseFloat(oCookie[i].amount);
		saveCookie.push('{"pid":"'+oCookie[i].pid+'","name":"'+oCookie[i].name+'","urlname":"'+oCookie[i].urlname+'","count":"'+oCookie[i].count+'","price":"'+oCookie[i].price+'","subtotal":"'+oCookie[i].subtotal.toFixed(2)+'","amount":"'+oCookie[i].amount+'","amounts":"'+oCookie[i].amounts+'","whid":"'+oCookie[i].whid+'","rate":"'+oCookie[i].rate+'","img":"'+oCookie[i].bimage+'","tags":"'+oCookie[i].tagImgs+'"}');
	}
	if(prodExists==false)
	{
		subtotal=parseInt(oProd.count)*parseFloat(oProd.price);
		amounts=parseInt(oProd.count)*parseFloat(oProd.originalprice);
		oProd.subtotal=subtotal.toFixed(2);
		oProd.amounts=amounts.toFixed(2);
		//if prod not exists then add in cart array
		saveCookie.push('{"pid":"'+oProd.pid+'","name":"'+oProd.name+'","urlname":"'+oProd.urlname+'","count":"'+oProd.count+'","price":"'+oProd.price+'","subtotal":"'+oProd.subtotal+'","amount":"'+oProd.originalprice+'","amounts":"'+oProd.amounts+'","whid":"'+oProd.whid+'","rate":"'+oProd.rate+'","img":"'+oProd.bimage+'","tags":"'+oProd.tagImgs+'"}');
	}
	setCookie(sCookieName,saveCookie,1);
	updateCash();
	popshowcart();//change cart status tips 
}

function updateCart(pid,num){
	var cookieName='Dvn_Cart';
	var cookie=getCookie('Dvn_Cart');
	if(cookie=='')return false;
	var cart=eval("(["+cookie+"])");
	var saveCookie=[];
	for(var i=0,shu=cart.length;i<shu;i++){
		if(cart[i].pid==pid){
			cart[i].count=num;
		}
		cart[i].subtotal=parseInt(cart[i].count)*parseFloat(cart[i].price);
		cart[i].amounts=parseInt(cart[i].count)*parseFloat(cart[i].amount);
		cart[i].count>0 && saveCookie.push('{"pid":"'+cart[i].pid+'","name":"'+cart[i].name+'","urlname":"'+cart[i].urlname+'","count":"'+cart[i].count+'","price":"'+cart[i].price+'","subtotal":"'+cart[i].subtotal.toFixed(2)+'","amount":"'+cart[i].amount+'","amounts":"'+cart[i].amounts+'","whid":"'+cart[i].whid+'","rate":"'+cart[i].rate+'","img":"'+cart[i].bimage+'","tags":"'+cart[i].tagImgs+'"}');
	}
	setCookie(cookieName,saveCookie,1);
	updateCash();
	popshowcart();//change cart status tips 
	return true;
}

function updateCash(){
	var cookieName='Dvn_Cart';
	var cookie=getCookie('Dvn_Cart');
	var totalamount=0;
	var result=false;
	if(cookie!=''){
		var cart=eval("(["+cookie+"])");
		for(var i=0,shu=cart.length;i<shu;i++){
			cart[i].amounts=parseInt(cart[i].count)*parseFloat(cart[i].amount);
			totalamount+=cart[i].amounts;
		}
	}
	document.getElementById('amountsid').innerHTML='$ '+totalamount;
	if(totalamount>0 && document.getElementById('cartState').style.display=='none' && cartBtn==false){
		cartBtn=true;
		$(document.getElementById('checkoutBtn')).fadeIn(1000);
		$('.icon_myCoupons_1').animate({left:'-85px'}, 1000,'',function(){
			$('.icon_myCoupons_1').css({left:'0px'});
			$("#cartState").fadeIn(1000);
		});	
		result=true;
	}
	return result;
}

function popshowcart()
{
	$("#popshowcashcart").fadeIn("fast");
	clearTimeout(cartStatus);
	cartStatus=setTimeout(function(){$("#popshowcashcart").fadeOut("fast");},3000); 
}

function check_cart_number()
{
	var cookie=getCookie('Dvn_Cart');
	var totalamount=0;
	if(cookie!=''){
		var cart=eval("(["+cookie+"])");
		for(var i=0,shu=cart.length;i<shu;i++){
			cart[i].amounts=parseInt(cart[i].count)*parseFloat(cart[i].amount);
			totalamount+=cart[i].amounts;
		}
	}
	if(totalamount==0)
	{
		var oDiv=document.createElement('div');
		oDiv.id='detail';
		oDiv.className='popupWindows';
		oDiv.style.display='none';
		document.body.appendChild(oDiv);
		document.getElementById('detail').innerHTML=forgethtml;
		$("#shownoticecards").addClass("btn_113");
		$("#shownoticecards").attr("disabled",true);
		$("#popuptitle").html("提示信息");
		$("#forgettable").hide();
		$("#forgetnotice").html("购物车为空，不能进行结算.");
		$("#forget_password_button").html("");
		$("#forgetnotice").show();
		wOpen('detail');
		return false;
	}
	else
	{
		return true;
	}
}

function ProdList()
{
	var _self=this;
	
	//最熱推介 select li
	_self.slchot=function(obj){
		var oDtl=$(obj).parent().prev();
		var data=$(obj).attr("param");
		$(oDtl).hide();
		_self.choiseprod(oDtl,data);
		$(oDtl).fadeIn("normal");
		$(obj).siblings().removeClass("onLi");
		$(obj).addClass("onLi");
	}
	//折扣驚喜
	_self.slcprod=function(obj){
		var oDtl=$(obj).parent().prev();
		var oNowDtl=$('.details:visible');
		var data=$(obj).attr("param");
		if($(oDtl).attr("state")!=$(oNowDtl).attr("state"))
		{
			$('.details').hide();
			$('.details').attr({"state":""});
		}
		//淡入效果-------同組切換出現淡入效果
		else if(oNowDtl!='undefined')
		{
			$(oNowDtl).hide();
		}
		//淡入效果結束
		_self.choiseprod(oDtl,data);
		$(oDtl).fadeIn("normal");
		$(oDtl).attr({"state":"show"});
		_self.sltone(obj);
	}
	
	//hightlight init data
	_self.choiseprod=function(obj,datastr){
		var data=eval("("+datastr+")");
		if(!data)return;
		//var discount=Math.round((data.sellprice/data.originalprice)*10);
		var save=data.originalprice-data.sellprice;
		var image=new Image();
		image.src=data.bimage;
		$(obj).find('#discount').hide();
		$(obj).find('#sellcount').hide();
		$(obj).find('#ProdId').val(data.pid);
		$(obj).find('#compbname').html(data.compname);
		$(obj).find('#prodName').html("<a href=\""+data.link+"\">"+data.name+"</a>");
		$(obj).find('#sellPrice').html(data.sellprice);
		$(obj).find('#sellPrice2').html(data.sellprice);
		$(obj).find('#originalPrice').html(data.originalprice);
		$(obj).find('#savePrice').html(save);
		$(obj).find('#prodlink').attr('href',data.link);
		if(data.ratemsg!=''){
			$(obj).find('#discount').show();
			$(obj).find('#discount').html(data.ratemsg);
		}
		if(data.selcnt!=''){
			$(obj).find('#sellcount').show();
			$(obj).find('#sellcount').html(data.selcnt);
		}
		var tagStr='';
		if(data.tagImgs.length>0){
			for(var i=0,shu=data.tagImgs.length;i<shu;i++){
				tagStr="<span><img src='"+data.tagImgs[i]+"'></span>"+tagStr;
			}
		}
		$(obj).find('#catimg').html(tagStr);
		
		$(obj).find('#bImage').html(image);
		$(obj).find('#bImage').attr('href',data.link);
		$(obj).find('#sDescription').html(data.sdescr);
		$(obj).find('#price').val(data.sellprice.toFixed(2));
		$(obj).find('#now_price').html(data.sellprice.toFixed(2));
		$(obj).find('#count').val("1");
		$(obj).find('#datastr').val(datastr);
	}
	

	_self.sltone=function(obj){
		//change onLi
		$('#mlst .onLi').removeClass("onLi");
		$(obj).addClass("onLi");
	}
	
	_self.hlight=function(obj){
		$(obj).addClass("onLiBg");
	}
	
	_self.unhlight=function(obj){
		$(obj).removeClass("onLiBg");
	}
	
	$("#hlst").find("li").click(function(){_self.slchot(this);});
	$("#hlst").find("li").hover(function(){_self.hlight(this)},function(){_self.unhlight(this)});
	$("#mlst").find("li").click(function(){_self.slcprod(this);});
	$("#mlst").find("li").hover(function(){_self.hlight(this)},function(){_self.unhlight(this)});
}

var add_num=function(obj){
	var oNum=$(obj).parent().prev();
	var shu=oNum.val();
	oNum.val(parseInt(shu)+1);	
}

var dec_num=function(obj){
	var oNum=$(obj).parent().prev();
	var shu=oNum.val();
	shu=(parseInt(shu)-1>=1)?parseInt(shu)-1:0;
	oNum.val(shu);
}

//amount state
var changnum=function(obj)
{
	var price=$(obj).siblings('#price').val();
	var shu=$(obj).val();
	if(shu=='')shu=0;
	var sTotal=parseFloat(price)*parseFloat(shu);
	$(obj).parent().find('#now_price').html(sTotal.toFixed(2));
}
//addCart button
var addCart=function(obj){
	var p=$(obj).parent();
	var datastr=$(p).find('#datastr').val();
	var data=eval("("+datastr+")");
	data.count=$(p).find('#count').val();
	data.price=data.sellprice;
	if(!parseInt(data.count))
	{
		tipsMsg(obj,2);
		return;
	}
	if(data.limit && data.limit!=0){
		var checklimit=parseInt(data.limit)-parseInt(data.count);
		if(checklimit<0){
			tipsMsg(obj,1,Math.abs(checklimit));
			return false;
		}
	}
	incart(data);
}

function getEvent(oEvt)
{//event for diff browser
	return oEvt?oEvt:(window.event?window.event:null);
}

function wOpen(id)
{
	var opt={
	  container : id,
	  isOverlay : true,//是否遮蔽
	  fixed : true,//
//	  follow : 'demoBtn4',//弹出层跟随自定义元素来定位
//	  followX : -265,
//	  followY : 24,
	  autoClose : 0,//自動關閉
	  callback : function(){//關閉時調用的函數
		  document.getElementById(id).parentNode.removeChild(document.getElementById(id));
	  }
	};
	easyDialog.open(opt);
}

function popwin(id,content)
{
	var oDiv;
	oDiv=document.createElement('div');
	oDiv.className='popWindows';
	oDiv.id=id;
	document.body.appendChild(oDiv);
	oDiv.style.display="none";
	oDiv.innerHTML=content;
	wOpen(id);
}

function nowloading()
{
	var oDiv;
	var oImage;
	oDiv=document.createElement('div');
	oDiv.id='loadgif';
	oDiv.className='png_bg';
	oDiv.innerHTML='<img src="templates/dvn/images/20 .gif" />';
	document.body.appendChild(oDiv);
	wOpen('loadgif');
}

function wClose(func)
{
	easyDialog.close();
}

function shownav(val,num)
{
	if(val!=num)
	{
		$("#shownav_"+val).removeClass("onNav");
		$("#shownav_"+val).addClass("on_bg");
		
	}
}

function hidenav(val,num)
{
	if(val!=num)
	{
		$("#shownav_"+val).removeClass("on_bg");
	}
}