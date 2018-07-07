//2018-06-12

;(function($){
		function init($elem){
			this.$elem = $elem;
			this.currentX = parseFloat(this.$elem.css('left'));
			this.currentY = parseFloat(this.$elem.css('top'));			
		}

		function to(x,y,callBack){
			x = (typeof x == 'number') ? x : this.currentX;//当(typeof x == 'number')为真,返回x，若为假，返回this.currentX
			y = (typeof y == 'number') ? y : this.currentY;//

			if(this.currentX == x && this.currenty == y) return;//当前值
			this.$elem.trigger('move')//触发对象的move事件
			//调用回调函数
			if(typeof callBack == 'function') callBack();

			//
			this.currentX = x;
			this.currentY = y;			
		}
		function Slient($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition');
		}
		Slient.prototype = {
			constructor :Slient,
			//调用to，通过回调函数实现效果
			to:function(x,y){
				var self = this;
				to.call(this,x,y,function(){
					self.$elem.css({
						left:x,
						top:y
					});
					self.$elem.trigger('moved')				
				})
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}
		function Css3($elem){
			init.call(this,$elem);
			this.$elem.addClass('transition')
			this.$elem.css({
				left:this.currentX,
				top:this.currentY,

			});
		}

		Css3.prototype = {
			constructor :Css3,
			to:function(x,y){
				var self = this;
				to.call(this,x,y,function(){
					self.$elem
					.off(kuazhu.transition.end)//关闭
					.one(kuazhu.transition.end,function(){
						self.$elem.trigger('moved')
					});//运行一次
					self.$elem.css({
						left:x,
						top:y
					});			
				})			
				//监听过度完成事件
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}

		function Js($elem){
			init.call(this,$elem);
			this.$elem.removeClass('transition')
		}
		Js.prototype = {
			constructor :Js,
			to:function(x,y){
				var self = this;//储存this
				to.call(this,x,y,function(){
					self.$elem//
					.stop()
					.animate({
						left:x,
						top:y
					},function(){//动画执行完毕之后执行回调函数
						self.$elem.trigger('moved')
					});
				});			
			},
			x:function(x){
				this.to(x);
			},
			y:function(y){
				this.to(null,y);
			}
		}
		//

		var mode = null;
		
		function move($elem,options){
			//console.log(this);
			//判断
			if(options.css3 && kuazhu.transition.isSupport){//css3的移动,支持css3
				mode = new Css3($elem);
			}
			else if(options.Js){
				mode = new Js($elem);
			}
			else{//什么都不传
				mode = new Slient($elem);
			}
			/*
			return {
				to:mode.to.bind(mode),
				x:mode.x.bind(mode),
				y:mode.y.bind(mode)
			}
			*/
			//
			return{
				to:$.proxy(mode.to,mode),//接受一个已有的函数,并返回一个带特定上下文的新的函数。
				x:$.proxy(mode.x,mode),
				y:$.proxy(mode.y,mode)
			}
			
		}
		var DEFAULTS = {
			css3:true,
			js:true
		}
		$.fn.extend({
			move:function(options,x,y){
				return this.each(function(){
					var $this = $(this);
					var moveMode = $this.data('moveMode');
					if(!moveMode){//单例模式,判断有无moveMode
						options  = $.extend(DEFAULTS,options);//将一个或多个对象的内容合并到目标对象
						moveMode = move($this,options);//把move方法赋给moveMode
						$this.data('moveMode',moveMode);//储存到对象
					}
					if(typeof moveMode[options] == 'function'){
						moveMode[options](x,y);
					}
				});
			}
		})
})(jQuery);