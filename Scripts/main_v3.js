	function picSlide (options) {
	 	  this.ops={
	 	  	element:'',
	 	  	content:'[data-slide="content"]',
	 	  	index:0,
	 	  	prevIndex:0,
	 	  	_play:null,
	 	  	ratio: 1980 / 1080
	 	  }

	 	  $.extend(true, this.ops, options);
	 	  
	 	  this.init();
	}
	picSlide.prototype.init = function(){
		if($(this.ops.element).length==0) return;
		this._handleImg();
		this.resize();
		this.autoPlay();
	};
	picSlide.prototype.resize = function(){
		var _this=this;
		 $(window).on('resize',function  () {
		 	clearTimeout(_this.timer);
		 	clearInterval(_this._play);
		 	_this.timer=setTimeout(function  () {
				_this._handleImg();
				_this.autoPlay();
		 	}, 300)
		 }) 
	};
	picSlide.prototype.autoPlay = function(){
		var _this=this;
		var length=$(_this.ops.element).find(_this.ops.content).children().length;
		_this._play=setInterval(function () {
			_this.ops.prevIndex=_this.ops.index;
		  	_this.ops.index=(++_this.ops.index) % length;
		  	_this.ops.nextIndex=(_this.ops.index+1) % length;
		  	$(_this.ops.element).find(_this.ops.content).children().eq(_this.ops.prevIndex).css('zIndex',4).addClass('is-endactive').animate({opacity: 0}, 2000,function () {
		  		$(this).removeClass('is-active').removeClass('is-endactive');
		  		// $(this).css('opacity',1)
		  	});
		  	
		  	$(_this.ops.element).find(_this.ops.content).children().eq(_this.ops.index).css('zIndex',3).addClass('is-active').animate({opacity: 1}, 3500,function () {
		  	});
		  	$(_this.ops.element).find(_this.ops.content).children().eq(_this.ops.nextIndex).css({
		  		'opacity':1,
		  		zIndex:2
		  	})
		}, 4500)
	};
	picSlide.prototype._handleImg = function(){
		var h=$(window).height();
		var w=$(window).width();

		 $(this.ops.element).find(this.ops.content).children().each(function (index,ele) {
		 	// console.log($(ele))
		 	$(ele).css({
		 		'height':h,
		 		'zIndex':4-index
		 	})
		 });
		 if(w/h < this.ops.ratio){ 
		 	//高度空白
			$(this.ops.element).find(this.ops.content).removeClass('bgwidth').addClass('bgheight')
			//算偏差
			var oImg=$(this.ops.element).find(this.ops.content).children().find('img');
			var oImgWdith=oImg.width();
			oImg.css({
				position:'relative',
				left:'50%',
				marginLeft:- oImgWdith / 2,
				top:'auto',
				marginTop:0
			})
		}else{
			//宽度补白
			$(this.ops.element).find(this.ops.content).removeClass('bgheight').addClass('bgwidth')
			//算偏差
			var oImg=$(this.ops.element).find(this.ops.content).children().find('img');
			var oImgHeight=oImg.height();
			oImg.css({
				position:'relative',
				top:'50%',
				marginTop:- oImgHeight / 2,
				left:'auto',
				marginLeft:0
			})
		}
	};
	$(function() {
    $("#main-content").fullpage({
    scrollingSpeed: 1e3,
    easingcss3: "cubic-bezier(0.78, 0.43, 0.32, 0.9)",
    navigation: "true",
    css3: !0,
    onLeave: function(index) { $(".section-part-" + index).find(".section-content").removeClass("is-active") },
    afterRender: function() {
        var isFirst = $(".section-part-1").hasClass("active");
        isFirst && $(".section-part-1").find(".section-content").addClass("is-active")
    },
    afterLoad: function(anchorLink, index) { $(".section-part-" + index).find(".section-content").addClass("is-active") }
});
new picSlide({ element: '[data-role="background-slide"]' });
("MozTransition" in document.documentElement.style || "WebkitTransition" in document.documentElement.style || "OTransition" in document.documentElement.style || "msTransition" in document.documentElement.style) && $(".wrap").addClass("is-translate");
});


var preload = new createjs.LoadQueue(false);
preload.addEventListener('complete', loadComplete);
preload.addEventListener('progress', loading);
preload.loadManifest([
    'http://web.me.yy.com/s/static/me/img/bg01.jpg',
    'http://web.me.yy.com/s/static/me/img/bg02.jpg',
    'http://web.me.yy.com/s/static/me/img/bg03.jpg',
    'http://web.me.yy.com/s/static/me/img/bg1__shadow.png'
]);
function loadComplete(event) {
    setTimeout(function(){
        NProgress.done();
        document.getElementById('picLoad').style.display='none';
    }, 1000)
}
function loading(data){
    NProgress.start();
    NProgress.set(0.6);
    NProgress.inc();
}