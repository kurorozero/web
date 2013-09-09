function $(){ return document.getElementById(arguments[0])};

/**
 * 得到上一个元素
 * @param {Object} elem
 */
function prev(elem){
    do{
        elem = elem.previousSibling;
    } while(elem && elem.nodeType != 1);
    return elem;
}

/**
 * 得到下一个元素
 * @param {Object} elem
 */
function next(elem){
    do{
        elem = elem.nextSibling;
    } while(elem && elem.nodeType != 1);
    return elem;
}

/**
 * 得到第一个元素
 * @param {Object} elem
 */
function first(elem){
    elem = elem.firstChild;
    return elem && elem.nodeType != 1 ? next(elem) : elem;
}

/**
 * 得到最后一个元素
 * @param {Object} elem
 */
function last(elem){
    elem = elem.lastChild;
    return elem && elem.nodeType != 1 ? prev(elem) : elem;
}

/**
 * 得到父元素
 * @param {Object} elem
 * @param {Number} num 需要寻找的父级级别
 */
function parent(elem, num){
    num = num || 1;
    for(var i=0; i<num; i++){
        if(elem != null) elem = elem.parentNode; //原书中这块有错
    }
    return elem;
}

/**
 * 得到相关name元素
 * @param {String} name
 * @param {Object} elem
 */
function tag(name, elem){
    return (elem || document).getElementsByTagName(name)
}

/**
 * 根据tag寻找
 * @param {String} name
 * @param {String} type
 */
function hasClass(name, type){
    var r = [];
    var re = new RegExp('(^|\\s)'+name+'(\\s|$)');
    var e = document.getElementsByTagName(type || '*');
    for(var i=0; i<e.length; i++){
        if(re.test(e[i].className)){
            r.push(e[i]);
        }
    }
    return r;
    //http://www.cnblogs.com/rubylouvre/archive/2009/09/01/1557765.html //司徒兄有不同的看法
}

/**
 * 获取元素文本
 * @param {Object} e
 */
function text(e){
    var t = '';
    e = e.childNodes || e;
    for(var i=0; i<e.length; i++){
        //如果不是元素，则追加其文本值
        t += e[i].nodeType != 1 ? e[i].nodeValue : text(e[i].childNodes);
    }
    return t;
}

/**
 * 
 * @param {String} elem
 * @param {String} name
 * @param {String} value
 */
function attr(elem, name, value){
    if(!name || name.constructor != String){
        return '';
    }
    
    //检查name的属性是否在怪异命名情形中
    name = {'for': 'htmlFor', 'class': 'className'}[name] || name;
    
    if(typeof value != 'undefined'){
        elem[name] = value;
        
        if(elem.setAttribute){
            elem.setAttribute(name, value);
        }
    }
    
    return elem[name] || elem.getAttribute(name) || '';
}

/**
 * 在另一个元素之前插件元素
 * @param {Object} parent
 * @param {Object} before
 * @param {String} elem
 */
function before(parent, before, elem){
    if(elem == null){
        elem = before;
        before = parent;
        parent = before.parentNode;
    }
    
    //获取元素的新数组
    var elems = checkElem(elem);
    
    //向后遍历
    for(var i=elems.length; i>=0; i--){
        parent.insertBefore(elems[i], before);
    }
}

/**
 * 创建元素
 * @param {Object} elem
 */
function create(elem){
    //测试是否用命名空间来创建新的元素
    return document.createElementNS ? document.createElementNS('http://www.w3.org/1999/xhtml', elem) : document.createElement(elem);
}

/**
 * before 辅助函数
 * @param {Object} elem
 */
function checkElem(a){
    var r = [];
    if(a.constructor != Array){ a = [a]};
    for(var i=0; i<a.length; i++){
        //如果是字符串
        if(a[i].constructor == String){
            //用一个临时元素来存放HTML
            var div = document.createElement('div');
            div.innerHTML = a[i];
            //提取DOM结构到临时的div中
            for(var j=0; j<div.childNodes.length; j++){
                r[r.length] = div.childNodes[j];
            }
        } else if(a[i].length){ //如果它是数组
            //假定DOM节点数组
            for(var j=0; j<a[i].length; j++){
                r[r.length] = a[i][j];
            }
        } else { //否则假定是DOM节点
            r[r.length] = a[i];
        }
    }
    
    return r;
}

//此方法我已修改与原文中有异
/**
 * 添加元素 (如果只有一个参数(无elem)，则直接添加到document.body上)
 * @param {Object} elem 
 * @param {Object} parent
 */
function append(parent, elem){
    if(elem == null){
        elem = parent;
        parent = null;
    }
    
    //获取元素数组
    var elems = checkElem(elem);
    for(var i=0; i< elems.length; i++){
        (parent || document.body).appendChild(elems[i]);
    }
}

/**
 * 删除独立的DOM
 * @param {Object} elem
 */
function remove(elem){
    if(elem){ elem.parentNode.removeChild(elem) };
}

/**
 * 删除一个节点的所有子节点
 * @param {Object} elem
 */
function empty(elem){
    while(elem.firstChild){
        remove(elem.firstChild);
    }
}

/**
 * 阻止事件冒泡
 * @param {Object} e
 */
function stopBubble(e){
    if(e && e.stopPropagation){
        e.stopPropagation();
    } else {
        window.event.cancelBubble = true;
    }
}

function stopDefault(e){
    if(e && e.preventDefault){
        e.preventDefault();
    } else {
        window.event.returnValue = false;
    }
    return false;
}

/**
 * 得到外链样式
 * @param {Object} elem
 * @param {String} name
 */
function getStyle(elem, name){
    if(elem.style[name]){
        return elem.style[name];
    } else if(elem.currentStyle){ //如果ie
        return elem.currentStyle[name];
    } else if(document.defaultView && document.defaultView.getComputedStyle){ //如果是不是w3c方法
        name = name.replace(/([A-Z])/g, '-$1');
        name = name.toLowerCase();
        
        //获取样式
        var s = document.defaultView.getComputedStyle(elem, '');
        return s && s.getPropertyValue(name);
    } else {
        return null;
    }
}

/**
 * 获取元素的x位置
 * @param {String} elem
 */
function pageX(elem){
    return elem.offsetParent ? elem.offsetLeft + pageX(elem.offsetParent) : elem.offsetLeft;
}

/**
 * 获取元素的Y位置
 * @param {String} elem
 */
function pageY(elem){
    return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop;
}

/**
 * 获取元素相对于父级的x位置
 * @param {String} elem
 */
function parentX(elem){
    return elem.parentNode == elem.offsetParent ? elem.offsetLeft : pageX(elem) - pageX(elem.parentNode);
}

/**
 * 获取元素相对于父级的Y位置
 * @param {String} elem
 */
function parentY(elem){
    return elem.parentNode == elem.offsetParent ? elem.offsetTop : pageY(elem) - pageY(elem.parentNode);
}

/**
 * 查找元素的左端位置
 * @param {Object} elem
 */
function posX(elem){
    return parseInt(getStyle(elem, 'left'));
}

/**
 * 查找元素的顶端位置
 * @param {Object} elem
 */
function posY(elem){
    return parseInt(getStyle(elem, 'top'));
}

/**
 * 设置元素水平位置
 * @param {Object} elem
 * @param {Object} pos
 */
function setX(elem, pos){
    elem.style.left = pos + 'px';
}

/**
 * 设置垂直水平位置
 * @param {Object} elem
 * @param {Object} pos
 */
function setY(elem, pos){
    elem.style.top = pos + 'px';
}

/**
 * 获取高度
 * @param {Object} elem
 */
function getHeight(elem){
    return parseInt(getStyle(elem, 'height'));
}

/**
 * 获取宽度
 * @param {Object} elem
 */
function getWidth(elem){
    return parseInt(getStyle(elem, 'width'));
}

/**
 * 得到完整的高度，就算对象已隐藏
 * @param {Object} elem
 */
function fullHeight(elem){
    //如果元素显示
    if(getStyle(elem, 'display') != 'none'){
        return elem.offsetHeight || getHeight(elem);
    }
    
    //如果不显示，则复原css
    var old = resetCss(ele, {
        display: '',
        visibility: 'hidden',
        position: 'absolute'
    });
    
    var h = elem.clientHeight || getHeight(elem);
    restoreCss(elem, old);
    
    return h;
}

/**
 * 恢复原有设置
 * @param {String} elem
 * @param {Object} prop
 */
function resetCss(elem, prop){
    var old = {};
    
    for(var i in prop){
        old[i] = prop[i];
        elem.style[i] = prop[i];
    }
    return old;
}

/**
 * 
 * @param {String} elem
 * @param {Object} old
 */
function restoreCss(elem, old){
    for(var i in old){
        elem.style[i] = old[i];
    }
}

/**
 * 隐藏元素
 * @param {String} elem
 */
function hide(elem){
    var curDisplay = getStyle(elem, 'display');
    
    if(curDisplay != 'none'){
        elem.oldDisplay = curDisplay;
    }
    elem.style.display = 'none';
}

/**
 * 显示元素
 * @param {String} elem
 */
function show(elem){
    elem.style.display = elem.oldDisply || 'block';
}

/**
 * 设置透明度
 * @param {Object} elem
 * @param {Object} level (0-100)
 */
function setOpacity(elem, level){
    if(elem.filters){ //如果是IE
        elem.style.filter = 'alpha(opacity=' + level + ')';
        //必须设置zoom,要不然透明度在IE下不生效  From:http://blog.csdn.net/dxx1988/article/details/6581430
        elem.style.zoom = 1;
    } else { //否则是W3C
        elem.style.opacity = level / 100;
    }
}

/**
 * 滑动
 * @param {Object} elem
 */
function slideDown(elem){
    //elem.style.height = '0px';
    
    show(elem);
    var h = fullHeight(elem);
    
    for(var i=0; i<=100; i+=5){
        (function(){
            var pos = i;
            
            setTimeout(function(){
                elem.style.height = (pos/100) * h + 'px';
            }, (pos + 1) * 5);
        })();
    }
}
//slideDown($('pText'));
//alert(fullHeight($('pText')));

/**
 * 透明度渐显 From: http://mrthink.net/js-fadein-fadeout-fadeto/
 * @param {Object} elem
 * @param {Number} speed 淡入速度,正整数(可选)
 * @param {Number} opacity 淡入到指定的透明度,0~100(可选)
 */
function fadeInThink(elem, speed, opacity){
    speed = speed || 20;
    opacity = opacity || 100;
    
    show(elem);
    setOpacity(elem, 0);
    //初始化透明度变化值为0
    var val = 0;
    //循环将透明值以5递增,即淡入效果
    (function(){
        setOpacity(elem, val);
        val += 5;
        if (val <= opacity) {
            setTimeout(arguments.callee, speed)
        }
    })();

}

/**
 * 透明度渐显
 * @param {Object} elem
 */
function fadeIn(elem){
    //setOpacity(emel, 0);
    
    show(elem);
    for(var i=0; i<=100; i+=10){
        (function(){
            var pos = i;
            setTimeout(function(){
                setOpacity(elem, pos);
            }, (pos + 1) * 10);
        })();
    }
}

/**
 * 透明度渐隐 From: http://mrthink.net/js-fadein-fadeout-fadeto/
 * @param {Object} elem
 */
function fadeOut(elem){
    var val = 100;
    
    (function(){
        setOpacity(elem, val);
        val -= 5;
        if(val >= 0){
            setTimeout(arguments.callee, 50);
        } else if(val < 0){
            hide(elem);
        }
    })();
}

//fadeInThink($('pText'));

/**
* 光标的水平位置
* @param {Object} e
*/
function getX(e){
    e = e || window.event;
    
    return e.pageX || e.clientX + document.body.scrollLeft;
}

/**
* 光标的垂直位置
* @param {Object} e
*/
function getY(e){
    e = e || window.event;
    
    return e.pageY || e.clientY + document.body.scrollTop;
}

/**
 * 获得鼠标相对于当前元素的X位置
 * @param {Object} e
 */
function getElementX(e){
    return (e && e.layerX) || window.event.offsetX;
}

/**
 * 获得鼠标相对于当前元素的Y位置
 * @param {Object} e
 */
function getElementY(e){
    return (e && e.layerY) || window.event.offsetY;
}

/**
 * 当前页面的高度
 */
function pageHeight(){
    return document.body.scrollHeight;
}

/**
 * 当前页面的宽度
 */
function pageWidth(){
    return document.body.scrollWidth;
}

//alert(pageHeight());

/**
 * 视口的高度
 */
function windowHeight(){
    var de = document.documentElement;
    
    return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
}

/**
 * 视口的高度
 */
function windowWidth(){
    var de = document.documentElement;
    
    return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
}

/**
 * 浏览器水平滚动位置
 */
function scrollX(){
    var de = document.documentElement;
    
    return self.pageOffsetset ||  (de && de.scrollLeft) || document.body.scrollLeft;
}

/**
* 浏览器垂直滚动位置
 */
function scrollY(){
    var de = document.documentElement;
    
    return self.pageYOffset || (de && de.scrollTop) || document.body.scrollTop;
}