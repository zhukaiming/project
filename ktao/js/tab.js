;(function($){

	function Tab($elem,options){
		this.$elem = $elem;
		this.options = options;
		this.$tabItems = this.$elem.find('.tab-item');
		this.itemNum = this.$tabItems.length;
		this.$tabPanels = $elem.find('.tab-panel');//方法

		this.now = this._getCorrectIndex(options.activeIndex);//当前下标

		this._init();
	}
	Tab.prototype = {
		constructor:Tab,
		_init:function(){
			var self = this;
			var timer = null;
			//初始化页面
			this.$tabItems.eq(this.now).addClass('tab-item-active');
			this.$tabPanels.eq(this.now).show();//显示当前
			//
			this.$tabPanels.on('show shown hide hidden',function(ev){//接收传入的事件类型
				self.$elem.trigger('tab-' +ev.type,[self.$tabPanels.index(this),this]);//参数的传递
			})
			//触发事件
			self.$elem.trigger('tab-show',[this.now,this.$tabPanels[this.now]]);//参数传递相应的on('tab-show')事件上
			//绑定事件
			var eventName = this.options.eventName === 'click' ? 'click' : 'mouseenter';
			//初始化showhide
			this.$tabPanels.showHide(this.options);//

			this.$elem.on(eventName,'.tab-item',function(){//事件的代理'.tab-item':只能添加到指定的子元素上的事件处理程序
				//console.log(this)
				var index = self.$tabItems.index(this);//储存
				//延时的处理
				if(self.options.delay){
					clearTimeout(timer);//先清除
					timer = setTimeout(function(){
						self.toggle(index);//调用toggle
					},self.options.delay)
				}else{
					self.toggle(index);//切换
				}

			});
			//
			if(this.options.interval){
				this.auto();
				this.$elem.hover($.proxy(self.pause,self),$.proxy(self.auto,self));
			}
		},
		//index表示将要显示的索引
		toggle:function(index){
			//
			if(this.now == index) return;
			//隐藏当前的
			this.$tabItems.eq(this.now).removeClass('tab-item-active');
			this.$tabPanels.eq(this.now).showHide('hide');//调用showhide	
			//显示对应的
			this.$tabItems.eq(index).addClass('tab-item-active');
			this.$tabPanels.eq(index).showHide('show');

			this.now = index;
		},
		//自动切换
		auto(){
			var self = this;
			this.autotimer = null;
			this.autotimer = setInterval(function(){
				self.toggle(self._getCorrectIndex(self.now+1));//
			},this.options.interval)
		},
		pause(){
			clearInterval(this.autotimer);
		},

		//划入划出

		_getCorrectIndex(index){
			if(index >= this.itemNum) return 0;
			if(index < 0) return (this.itemNum - 1);
			return index;
		}
	}
	Tab.DEFAULTS = {
		css3:false,
		js:false,
		mode:'fade',
		eventName:'mouseenter',
		activeIndex:0,
		delay:200,
		interval:2000
	}
	//原型对象的extend方法
	$.fn.extend({
		tab:function(options){
			return this.each(function(){
				var $this = $(this);
				var tab = $this.data('tab');
				if(!tab){//单例模式
					options  = $.extend({},Tab.DEFAULTS,options);
					tab = new Tab($(this),options);
					$this.data('tab',tab);//储存
				}
				if(typeof tab[options] == 'function'){
					tab[options]();
				}
			});
		}
	})

})(jQuery);