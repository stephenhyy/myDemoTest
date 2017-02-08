/**
 * Created by steve on 2017/2/8.
 */
$(document).ready(function(){

	waterfall(".container",".box");
	//模拟数据json
	var dataJson = {'data': [{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'},{'src':'5.jpg'}]};

	window.onscroll=function(){
		var isPosting = false;
		if(checkscrollside(".container",'.box') && !isPosting){
			isPosting = true;
			console.log(isPosting);
			$.each(dataJson.data,function(index,dom){
				var $box = $('<div class="box"></div>');
				$box.html('<div class="box-image"><img src="../images/'+$(dom).attr('src')+'"></div>');
				$('.container').append($box);
				waterfall('.container','.box');
				isPosting = false;
			});
		}
	}
});
function waterfall(parentName,boxName)
{
	var container=$(parentName);
	var boxArr=$(boxName);
	var boxWidth=boxArr.eq(0).outerWidth();
	var bodyWidth=$(window).width();
	var num=Math.floor( bodyWidth / boxWidth );
	container.width(boxWidth * num).css({'margin': '0 auto'});


	var boxHArr=[];//每一列相加的高度

	boxArr.each(function(index,value){
		if(index < num)
		{
			boxHArr[index]=boxArr.eq(index).outerHeight()
		}
		else
		{
			var minH = Math.min.apply( null, boxHArr );//数组pinHArr中的最小值minH
			var minHIndex = $.inArray( minH, boxHArr );
			$(value).css({
				"position":"absolute",
				"top":minH,
				"left":boxArr.eq( minHIndex ).position().left
			});
			boxHArr[minHIndex]+=boxArr.eq(index).outerHeight();
		}
	})

}
//检验是否满足加载数据条件，即触发添加块框函数waterfall()的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
function checkscrollside(parent,clsName){
	//最后一个块框
	var $lastBox = $(parent).find(clsName).last(),
			lastBoxH = $lastBox.offset().top + $lastBox.outerHeight()/ 2,
			scrollTop = $(window).scrollTop(),
			documentH = $(window).height();
	console.log(lastBoxH+":"+scrollTop+":"+documentH);
	return lastBoxH < scrollTop + documentH ? true : false;
}
