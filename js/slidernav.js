/*
 *  SliderNav - A Simple Content Slider with a Navigation Bar
 */
$.fn.sliderNav = function (options)
{
	var defaults = {
		items: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
		height: null,
		arrows: true,
		stopHeight:100//滚动条停留位置
	};
	var obj = $.extend({},defaults, options);
	var slider = $(this);
	$(slider).addClass('slider');
	$('.slider-content li:first', slider).addClass('selected');
	$(slider).append('<div class="slider-nav"><ul></ul></div>');
	for (var i in obj.items) $('.slider-nav ul', slider).append("<li><a alt='#" + obj.items[i] + "'>" + obj.items[i] + "</a></li>");
	var height = $('.slider-nav', slider).height();
	if (obj.height) height = obj.height;
	$('.slider-content, .slider-nav', slider).css('height', height);
	$('.slider-nav li:first a', slider).addClass('selected');
	$('.slider-nav a', slider).click(function ()
	{
		var target = $(this).attr('alt');
		var cOffset = $('.slider-content', slider).offset().top;
		var tOffset = $('.slider-content ' + target, slider).offset().top;
		//var cOffset1 = $('.slider-content', slider).position().top;
		//var tOffset1 = $('.slider-content ' + target, slider).position().top;
		var height = $('.slider-nav', slider).height();
		if (obj.height) height = obj.height;
		console.log(cOffset+"---"+tOffset);
		var pScroll = (tOffset - cOffset)-obj.stopHeight;
		$('.slider-content', slider).stop().animate({scrollTop: '+=' + pScroll + 'px'},500);
	});
	if (obj.arrows)
	{
		$('.slider-nav', slider).css('top', '20px');
		$(slider).prepend('<div class="slide-up end"><span class="arrow up"></span></div>');
		$(slider).append('<div class="slide-down"><span class="arrow down"></span></div>');
		$('.slide-down', slider).click(function ()
		{
			$('.slider-content', slider).animate({scrollTop: "+=" + height + "px"}, 500);
		});
		$('.slide-up', slider).click(function ()
		{
			$('.slider-content', slider).animate({scrollTop: "-=" + height + "px"}, 500);
		});
	}
	//每一块的标题的id和相对于父容器的高度对象
	var heightArr=[];
	var idArr=[];
	$('.slider-content>ul>li').each(function(index,element)
	{
		heightArr[index]=$(element).position().top;
		idArr[index]=$(element).attr("id")
	});
	console.log(heightArr);
	console.log(idArr);

	$('.slider-content', slider).scroll(function()
	{
		var scrollTop=$('.slider-content', slider).scrollTop();
		var index=0;
		for(var i=0;i<heightArr.length-1;i++)
		{
			if(scrollTop+obj.stopHeight>=heightArr[i]&&scrollTop+obj.stopHeight<heightArr[i+1])
			{
				index=i;
			}
		}
		if(scrollTop+obj.stopHeight>=heightArr[heightArr.length-1])
		{
			index=heightArr.length-1;
		}
		$('.slider-content li', slider).removeClass('selected');
		$('.slider-content #'+idArr[index], slider).addClass('selected');
		$('.slider-nav li a', slider).removeClass('selected');
		$('.slider-nav li a[alt=#'+idArr[index]+']').addClass('selected');
		console.log(scrollTop)
	})
};