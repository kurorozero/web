/**
 * 
 * @authors Kami (kurorozero@gmail.com)
 * @date    2013-06-14 16:00:19
 * @version $Id$
 */

/**
 * [Whenever timeDelay sliding the li elements]
 * @return {[object]}
 * 
    var slider=sliding('scrollBtn',4000);
    slider();
 */
function sliding(elmId,timeDelay){
    var current=0,
    timeHandle=null,
    elemLi=document.getElementById(elmId).getElementsByTagName('li');

    for (var i=0,counter=elemLi.length;i < counter;i++) {
        hover(elemLi[i],i);
    }

    function hover(el,index){
        el.onmouseover=function(){
            clearInterval(timeHandle);
            removeClass();
            el.className='cur';
        }

        el.onmouseout=function(){
            removeClass();
            current=index;
            elemLi[index].className='cur';
            timeHandle=window.setInterval(autoRun, timeDelay);
        }
    }

    function removeClass(){
        for(var i=0,counter=elemLi.length;i<counter;i++){
            elemLi[i].className='';
        }
    }

    function autoRun(){
        current=current+1 >= elemLi.length ? 0 : current+1;
        removeClass();
        elemLi[current].className='cur';
    }

    return function(){
        timeHandle=window.setInterval(autoRun, timeDelay);
    }
}