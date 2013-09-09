// JavaScript Document
function gb2utf8(data)
{ 
    var glbEncode = []; 
    gb2utf8_data = data; 
    execScript("gb2utf8_data = MidB(gb2utf8_data, 1)", "VBScript");
    var t = escape(gb2utf8_data).replace(/%u/g,"").replace(/(.{2})(.{2})/g,"%$2%$1").replace(/%([A-Z].)%(.{2})/g,"@$1$2"); 
    t = t.split("@");
    var i = 0, j = t.length, k; 
    while( ++i < j )
    { 
        k = t[i].substring(0,4); 
        if(!glbEncode[k]) 
        { 
            gb2utf8_char = eval("0x"+k); 
            execScript("gb2utf8_char = Chr(gb2utf8_char)", "VBScript");
            glbEncode[k] = escape(gb2utf8_char).substring(1,6); 
        } 
        t[i] = glbEncode[k]+t[i].substring(4); 
    } 
    gb2utf8_data = gb2utf8_char = null; 
    return unescape(t.join("%")); 
}

function utf8(wide) 
{
    var c, s;
    var enc = "";
    var i = 0;
    while(i<wide.length)
    {
        c= wide.charCodeAt(i++);
        // handle UTF-16 surrogates
        if (c>=0xDC00 && c<0xE000) continue;
        if (c>=0xD800 && c<0xDC00)
        {
            if (i>=wide.length) continue;
            s= wide.charCodeAt(i++);
            if (s<0xDC00 || c>=0xDE00) continue;
            c= ((c-0xD800)<<10)+(s-0xDC00)+0x10000;
        }
        // output value
        if (c<0x80) 
            enc += String.fromCharCode(c);
        else if (c<0x800) 
            enc += String.fromCharCode(0xC0+(c>>6),0x80+(c&0x3F));
        else if (c<0x10000) 
            enc += String.fromCharCode(0xE0+(c>>12),0x80+(c>>6&0x3F),0x80+(c&0x3F));
        else 
            enc += String.fromCharCode(0xF0+(c>>18),0x80+(c>>12&0x3F),0x80+(c>>6&0x3F),0x80+

                    (c&0x3F));
    }
    return enc;
}

var hexchars = "0123456789ABCDEF";   

function toHex(n)
{   
    return hexchars.charAt(n>>4)+hexchars.charAt(n & 0xF);   
} 

var okURIchars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-"; 

function encodeURIComponentNew(s)
{   
    var s = utf8(s);   
    var c;   
    var enc = "";   
    for(var i= 0; i < s.length; i++)
    {   
        if(okURIchars.indexOf(s.charAt(i))==-1)   
            enc += "%"+toHex(s.charCodeAt(i));   
        else   
            enc += s.charAt(i);   
    }   
    return enc;   
}


function TestDEMO()
{
    var s2 ="中国医科大学";
    var f2 = encodeURIComponentNew(s2);  
    alert(f2);
}

