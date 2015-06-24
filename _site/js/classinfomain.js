$(document).ready(function(){
	var $windowWidth = $(window).width();
	setTimeout(function(){
		$windowWidth = $(window).width();
		if($windowWidth > 640){
			$windowWidth = 640;
		}
		$("html").css("font-size",(100/320) * $windowWidth + "px");
	},100);
	

	$(window).resize(function(){
		$windowWidth = $(window).width();
		if($windowWidth > 640){
			$windowWidth = 640;
		}
		$("html").css("font-size",(100/320) * $windowWidth + "px");
	});
});
window.onload = function(){
	$(".classInfoMain").css("display","block");
	var $myImages = $(".classDescriptionContent img");
	$(".classDescriptionContent p").css("margin-bottom","0.1rem");
	$(".classDescriptionContent h3").css("margin-bottom","0.05rem");
	$myImages.each(function(){
		if($(this).width() >= $(".classDescriptionContent").width()){
			$(this).attr({"width":"","height":""}).css({"width":"2.96rem","height":"auto","margin-bottom":"0.1rem"});
		}
	});

	var rem = $(window).width() * (100/320) ;

	var $mytable = $("table");
	$mytable.each(function(){
		var thisWidth = $(this).width();
		var thisHeigth = $(this).height();
		var bei = (2.96*rem) / thisWidth;
		if($(this).width() >= $(".classDescriptionContent").width()){
			$(this).attr({"style":"-webkit-text-size-adjust:none;font-size:"+ 0.14 * bei +"rem"});
		}
	});
}