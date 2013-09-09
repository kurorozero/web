var isIE = !-[1,];
function checkform(id)
{
	var frmelems = document.getElementById(id).elements;
	var checkobj;
	var arr=new Array();
	var cansubmit;
	var rdo;
	for(i=0,shu=frmelems.length;i<shu;i++)
	{
		checkobj=new Object();
		if(isIE){
			if(frmelems[i].patten)
			{
				sPatten=frmelems[i].patten;
				oInput=frmelems[i];
				checkobj.patten=sPatten;
				checkobj.element=oInput;
				arr.push(checkobj);
			}
		}else{
			if(frmelems[i].hasAttribute('patten'))
			{
				sPatten=frmelems[i].getAttribute('patten');
				oInput=frmelems[i];
				checkobj.patten=sPatten;
				checkobj.element=oInput;
				arr.push(checkobj);
			}
		}
	}
	
	shu=arr.length
	if(shu==0)
	{
		return true;	
	}
	
	for(i=0;i<shu;i++)
	{
		//alert(arr[i].patten);
		switch(arr[i].patten)
		{
			case 'username'://patten="username"
				cansubmit=checkname(arr[i].element);
				break;
			case 'email'://patten="email"
				cansubmit=checkemail(arr[i].element);
				break;
			case 'phone'://patten="phone"
				cansubmit=checkallphone(arr[i].element);
				break;
			case 'password'://patten="password" bind="pwBox id"
				cansubmit=checkpassword(arr[i].element);
				break;
			case 'radio':
				if(!rdo)
				{
					rdo=cansubmit=checkradio(arr[i].element);
				}
				else
				{
					cansubmit=rdo;
				}
				break;
			case 'checkbox':
				cansubmit=checkchkbox(arr[i].element);
				break;
			case 'required':
				cansubmit=checkrequired(arr[i].element);
				break;
			default:
				break;
		}
		
		if(cansubmit==false && cansubmit!=null)
		{
			break;	
		}
	}

	if(cansubmit==true)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function checkname(obj)
{
	var oReg=new RegExp(/[0-9a-zA-Z_-]{3,20}/);
	bMatch=oReg.test(obj.value);
	if(!bMatch)
	{
		alert('please input you account in right format');
	}
	return bMatch;
}
function checkallphone(obj)
{
	var phone=checkphone(obj);
	var mobile=checkmobile(obj);
	if(phone || mobile)
	{
		bMatch=true;
	}
	else
	{
		alert('please input contact number in right format');
		bMatch=false;
	}
	return bMatch;
}
function checkemail(obj)
{
	var oReg=new RegExp(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/);
	bMatch=oReg.test(obj.value);
	if(!bMatch)
	{
		alert('please input you email in right format ');
	}
	return bMatch;
}
function checkphone(obj)
{
	var phone=new RegExp(/^((\d{3,4})|\d{3,4}-)?\d{7,8}(-\d+)*$/i);
	var bPhone=phone.test(obj.value);
	return bPhone;
}

function checkmobile(obj)
{
	var mobile=new RegExp(/^1[3584]\d{9}$/i);
	var bMobile=mobile.test(obj.value);	
	return bMobile;
}

function checkpassword(obj)
{
	var bindName;
	var bind;
	var result;
	if(isIE){
		bindName=obj.bind;
	}else{
		bindName=obj.getAttribute('bind');
	}
	bind=document.getElementById(bindName);
	if(obj.value == bind.value)
	{
		result=true;
	}
	else
	{
		alert('2 password not match');
		result=false;
	}
	if(obj.value=='')
	{
		alert('password must be fill');	
		result=false;
	}
	else if(bind.value=='')
	{
		alert('password must be fill');	
		result=false;
	}
	return result;
}

function checkrequired(obj)
{
	var oReg=new RegExp(/\S+/i);
	bMatch=oReg.test(obj.value);
	if(!bMatch)
	{
		alert('please input the box with \'*\' ');
	}
	return bMatch;
}

function checkradio(obj)
{
	var radioname=obj.name;
	var radios=document.getElementsByName(radioname);
	var flag;
	var shu=radios.length;
	for(var i=0;i<shu;i++)
	{
		if(radios[i].checked==true)
		{
			flag=true;
			return true;
		}
	}
	alert('please select one radio');
	return false;
}

function checkchkbox(obj)
{
	var txt;
	if(obj.checked==true)
	{
		return true;
	}
	else
	{
		if(isIE){
			txt=obj.txt;
		}else{
			txt=obj.getAttribute('txt');
		}
		alert('please select the '+txt);
		return false;
	}
}