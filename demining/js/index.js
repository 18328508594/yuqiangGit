// JavaScript Document
// LEVEL1 初级 9*9 雷数 10
// LEVEL2 中级 16*16 雷数 40
// LEVEL3 高级 16*30 雷数 99

var level1 = {  //初级
	row:9,    //行
	col:9,    //列
	mineNum:10   //地雷数
};

var level2 = {  //中级
	row:16,    //行
	col:16,    //列
	mineNum:40   //地雷数
};

var level3 = {  //高级
	row:16,    //行
	col:30,    //列
	mineNum:99   //地雷数
};
var mineFieldContainer = document.getElementsByClassName("mine-field-container")[0]; //地雷区container
var form = document.getElementsByTagName("form")[0];//表单对象
var remainMineNumberObj = document.getElementById("remain-mine-number");
var timeObj = document.getElementById("time");
//难度选择
form.onclick = function(e){
	var target = e.target;
	if (target.name === "level") {
		if (target.value === "level1") {
			curLevel = level1;
		}else if (target.value === "level2") {
			curLevel = level2;
		}else{
			curLevel = level3;
		}
		clearInterval(timerId);
		gameStarted = false;
		remainMineNumber = curLevel.mineNum;
		timing = 0;
		remainMineNumberObj.innerHTML = "剩余地雷数: " + remainMineNumber;
		timeObj.innerHTML = "游戏用时: " +　timing;
		init();
	}
};
var timerId;//定时器句柄
var start = document.getElementById("start");
start.onclick = function(){
	timing = 0;
	timeObj.innerHTML = "游戏用时: " +　timing;
	remainMineNumber = curLevel.mineNum;
	remainMineNumberObj.innerHTML = "剩余地雷数: " + remainMineNumber;
	timeObj.innerHTML = "游戏用时: " +　timing;
	init();		
	clearInterval(timerId);
	gameStarted = true;
	timerId = setInterval(function(){
		timing++;
		timeObj.innerHTML = "游戏用时: " +　timing;
	},1000);
};
var curLevel = level1; //当前难度
var mineMap = [];//记录地雷位置的二维数组 0 -- 8表示无地雷时周围地雷数  -1 表示当前位置为地雷
var timing = 0;//游戏用时
var gameStarted = false;//游戏是否开始
var remainMineNumber = curLevel.mineNum;//剩余地雷数
remainMineNumberObj.innerHTML = "剩余地雷数: " + remainMineNumber;
timeObj.innerHTML = "游戏用时: " +　timing;
/**************初始化mineMap二维数组********************/
function initTwoDimensionalArray(){
	for (var i = curLevel.row - 1; i >= 0; i--) {
		mineMap[i] = [];
		for (var j = curLevel.col - 1; j >= 0; j--) {
			mineMap[i][j] = 0;
		}
	}
}
/************随机地雷分布初始化********************/
function initMineMap(){
	initTwoDimensionalArray();//初始化mineMap二维数组
	var curMineNum = 1; //当前地雷数
	while(curMineNum <= curLevel.mineNum){   //初始化地雷位置
		var x = Math.floor(Math.random()*curLevel.row);
		var y = Math.floor(Math.random()*curLevel.col);
		if (mineMap[x][y] === 0) {
			mineMap[x][y] = -1;
			curMineNum++;
		}
	}
	getAroundMineNum();
}
/**************当前位置不是地雷时获取周围地雷数目**********************/
function getAroundMineNum(){
	for(var i = 0;i < curLevel.row; i++){
		for(var j = 0;j < curLevel.col;j++){
			if (mineMap[i][j] === 0) {
				var aroundMineNum = 0;
				var startX = (i-1)>=0?(i-1):0;
				var endX = (i+1)<curLevel.row?(i+1):(curLevel.row-1);
				var startY =  (j-1)>=0?(j-1):0;
				var endY = (j+1)<curLevel.col?(j+1):(curLevel.col-1);
				for(var x = startX;x <= endX;x++){
					for(var y = startY;y <= endY;y++){					
						if (mineMap[x][y] === -1) {
							aroundMineNum++;
						}
					}
				}
				mineMap[i][j] = aroundMineNum;
			}
		}
	}
}



/***************创建N*M的表格***************/
function drawMineMap(){
	var table = document.createElement("table");
	for(var i = 0;i < curLevel.row;i++){
		var tr = document.createElement("tr");
		for(var j = 0;j < curLevel.col;j++){
			var td = document.createElement("td");
			td["data-x"] = i;  //记录当前位置坐标
			td["data-y"] = j;
			td.appendChild(drawRect());
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	mineFieldContainer.appendChild(table);
}


/*************绘制正方形方块模拟未点击时的样子*************/
function drawRect(){
	var canvas = document.createElement("canvas");
	canvas.width = 30;
	canvas.height = 30;
	canvas["data-flag"] = -99;//是否为未点击
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#666666";
		ctx.fillRect(0,0,30,30);
	}
	return canvas;
}
/*******************绘制地雷**************************/
function drawMine(){
	var img = document.getElementById("mine");
	var canvas = document.createElement("canvas");
	canvas.width = 30;
	canvas.height = 30;
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0,30,30);
	}
	return canvas;
}

/*******************绘制旗子标志**************************/
function drawFlag(){
	var img = document.getElementById("flag");
	var canvas = document.createElement("canvas");
	canvas.width = 30;
	canvas.height = 30;
	canvas.class = "flag";
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img,0,0,30,30);
	}
	return canvas;
}

/****************绘制数字文本***********************/
function drawDigit(text){
	var canvas = document.createElement("canvas");
	canvas.width = 30;
	canvas.height = 30;
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.font = "bold 18px Arial";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(text,15,15);		
	}
	return canvas;
}
/***************绘制空白正方形格子**********************/
function drawPlaceRect(){
	var canvas = document.createElement("canvas");
	canvas.width = 30;
	canvas.height = 30;
	if (canvas.getContext) {
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#ffff5a";
		ctx.fillRect(0,0,30,30);
	}
	return canvas;
}

//判断元素是否有子元素，当有子元素是就删除
function removeAllChild(elem) {
    while(elem.hasChildNodes()) {//当存在子节点时，循环继续
        elem.removeChild(elem.firstChild);
    }
}

/***************初始化********************/
function init(){
	removeAllChild(mineFieldContainer);
	initMineMap(); //生成地雷分布
	drawMineMap(); //生成地雷地图
}


/**************加载**************/
window.onload = function(){
	init();
	mineFieldContainer.onclick = leftClick; //左击
	mineFieldContainer.oncontextmenu = rightClick;  //右击
	
};

/*************左击事件*****************/
function leftClick(e){
	if (!gameStarted) {
		return;
	}
	var target = e.target.parentNode; //获取td元素
	var x = target["data-x"];
	var y = target["data-y"];
	if (typeof target["data-x"] === "number") {
		if (target.firstChild.class === "flag") {
			return;
		}
		var flagNum = mineMap[x][y];//获取当前点击位置是否为地雷或者不为地雷是周围地雷数
		if (flagNum === -1) {
			target.removeChild(target.firstChild);//删除td子节点
			target.appendChild(drawMine());
			gameStarted = false;
			clearInterval(timerId);
			alert("失败");
			return;
		}else if (flagNum === 0 ) {
			findPlaceRect(x,y);
		}else{
			target.removeChild(target.firstChild);//删除td子节点
			target.appendChild(drawDigit(flagNum));
		}
	}
	if (remainMineNumber === 0) {
		var isOver = true;//判断是否全部点击完毕
		var canvases = document.getElementsByTagName("canvas");
			for (var i = canvases.length - 1; i >= 0; i--) {
				if (canvases[i]["data-flag"] === -99) {
					isOver = false;
				}
			}
			if (isOver) {
				gameStarted = false;
				clearInterval(timerId);
				alert("成功");
		    }
	}
}

/*******************右击事件*********************/
function rightClick(e){
	if (!gameStarted) {
		return false;
	}
	var target = e.target.parentNode; //获取td元素
	if (typeof target["data-x"] === "number") {
		if (target.firstChild.class === "flag") {
			target.removeChild(target.firstChild);//删除td子节点
			target.appendChild(drawRect());
			remainMineNumber++;
			remainMineNumberObj.innerHTML = "剩余地雷数: " + remainMineNumber;
		}else{
			target.removeChild(target.firstChild);//删除td子节点
			target.appendChild(drawFlag());
			remainMineNumber--;
			remainMineNumberObj.innerHTML = "剩余地雷数: " + remainMineNumber;
			if (remainMineNumber === 0) {
				var isOver = true;//判断是否全部点击完毕
				var canvases = document.getElementsByTagName("canvas");
				for (var i = canvases.length - 1; i >= 0; i--) {
					if (canvases[i]["data-flag"] === -99) {
						isOver = false;
					}
				}
				if (isOver) {
					gameStarted = false;
					clearInterval(timerId);
					alert("成功");
				}
				
			}
		}
	}
	return false;	
}


/******************连续空白格子搜索********************/
function findPlaceRect(x,y){
	//标记该点是否被访问过
	var isVisited = [];
	for(var i = 0;i < curLevel.row;i++){
		isVisited[i] = [];
		for(var j = 0; j < curLevel.col;j++){
			isVisited[i][j] = 0;
		}
	}
	var queen = [];
	queen.push({x:x,y:y});
	while(queen.length > 0){
		var point = queen.shift();
		if (mineMap[point.x][point.y] == 0) {
			isVisited[point.x][point.y] = 1;//标记为已访问
			var curTr = mineFieldContainer.getElementsByTagName("tr")[point.x];
			var target = curTr.getElementsByTagName("td")[point.y];
			target.removeChild(target.firstChild);//删除td子节点
			target.appendChild(drawPlaceRect());
			//往队列中添加该点周围4个未被访问过的点
			if ((point.x-1) >= 0 && isVisited[point.x-1][point.y] === 0) {
				queen.push({x:point.x-1,y:point.y});
			}
			if ((point.x+1) < curLevel.row && isVisited[point.x+1][point.y] === 0) {
				queen.push({x:point.x+1,y:point.y});
			}
			if ((point.y-1) >= 0 && isVisited[point.x][point.y-1] === 0) {
				queen.push({x:point.x,y:point.y-1});
			}
			if ((point.y+1) < curLevel.col && isVisited[point.x][point.y+1] === 0) {
				queen.push({x:point.x,y:point.y+1});
			}
		}
	}
}


