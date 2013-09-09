var isIE=!-[1,];
var isIE6=isIE&&!window.XMLHttpRequest;
var isIE8=isIE&&!!document.documentMode;
var isIE7=isIE&&!isIE6&&!isIE8;

var addEvt=function(element,type,func){
	if(element.attachEvent){
		element[type+func]=function(){func(window.event);}
		element.attachEvent("on"+type,element[type+func]);
	}else{
		element.addEventListener(type,func,false);
	}
}

var removeEvt=function(element,type,func){
	if(element.detachEvent){
		element[type+func]=function(){func(window.event);}
		element.detachEvent("on"+type,element[type+func]);
	}else{
		element.removeEventListener(type,func,false);
	}
}

function stopBubble(evt)
{	if(!evt)evt=arguments[0];
    if (evt && evt.stopPropagation){
		evt.preventDefault();//阻止默認行為
        evt.stopPropagation();//阻止事件傳遞
	}else{
		window.event.returnValue=false;//阻止默認行為
        window.event.cancelBubble=true;//阻止冒泡
	}
}
 
function addEvent(element, type, handler) {
    if (!handler.$$guid)
		handler.$$guid = addEvent.guid++;
    if (!element.events)
		element.events = {};
    var handlers = element.events[type];
    if (!handlers) {
        handlers = element.events[type] = {};
        if (element["on" + type]) {
            handlers[0] = element["on" + type];
        }
    }
    handlers[handler.$$guid] = handler;
    element["on" + type] = handleEvent;
}

addEvent.guid = 1;
    
function removeEvent(element, type, handler) {
    if (element.events && element.events[type]) {
        delete element.events[type][handler.$$guid];
    }
}
function handleEvent(event) {
    var returnValue = true;
    event = event || fixEvent(window.event);
    var handlers = this.events[event.type];
    for (var i in handlers) {
        this.$$handleEvent = handlers[i];
        if (this.$$handleEvent(event) === false) {
            returnValue = false;
        }
    }
    return returnValue;
};
    
function fixEvent(event) {
    event.preventDefault = fixEvent.preventDefault;
    event.stopPropagation = fixEvent.stopPropagation;
    return event;
};
fixEvent.preventDefault = function() {
    this.returnValue = false;
};
fixEvent.stopPropagation = function() {
    this.cancelBubble = true;
};
