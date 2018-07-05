//2018-06-12

;(function($){

	function Carousel($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$carouselItem = this.$elem.find('.carousel-item');
		this.$btns = this.$elem.find('.btns');
		this.$controlBtns = this.$elem.find('.carousel-control');
		this._init();
		if(this.options.autocomplete){//如果为真，执行auto方法
		}
	}
	Carousel.prototype = {
		constructor:Carousel,
		_init:function(){
			//console.log(this)
			var self = this;

			//显示当前
			this.$btns.eq(this.now).show();
			//给当前添加样式
			this.$carouselItem.eq(this.now).addclass('active');

			//绑定事件
			this.$elem
			.hover(function(){
				self.$controlBtns.show();
			},function(){
				self.$controlBtns.hide();
			})
		},

	}
	Carousel.DEFAULTS = {
		css3:false,
		js:false,
		mode:'fade'
	}
	$.fn.extend({
		Carousel:function(options,val){
			return this.each(function(){
				var $this = $(this);
				var carousel = $this.data('carousel');
				if(!carousel){//单例模式
					options  = $.extend(Carousel.DEFAULTS,options);
					carousel = new Search($(this),options);
					$this.data('carousel',search);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options](val);
				}
			});
		}
	})

})(jQuery);