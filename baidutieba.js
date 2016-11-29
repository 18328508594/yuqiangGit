/**
 * 贴吧自动回复  需等网页完全加载完成后
 * @type {Array}
 */
(function init(){
	var thisFunction = arguments.callee;
	var pigs =["假猪套天下第一,天域幽魂魔战垃圾",
	 	"听说瞎吧假猪套统治天下，这很假猪",
	 	"假猪套强无敌,假猪套吊打天域幽魂",
	 	"我这样水经验会不会被封号,我好怕怕啊",
	 	"怎么样能不花钱变得更强？你离强无敌只差一套假猪"
	];
	var index = 0;
	var d_post_content_main = document.getElementsByClassName("d_post_content_main");//每层楼的回复主区域
	var len = d_post_content_main.length;
	console.log("len==="+len);
	var interval = setInterval(function(){
	 	if (index == len) {	
		 	var l_pager = document.getElementsByClassName("l_pager")[0];
		 	if (typeof l_pager!= "undefined") {
		 		var nextPager = l_pager.getElementsByTagName("a");
		 		for(var i=0;i<nextPager.length;i++){
		 			if (nextPager[i].innerHTML=="下一页") {
		 				nextPager[i].click();
		 				setTimeout(thisFunction,10000);
		 			}
		 		}
		 	}
		 	clearInterval(interval);
		 	console.log("水贴完成！");
		}
	 	console.log(index);
	 	var aa = d_post_content_main[index].getElementsByClassName("lzl_link_unfold")[0];
	 	if (typeof aa == "undefined") {
	 	 	aa = d_post_content_main[index].getElementByClassName("lzl_link_fold")[0];
	 	 	if (typeof aa == "undefined"){
	 	 	 	index++;
	 	 	 	return;
	 	 	}
	 	 	 
	 	 	aa.click();
	 	}
	 	setTimeout(function(){
	 		console.log("=========="+aa);
	 	 	aa.click();
	 	},500);//点击回复
	 	setTimeout(function(){
	 	 	try{
	 	 		var j_lzl_c_b_a = d_post_content_main[index].getElementsByClassName("j_lzl_c_b_a core_reply_content")[0];
		 	 	var username = j_lzl_c_b_a.getElementsByClassName("j_user_card");
		 	 	var isRepeat = false;
			 	for (var j = 0; j <username.length; j++) {
			 		if(username[j].innerHTML== "helloyu70"){
			 			isRepeat = true;
			 			break;
			 		}
		 		}
			 	if(!isRepeat){
			 		var editor_for_container = j_lzl_c_b_a.getElementsByClassName("editor_for_container")[0];
				 	var p = editor_for_container.getElementsByTagName("p")[0];
				 	p.innerHTML = pigs[index%5];
				 	var lzl_panel_submit = j_lzl_c_b_a.getElementsByClassName("lzl_panel_submit")[0];
				 	lzl_panel_submit.click();
			 	}
			 	
	 	 	}catch(error){
	 	 		
	 	 	}finally{
	 	 		index++;
	 	 	} 		
	 	},1000);
	 	 
	},5000);
})();