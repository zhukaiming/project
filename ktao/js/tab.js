;(function($){

	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$carouselItems = this.$elem.find('.carousel-item');
		this.itemNum = this.$carouselItems.length;
		this.$btns = $elem.find('.btn-item');
		this.$controlBtns = $elem.find('.carousel-control');

		this.now = this._getCorrectIndex(options.activeIndex);
		this._init();
	}
	Tab.prototype = {
		Tab:Tab,
		_init:function(){
			var self = this;
			//显示当前的
			//$carouselItems[this.now],jq的dom元素
			this.$elem.trigger('carousel-show',[this.now,this.$carouselItems[this.now]]);//触发事件，传递参数,
			//划入划出
			if(this.options.mode === 'slide'){
				//console.log('suc')
				//事件传送消息
				this.$carouselItems.on('move moved',function(ev){
					var index = self.$carouselItems.index(this);//
					//console.log(self.now)
					//
					if(ev.type == 'move'){//如果当前的元素move的话,他需要hide
						if(index == self.now){
							self.$elem.trigger('carousel-hide',[index,this]);//传递下标和元素
						}else{
							self.$elem.trigger('carousel-show',[index,this]);
						}
					}
					//
					else if(ev.type == 'moved'){
						if(index == self.now){
							self.$elem.trigger('carousel-shown',[index,this]);
						}
						else{
							self.$elem.trigger('carousel-hidden',[index,this]);
						}
					}
				})
				//
				this.$elem.addClass('slide');
				//显示当前
				this.$carouselItems.eq(this.now).css({left:0});
				//获取元素宽度
				this.itemWidth = this.$carouselItems.eq(0).width();
				//初始化插件
				this.$carouselItems.move(this.options)
				//获取过渡的CSS
				this.transitionClass = this.$carouselItems.eq(this.now).hasClass('transition') ? 'transition' : '';
				//
				this.tab = this._slide;

			//淡入淡出	
			}else{
				//初始化显示隐藏插件
				//传参
				this.$carouselItems.on('show shown hide hidden',function(ev){
					self.$elem.trigger('caeousel-' + ev.type,[self.$carouselItems.index(this),this]);//
				})				
				this.$elem.addClass('fade');
				this.$carouselItems.eq(this.now).show();
				this.$carouselItems.showHide(this.options);
				this.tab = this._fade;
			}

			//激活底部按钮
			this.$btns.eq(this.now).addClass('active');
			//绑定事件
			this.$elem
			.hover(function(){
				self.$controlBtns.show();
			},function(){
				self.$controlBtns.hide();
			})
			.on('click','.carousel-right',function(){
				//划动时向左划,方向是1
				self.tab(self._getCorrectIndex(self.now+1),1);
			})
			.on('click','.carousel-left',function(){
				//
				self.tab(self._getCorrectIndex(self.now-1),-1);
			});

			this.$btns.on('click',function(){
				self.tab(self.$btns.index($(this)));
			});

			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));		
			}				
		},
		//index表示将要显示的索引

		_fade(index){
			if(this.now == index) return;

			//当前的隐藏
			this.$carouselItems.eq(this.now).showHide('hide');
			this.$btns.eq(this.now).removeClass('active');
			//下一张显示

			this.$carouselItems.eq(index).showHide('show');
			this.$btns.eq(index).addClass('active');

			this.now = index;
		},

		//划入划出
		_slide(index,direction){
			//向右滑derection为1，反之为-1;
			//index
			//console.log('suc')
			if(this.now == index) return;

			//确定方向
			if(!direction){
				if(index > this.now){
					direction = 1;
				}else{
					direction = -1;
				}
			}
			//让将要划入的放到指定位置
			this.$carouselItems.eq(index).removeClass(this.transitionClass).css({left:direction * this.itemWidth});
			//定时器异步传输
			setTimeout(function(){
				//让当前的划出
				this.$carouselItems.eq(this.now).move('x',-1 * direction * this.itemWidth);
				//让指定的划入
				this.$carouselItems.eq(index).addClass(this.transitionClass).move('x',0);
				this.now = index;
			}.bind(this),20);

			//为btns添加相应样式
			this.$btns.eq(this.now).removeClass('active');
			this.$btns.eq(index).addClass('active');
		},
		//
		auto(){
			var self = this;
			this.timer = null;
			this.timer = setInterval(function(){
				self.tab(self._getCorrectIndex(self.now+1),-1);
			},this.options.interval)
		},
		pause(){
			clearInterval(this.timer);
		},
		_getCorrectIndex(index){
			if(index >= this.itemNum) return 0;
			if(index < 0) return (this.itemNum - 1);
			return index;
		}
	}

	Tab.DEFAULTS = {
		css3:false,
		js:true,
		mode:'fade',
		activeIndex:1,
		interval:0
	}

	$.fn.extend({
		Tab:function(options){
			return this.each(function(){
				var $this = $(this);
				var carousel = $this.data('carousel');
				if(!carousel){//单例模式
					options  = $.extend(Carousel.DEFAULTS,options);
					carousel = new Carousel($(this),options);
					$this.data('carousel',carousel);
				}
				if(typeof carousel[options] == 'function'){
					carousel[options]();
				}
			});
		}
	})

})(jQuery);