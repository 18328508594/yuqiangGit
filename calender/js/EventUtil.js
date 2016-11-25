// JavaScript Document
var EventUtil = {
	addHandler: function(element, type, handler){    //添加事件处理程序
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		}else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		}else{
			element["on"+type] = handler;
		}
	},

	removeHandler: function(element, type, handler){    //移除事件处理程序
		if(element.removeEventListener){
			element.removeEventListener(type,handler,false);
		}else if(element.detachEvent){
			element.detachEvent(type,handler);
		}else{
			element["on"+type] = null;
		}
	},

	getEvent: function(event){    //获取事件event对象
		return event ? event : window.event;
	},

	getTarget: function(event){    //获取事件目标元素
		return event.target || event.srcElement;
	},

	preventDefault: function(event){  //取消事件默认行为
		if (event.preventDefault) {
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},

	stopPropagation: function(event){   //阻止事件冒泡
		if (event.stopPropagation) {
			event.stopPropagation();
		}else{
			event.cancelBuddle = true;
		}
	}
};