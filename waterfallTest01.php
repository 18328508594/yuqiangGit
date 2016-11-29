<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<title>瀑布流布局</title>
<meta name="description" content="">
<meta name="keywords" content="">
<link href="" rel="stylesheet">
<style>
	.wrap{
		position: relative;
	}
	.item{
		position: absolute;
		width: 300px;
		margin-left: 30px;
		margin-top: 20px;
		transition: all 1s;
	}
    .item img{
        width: 100%;
        height: auto;
    }
</style>
</head>
<body>
    <div class="wrap">
    	<?php 
            for ($i=0; $i < 50; $i++) { ?>
               <div class="item"><img src="waterfall_icon/<?php echo $i?>.jpg"></div>
        <?php    }
        ?>
    </div>
    <script src="js/jquery-3.1.0.js" type="text/javascript"></script>
    <script type="text/javascript">
        waterfall(); 
        //resize 侦测浏览器窗口变化，有变化重新计算和布局
        $(window).resize(function () {
             waterfall(); 
        })      
        function waterfall () {     
            var itemW = $('.item').outerWidth(true),
        		windowW = $(window).width(),
        		colNum = Math.floor(windowW/itemW),//有多少列
        		colNowHeight = [];//存放每一列当前总的高度
        	console.log("itemW="+itemW+" windowW="+windowW+" colNum="+colNum);
            for(var i = 0;i < colNum;i++){
        		colNowHeight.push(0);//初始化数组，每列当前总的高度0
        	}
        	
            //遍历每个item选择他们的归属
        	$('.item').each(function() {
                $this = $(this);
        		//遍历找出高度最短的列及其对应的高度
                var minColNowHeight = colNowHeight[0],
                    minCol = 0;//最小总高度的列
        		for(var i = 0;i < colNowHeight.length;i++){
                    if (colNowHeight[i] < minColNowHeight) {
                        minColNowHeight = colNowHeight[i];
                        minCol = i;
                    }
                }
                $this.css({
                    left: itemW * minCol,
                    top: minColNowHeight
                });
                colNowHeight[minCol] += $this.outerHeight(true);
        	});
        } 
    </script>
</body>
</html>