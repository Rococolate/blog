var $index = $("#index");
var $main = $("#main");
var $loading = $("#loading");
var $cover = $("#cover");
var $inCover = $(".inCover");
var $page1 = $("#page1");
var $page2 = $(".page2");
var $page3 = $(".page3");
var $second = $(".second");
var $msecond = $(".msecond");
var $leftHandBtn = $(".leftHandBtn");
var $rightHandBtn = $(".rightHandBtn");
var $handBtn = $(".handBtn");
var $timer = $(".timer");
var $text = $(".text");
var $ufuncodeBtn = $(".ufuncodeBtn");
var $againBtn = $(".againBtn");
var $shareBtn = $(".shareBtn");
var $shareCover = $(".shareCover");
var $backgroundMusic = $("#backgroundMusic");
var $picState1 = $("#picState1");
var $picState2 = $("#picState2");
var $picState3 = $("#picState3");
var $zongziCartoonIn1 = $(".zongziCartoonIn1");
var $zongziCartoonIn2 = $(".zongziCartoonIn2");
var $body = $("body");
var $logo = $(".logo");
var inCoverText = 3;
	$inCover.html(inCoverText);
var time5000 = 5000;
var lock = 1;
var count = 0;
var shareMsg = "五月五，过端午~包粽嗨起来！";

function OverText(m) { 
	var mytext;
	var shareText;
	this.mytext =  ["5秒包了" + m + "个粽子？？？你是猪吗？！赏你一张U趣码，再战500回合！",
					"5秒包了" + m + "个粽子，你的速度比猪快，获得U趣码鼓励～",
					"5秒包了" + m + "个粽子，速度堪比豺狼虎豹，捕获U趣码一张！",
					"5秒包了" + m + "个粽子，不鸣则已，一鸣惊人！U趣码来抱大腿，捂脸",
					"5秒包了" + m + "个粽子，超音速包粽专业户～～双手奉上U趣码一张！",
					"5秒包了" + m + "个粽子？！你一定是开挂了吧～～",
					] ;
	this.shareText=["5秒包了" + m + "个粽子，我获得了“赤赤猪”称号，丢脸丢大发了！",
					"5秒包了" + m + "个粽子，我获得了“一筐猪”称号，求助神队友！",
					"5秒包了" + m + "个粽子，我获得了“放屁豹”称号，敢不敢来挑战我？！",
					"5秒包了" + m + "个粽子，我获得了“黑牛哥”称号，感觉自己猛猛哒！",
					"5秒包了" + m + "个粽子，我获得了“学霸草”称号，谁能超越我？！",
					"5秒包了" + m + "个粽子？！你一定是开挂了吧～～",
					] 
}

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

$index.click(function(){
	gameStart();
});

// $leftHandBtn.on("touchstart",function(e){
// 	console.log(e);
// 	acting();
// });

// $rightHandBtn.on("touchstart",function(e){
// 	console.log(e);
// 	acting();
// });

 $leftHandBtn.on("touchstart",function(e){
	console.log(e);
	$picState3.css("display","none");
	$picState1.css("display","block");$picState2.css("display","none");
	if(e.touches.length<=1){
		lock = 1;
	}else{
		lock = 0;
	}
	
	
});
 $leftHandBtn.on("touchend",function(e){
	console.log(e);
	
		acting();
	
});

 $rightHandBtn.on("touchstart",function(e){
	console.log(e);
	$picState3.css("display","none");
	$picState2.css("display","block");$picState1.css("display","none");
	if(e.touches.length<=1){
		lock = 1;
	}else{
		lock = 0;
	}
	
	
});
 $rightHandBtn.on("touchend",function(e){
	console.log(e);
	
		acting();
	
	
});

$ufuncodeBtn.click(function(){
	$page2.removeClass("fadeIn");
	$main.animate({"-webkit-transform":"translateY(-10.08rem)"},1000,"ease",function(){

		$page3.addClass("fadeIn");

	});
});

$shareBtn.click(function(){
	$shareCover.css("display","block");
});
$shareCover.click(function(){
	$(this).css("display","none");
});

$againBtn.click(function(){
	$page3.removeClass("fadeIn");
	$main.animate({"-webkit-transform":"translateY(-0rem)"},500,"ease",function(){

		$page1.addClass("fadeIn");
		$cover.css("display","block");
		time5000 = 5000;
		$second.html( parseInt( time5000 / 1000 ) );
		$msecond.html( time5000 % 1000 / 100  );
		inCoverText = 3;
		$inCover.html(inCoverText);
		lock = 1;
		count = 0;
		$timer.css({"-webkit-transform":"translateX(" + count / 60 * 100 + "%)"});
		gameStart();


	});
});

function gameStart(){

		$index.css("display","none");
		$main.css("display","block");
		$cover.css("display","block");

		setTimeout(function(){

			$page1.addClass("fadeIn");

		},200);

		var timer3 = setInterval(function(){

			inCoverText -- ;
			$inCover.html(inCoverText);

		},1000);

		setTimeout(function(){
			$backgroundMusic[0].play();
			clearInterval(timer3);
			$cover.css("display","none");
			var timer5 = setInterval(function(){

				time5000 = time5000 - 100;
				console.log( time5000 , parseInt( time5000 / 1000 ) ,time5000 %1000 / 100 );
				$second.html( parseInt( time5000 / 1000 ) );
				$msecond.html( time5000 % 1000 / 100 );

				if(time5000 === 0){
					$backgroundMusic[0].pause();
					$backgroundMusic[0].currentTime = 0;
					clearInterval(timer5);
					lock = 0;
					$page1.removeClass("fadeIn");
					$main.animate({"-webkit-transform":"translateY(-5.04rem)"},1000,"ease",function(){

						$page2.addClass("fadeIn");
						whatTheText(count);

					});
				}
			},100);
			
		},3000);
	}

function whatTheText(n){

	var sText = new OverText(n);
	console.log(sText);
	      if( n >= 60 ){
	    sharePic(5);
		$text.html(sText.mytext[5]);
		shareMsg = sText.shareText[5];
	}else if( n >= 43 ){
		sharePic(4);
		$text.html(sText.mytext[4]);
		shareMsg = sText.shareText[4];			
	}else if( n >= 33 ){
		sharePic(3);
		$text.html(sText.mytext[3]);
		shareMsg = sText.shareText[3];
	}else if( n >= 21 ){
		sharePic(2);
		$text.html(sText.mytext[2]);
		shareMsg = sText.shareText[2];
	}else if( n >= 1){
		sharePic(1);
		$text.html(sText.mytext[1]);
		shareMsg = sText.shareText[1];
	}else{
		sharePic(0);
		$text.html(sText.mytext[0]);
		shareMsg = sText.shareText[0];			
	}
}

function sharePic(n){
	console.log("ajax")
	var xhr = new XMLHttpRequest();
	xhr.open('get', 'http://rococolate.github.io/blog/images/min/share'+ n +'.png');
	// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	xhr.onreadystatechange = function () {
	    if(xhr.readyState == 4 ){
			if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
				//成功接收
				$zongziCartoonIn1.css("display","none");
				$zongziCartoonIn2.css({"background-image":"url(images/min/share"+ n +".png)"});
			}else{
				//接收失败
				alert("抱歉，文件没有找到");
			}
		};
	}
	xhr.send();
}

function acting(){

	if(lock){
		count ++;
		console.log(count);
		$timer.css({"-webkit-transform":"translateX(" + count / 60 * 100 + "%)"});
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

var myURL = window.location.href.split('#')[0];
	//微信config用
var enURL = encodeURIComponent(myURL);

//微信检查并开启微信config	
if(isWeixin()){
	// alert("在用微信 "+ver);
	wxConfigToken (enURL);
}else{
	// alert("不是微信 "+ver);
	// wxConfigToken (enURL);
}

//微信config ok后启用
wx.ready(function(){

    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareTimeline({
        title:shareMsg, // 分享标题
        link: myURL, // 分享链接
        imgUrl: 'http://m.quyundong.com/static/images/ufuncodeshare.jpg', // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
            // alert("success");
            console.log("success");
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            // alert("cancel");
        }
    });

    wx.onMenuShareAppMessage({
        title: '五月五，过端午！包粽嗨起来', // 分享标题
        desc: shareMsg, // 分享描述
        link: myURL, // 分享链接
        imgUrl: 'http://m.quyundong.com/static/images/ufuncodeshare.jpg', // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
            // alert("success");
 	        console.log("success");
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
            // alert("cancel");
        }
    });

});

// 微信config
function wxConfigToken (url){
	var xhr = new XMLHttpRequest();
	var url = url;
	console.log(url);
	xhr.open('get', 'http://m.quyundong.com/NmbApi/GetWeixinToken/?url='+url
		);
   			
			// xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
			xhr.onreadystatechange = function () {
			    if (xhr.readyState === 4 && xhr.status === 200) {
			        result = JSON.parse(xhr.response);
			        console.log(3,result);
			        console.log(result.data.timestamp - 0 ,result.data.noncestr,result.data.sha_sign,result.data.jsapi_ticket);
			        wx.config({
			        	    //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			        	    appId: 'wxe37215df86f33faa', // 必填，公众号的唯一标识
			        	    timestamp: result.data.timestamp - 0 , // 必填，生成签名的时间戳
			        	    nonceStr: result.data.noncestr, // 必填，生成签名的随机串
			        	    signature: result.data.sha_sign,// 必填，签名，见附录1
			        	    jsApiList: [
			                'onMenuShareTimeline',
			                'onMenuShareAppMessage',
			                'onMenuShareQQ',
			                'onMenuShareWeibo',
			                'hideMenuItems',
			                'showMenuItems',
			                'hideAllNonBaseMenuItem',
			                'showAllNonBaseMenuItem',
			                'translateVoice',
			                'startRecord',
			                'stopRecord',
			                'onRecordEnd',
			                'playVoice',
			                'pauseVoice',
			                'stopVoice',
			                'uploadVoice',
			                'downloadVoice',
			                'chooseImage',
			                'previewImage',
			                'uploadImage',
			                'downloadImage',
			                'getNetworkType',
			                'openLocation',
			                'getLocation',
			                'hideOptionMenu',
			                'showOptionMenu',
			                'closeWindow',
			                'scanQRCode',
			                'chooseWXPay',
			                'openProductSpecificView',
			                'addCard',
			                'chooseCard',
			                'openCard'
			              ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			        	});
			        
			    }
			}
	xhr.send();
}

//微信判别
function isWeixin (){
	if(window.navigator.userAgent.indexOf("MicroMessenger") === -1 ){
		return false;
	}else{return true}
}

//生成时间挫
function newDate (){
	return parseInt(new Date().getTime()/1000)
}

window.onload = function(){
	$loading.css("display","none"); 
}