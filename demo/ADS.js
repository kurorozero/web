/**
 * Created by JetBrains PhpStorm.
 * User: jikey
 * Date: 12-2-6
 * Time: 上午10:23
 * To change this template use File | Settings | File Templates.
 */
(function(){
    // ADS 命名空间
    if(!window.ADS) { window['ADS'] = {}; };
    
    ADS = {
        node: {
            ELEMENT_NODE               :1,
            ATTRIBUTE_NODE             :2,
            TEXT_NODE                  :3,
            CDATA_SECTION_NODE         :4,
            ENTITY_REFERENCE_NODE      :5,
            ENTITY_NODE                :6,
            PROCESSING_INSTRUCTION_NODE:7,
            COMMENT_NODE               :8,
            DOCUMENT_NODE              :9,
            DOCUMENT_TYPE_NODE         :10,
            DOCUMENT_FRAGMENT_NODE     :11,
            NOTATION_NODE              :12
        },
        // document.getElementById 替代方法
        $: function(){
            var elements = [];
            for(var i=0; i<arguments.length; i++){
                var element = arguments[i];
                if(typeof element == 'string'){
                    element = document.getElementById(element);
                }
                if(arguments.length == 1){
                    return element;
                }
                return elements.push(element);
            }
            return elements;
        },

        // 确定当前浏览器是否与整个库兼容
        isCompatible: function(other){
            if(other === false || !Array.prototype.push || !Object.hasOwnProperty || !document.createElement || !document.getElementsByTagName){
                return false;
            }
            return this;
        },
        // 添加事件支持
        addEvent: function(node, type, listener){
            var that = this;
            if(!that.isCompatible()){ return false; }
            if(!(node = that.$(node))){ return false; }
            if(node.addEventListener){ // w3c
                node.addEventListener(type, listener, false);
            } else if(node.attachEvent){ // ie
                node['e' + type + listener] = listener;
                node[type + listener] = function(){
                    node['e' + type + listener](window.event);
                }
                node.attachEvent('on' + type, node[type + listener]);
                return true;
            }
            return false; // 若两种方法都不支持返回false
        },
        // 移除事件
        removeEvent: function(node, type, listener){
            var that = this;
            if(!(node = that.$(node))){ return false; }
            if(node.removeEventListener){ // w3c
                node.removeEventListener(type, listener, false);
            } else if(node.detachEvent){
                node.detachEvent('on' + type, node[type + listener]);
                node[type + listener] = null;
                return true;
            }
            return false;
        },
        /**
         * 得到class
         * @param className 类名
         * @param tag 标签名
         * @param parent 父元素，如果为空，则为document
         */
        getElementsByClassName: function(className, tag, parent){
            var that = this;
            parent = parent || document;
            if(!(parent = that.$(parent))){ return false; }
            // 查找所有的标签
            var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag),
                matchingElements = [];

            className = className.replace(/\-/g, '\\-');
            var regex = new RegExp('(^|\\s)' + className + '(\\s|$)'),
                element;
            // 检查每个元素
            for(var i=0; i<allTags.length; i++){
                element = allTags[i];
                if(regex.test(element.className)){
                    matchingElements.push(element);
                }
            }
            return matchingElements;
        },
        /**
         * 切换可见性
         * @param node
         * @param value 设置显示后的默认值
         */
        toggleDisplay: function(node, value){
            var that = this;
            if(!(node = that.$(node))){ return false; }
            node.style.display = node.style.display != 'none' ? 'none' : (value || '');
            return that;
        },
        /**
         * 在其后插入元素
         * @param node 要插入的节点
         * @param referenceNode 在此节点之后插入新节点
         */
        insertAfter: function(node, referenceNode){
            var that = this;
            if(!(node = that.$(node))){ return false; }
            if(!(referenceNode = that.$(referenceNode))){ return false; }
            return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
        },
        /**
         * 移除子元素
         * @param parent 父节点
         */
        removeChildren: function(parent){
            var that = this;
            if(!(parent = that.$(parent))){ return false; }
            // 当存在子节点时删除该子节点
            while(parent.firstChild){
                parent.firstChild.parentNode.removeChild(parent.firstChild);
            }
            return parent;
        },
        /**
         * 在子节点前插入
         * @param parent 父节点
         * @param newChild 新节点
         */
        prependChild: function(parent, newChild){
            var that = this;
            if(!(parent = that.$(parent))){ return false; }
            if(!(newChild = that.$(newChild))){ return false; }
            if(parent.firstChild){ // 如果存在子节点则在这个子节点之前插入
                parent.insertBefore(newChild, parent.firstChild);
            } else { // 如果没有子节点，则直接插入
                parent.appendChild(newChild);
            }
            return parent;
        },

        /**
         * 给对象绑定方法
         * @param obj
         * @param func
         */
        bindFunction: function(obj, func){
            return function(){
                func.apply(obj, arguments);
            }
        },

        /**
         * 日志记录
         * @param id
         */
        myLogger: function(id){
            function myLog(id){
                id = id || 'ADSLogWindow';
                var logWindow = null;
                var createWindow = function(){};
                this.writeRaw = function(message){};
            };
            myLog.prototype = {
                write: function(){

                },
                header: function(){

                }
            };
            return new myLog();
        },
        // 得到窗口大小
        getBrowserWindowSize: function(){
            var de = document.documentElement;
            return {
                'width': (window.innerWidth || (de && de.clientWidth) || document.body.clientWidth),
                'height': (window.innerHeight || (de && de.clientHeight) || document.body.clientHeight)
            }
        },
        // 把word-word转换为wordWord
        camelize: function(s){
            return s.replace(/-(\w)/g, function(strMatch, p1){
                return p1.toUpperCase();
            });
        },
        /**
         * 寻找DOM
         * @param func
         * @param node 节点
         * @param depth 深度
         * @param returnedFromParent
         */
        walkTheDOMRecursive: function(func, node, depth, returnedFromParent){
            var that = this,
                root = node || document,
                returnedFromParent = func.call(root, depth++, returnedFromParent),
                node = root.firstChild;

            while(node){
                that.walkTheDOMRecursive(func, node, depth, returnedFromParent);
                node = node.nextSibling;
            }
        }


    };
   
    // 重复
    if(String.repeat){
        String.prototype.repeat = function(l){
            return new Array(l + 1).join(this);
        }
    }
    // 去除空白
    if(String.trim){
        String.prototype.trim = function(s){
            return this.replace(/^\s+|\s+$/g, '');
        }
    }
})();