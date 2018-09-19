var timer=null;
var timer2=null;
var picIndex=1;
var mySwiper = new Swiper('.swiper-container', {
		direction:'vertical', //方向
		speed:700, //时间
		resistanceRatio:0,
		watchSlidesProgress :true,
		onInit: function(swiper) {
			timer=setInterval(function(){
				picIndex=++picIndex > 3 ? 0 : picIndex;
				$('.picSlide1 img').eq(picIndex).addClass('is-active').siblings().removeClass('is-active');
			}, 3000)
		
	},
	onTransitionEnd: function(swiper, speed) {
		swiper.myactive = swiper.activeIndex;
		if(swiper.activeIndex== swiper.slides.length -1){
			$('.btn-slideDown').hide();
		}else{
			$('.btn-slideDown').show();
		}

	},
	onSlideChangeEnd:function (swiper) {
		if(swiper.activeIndex!=0 && swiper.activeIndex!= 4){

			clearInterval(timer)
			clearInterval(timer2)
		} else{
			if(swiper.activeIndex==0){
				timer=setInterval(function(){
					picIndex=++picIndex > 3 ? 0 : picIndex;
					$('.picSlide1 img').eq(picIndex).addClass('is-active').siblings().removeClass('is-active');
				}, 2000)
			}
			// console.log(swiper.activeIndex)
			if(swiper.activeIndex==4){
				timer2=setInterval(function(){
					picIndex=++picIndex > 3 ? 0 : picIndex;
					$('.picSlide2 img').eq(picIndex).addClass('is-active').siblings().removeClass('is-active');
				}, 2000)
			}	
		}

	}
	})

// 渠道版
var iOS = (/iPhone|iPad|iPod/i).test(navigator.userAgent || navigator.vendor || window.opera);

function isWeixinBrowser() {
    return /micromessenger/.test(navigator.userAgent.toLowerCase())
}
var weibo = (/weibo/i).test(navigator.userAgent);

$('.btn-download,.btn-down-rig').on('touchstart', function(event) {
	event.preventDefault();
	if (iOS) {
		if (weibo) {
			$('.open-browser').show();
		}else{
			window.location.href='http://a.app.qq.com/o/simple.jsp?pkgname=com.yy.ourtimes';
		}
	}else{
		if(isWeixinBrowser()){
			window.location.href='./download.html';
		}else{
			window.location.href='#';// 向上滑动点击打开的链接
		}
	}
	return false;
});

$('.btn-download').on('touchstart',function () {
	$(this).addClass('is-active')
}).on('touchend',function () {
	$(this).removeClass('is-active')
})

$('.slidedown-area').on('touchstart',function () {
	mySwiper.slideNext();
})

$('.open-browser').on('touchstart',function(){
	$(this).hide();
})

function orientationChange() {
	if(Math.abs(window.orientation)==90) {
		$('.noorientation').show();
	} else{
		$('.noorientation').hide();
	}
};


// 添加事件监听

window.addEventListener('load', function(){

    orientationChange();

    window.onorientationchange = orientationChange;

});