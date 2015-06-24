var $index = $("#index"),
	$main = $("#main"),
	$loading = $("#loading"),
	$cover = $("#cover"),
	$inCover = $(".inCover"),
	$page1 = $("#page1"),
	$page2 = $(".page2"),
	$page3 = $(".page3"),
	$second = $(".second"),
	$msecond = $(".msecond"),
	$leftHandBtn = $(".leftHandBtn"),
	$rightHandBtn = $(".rightHandBtn"),
	$timer = $(".timer"),
	$text = $(".text"),
	$understand = $(".understand"),
	$backgame = $(".backgame"),
	$againBtn = $(".againBtn"),
	$shareeatbtn = $(".shareeatbtn"),
	$shareCover = $(".shareCover"),
	$inShareCover = $(".inShareCover"),
	$inShareCover2 = $(".inShareCover2"),
	$sharebtn = $(".sharebtn"),
	$backgroundMusic = $("#backgroundMusic"),	
	$picState1 = $("#picState1"),
	$picState2 = $("#picState2"),
	$picState3 = $("#picState3"),
	$zongziCartoonIn1 = $(".zongziCartoonIn1"),
	$zongziCartoonIn2 = $(".zongziCartoonIn2"),
	$body = $("body"),
	$logo = $(".logo"),
	$blood = $(".blood"),
	indexlock = 0 ,
	inCoverText = 3,
	lock = 1,
	count = 0,
	shareMsg = "五月五，过端午~包粽嗨起来！";

var httpHeader = "";
// var httpHeader = "http://m.quyundong.com/static/";

$inCover.html(inCoverText);

for(var i = 0 ; i < 5 ; i ++){
	$("<li>"+(4-i)+"</li>").appendTo($second);
	for(var j = 0 ; j < 10 ; j ++){
		$("<li>"+(9-j)+"</li>").appendTo($msecond);
	}
}

function OverText(m) { 
	var mytext;
	var shareText;
	this.mytext =  ["5秒包了0个粽子？？？<br/>恶意卖萌！吃完粽子趣运动",
					"5秒包了" + m + "个粽子<br/>你是猪吗？！吃完粽子趣运动",
					"5秒包了" + m + "个粽子<br/>你的速度比猪快~吃完粽子趣运动",
					"5秒包了" + m + "个粽子<br/>速度堪比豺狼虎豹！吃完粽子趣运动",
					"5秒包了" + m + "个粽子<br/>不鸣则已，一鸣惊人！吃完粽子趣运动",
					"5秒包了" + m + "个粽子<br/>超音速包粽专业户~吃完粽子趣运动",
					"5秒包了" + m + "个粽子！<br/>你一定是开挂了吧~~吃完粽子趣运动",
					] ;
	this.shareText=["5秒包了" + m + "个粽子，我获得了“安吉拉”称号，战斗力基本为零~",
					"5秒包了" + m + "个粽子，我获得了“赤赤猪”称号，丢脸丢大发了！",
					"5秒包了" + m + "个粽子，我获得了“一筐猪”称号，求助神队友！",
					"5秒包了" + m + "个粽子，我获得了“放屁豹”称号，敢不敢来挑战我？！",
					"5秒包了" + m + "个粽子，我获得了“黑牛哥”称号，感觉自己猛猛哒！",
					"5秒包了" + m + "个粽子，我获得了“学霸草”称号，谁能超越我？！",
					"5秒包了" + m + "个粽子，我就是全宇宙唯一真理！不服来战！",
					] 
}

$(document).ready(function(){
	var $windowWidth = $(window).width();
	var $windowHeight = $(window).height();
	setTimeout(function(){
		$windowWidth = $(window).width();
		if($windowWidth > 640){
			$windowWidth = 640;
		}
		$("html").css("font-size",(100/320) * $windowWidth + "px");
		if($windowHeight < 450 ){
			$index.addClass("ip4");
			$page2.addClass("ip4");
			$page3.addClass("ip4");
		}else{
			$index.removeClass("ip4");
			$page2.removeClass("ip4");
			$page3.removeClass("ip4");
		}
	},100);
	
	$(window).resize(function(){
		$windowWidth = $(window).width();
		$windowHeight = $(window).height();
		if($windowWidth > 640){
			$windowWidth = 640;
		}
		$("html").css("font-size",(100/320) * $windowWidth + "px");
		if($windowHeight < 450 ){
			$index.addClass("ip4");
			$page2.addClass("ip4");
			$page3.addClass("ip4");
		}else{
			$index.removeClass("ip4");
			$page2.removeClass("ip4");
			$page3.removeClass("ip4");
		}
	});
});

$index.click(function(){
	gameStart();
});

document.body.addEventListener('touchmove', function(event) {
    // console.log('touchend event caught and default prevented', event.target);
    // event.target.focus();
    event.preventDefault();
});

$page1.addEventListener('touchstart', function(event) {
    // console.log('touchstart event caught and default prevented', event.target);
    // event.target.focus();
    event.preventDefault();
    if(event.touches.length<=1){
		lock = 1;
	}else{
		lock = 0;
	}
});

$page1[0].addEventListener('touchend', function(event) {
    // console.log('touchend event caught and default prevented', event.target);
    // event.target.focus();
    event.preventDefault();
    acting("left");
});



$shareeatbtn.click(function(){
	$shareCover.css("display","block");
	$inShareCover.css("display","block");

});

$sharebtn.click(function(){
	$shareCover.css("display","block");
	$inShareCover2.css("display","block");

});
$shareCover.click(function(){
	$(this).css("display","none");
	$inShareCover.css("display","none");
	$inShareCover2.css("display","none");
});

$againBtn.click(function(){
	$page2.removeClass("fadeIn");
	$main.animate({"-webkit-transform":"translateY(0)"},500,"ease",function(){

		$page1.addClass("fadeIn");
		$cover.css("display","block");
		inCoverText = 3;
		$inCover.html(inCoverText);
		lock = 1;
		count = 0;
		$timer.css({"-webkit-transform":"translateX(" + count / 70 * 100 + "%)"});
		$picState3.css("display","block");
		$picState2.css("display","none");$picState1.css("display","none");
		$zongziCartoonIn1.css("display","block");
		$zongziCartoonIn2.css({"background-image":" ","display":"none"});
		$blood.css("display","none");
		gameStart();
	});
});

$understand.click(function(){
	$page2.removeClass("fadeIn");
	$main.animate({"-webkit-transform":"translateY(-66.66%)"},500,"ease",function(){
		$page3.addClass("fadeIn");
	});
});

$backgame.click(function(){
	$page3.removeClass("fadeIn");
	$main.animate({"-webkit-transform":"translateY(-33.33%)"},500,"ease",function(){
		$page2.addClass("fadeIn");
	});
});

function gameStart(){
		$second.attr({"class":"second"});
		$msecond.attr({"class":"msecond"});

		$index.css("display","none");
		$main.css("display","block");
		$cover.css("display","block");

		
		setTimeout(function(){

			$page1.addClass("fadeIn");
			$second.addClass("transition5");
			$msecond.addClass("transition5");

		},200);

		var timer3 = setInterval(function(){

			inCoverText -- ;
			$inCover.html(inCoverText);

		},1000);

		setTimeout(function(){
			try{
				$("#backgroundMusic")[0].play();
			}catch(e){
				// console.log("error");
			}
			
			clearInterval(timer3);
			$cover.css("display","none");

			$second.addClass("secondmove");
			$msecond.addClass("msecondmove");

		var timer5 = setTimeout(function(){	
			try{
				$("#backgroundMusic")[0].pause();
				$("#backgroundMusic")[0].currentTime = 0;
			}catch(e){
				// console.log("error");
			}
			
			clearTimeout(timer5);
			lock = 0;
			$page1.removeClass("fadeIn");
			$main.animate({"-webkit-transform":"translateY(-33.33%)"},1000,"ease",function(){
				$page2.addClass("fadeIn");
			});	
		},5000);
			
	},3000);
}


function acting(){

	if(lock){
		count ++;
		if(count > 25){
			$blood.css("display","block");
		}
		// console.log(count);
		$timer.css({"-webkit-transform":"translateX(" + count / 70 * 100 + "%)"});
		if(count%2){
			$body.removeClass("shake").addClass("shake1");
			$picState2.removeClass("wobble");
			// $picState1.removeClass("ops");
			$picState1.addClass("wobble");
			// $picState2.addClass("ops");
		}else{
			$body.removeClass("shake1").addClass("shake");
			$picState1.removeClass("wobble");
			// $picState2.removeClass("ops");
			$picState2.addClass("wobble");
			// $picState1.addClass("ops");
		}

		$body.removeClass("shake").addClass("shake");
	}
}

//生成时间挫
function newDate (){
	return parseInt(new Date().getTime()/1000)
}

window.onload = function(){
	indexlock ++;
}

var indextime = setInterval(function(){

	if(indexlock >= 0){
		$loading.css("display","none"); 
		clearInterval(indextime);
	}
},2000);