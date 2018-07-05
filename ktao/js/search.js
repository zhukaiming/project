//2018-06-12

;(function($){

	//添加缓存
	/*
	var cache = {
		data:{},
		addData:function(){
			this.data[key] = val;
		},
		readData:function(){
			return this.data[key];
		}
	};
	*/
	function Search($elem,options){
		this.$elem = $elem;
		this.$searchForm = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchBtn = this.$elem.find('.search-btn')
		this.options = options;

		this.isLoaded = false;
		this._init();
		if(this.options.autocomplete){//如果为真，执行auto方法
			this.autocomplete();//
		}
	}
	Search.prototype = {
		constructor:Search,
		_init:function(){
			//绑定提交事件
			this.$searchBtn.on('click',$.proxy(this.submit,this));//$.proxy,点击时触发submit函数
		},
		submit:function(){
			if(this.getInputVal() == ''){
				return false;

			}
			this.$searchForm.trigger('submit');
		},
		autocomplete:function(){
			//console.log('auto')
			//获取数据
			//this.getData();
			this.$searchInput
			.on('input',function(){
				//目的，只有有值得时候才触发getData
				if(this.getInputVal() == ''){//如果getInputVal为空,不做处理
					return false;
				}
				//如果配置的有这个参数的话
				//在这个this.options.getDataInterval时间内不会连续触发getData事件
				if(this.options.getDataInterval){
					clearTimeout(this.timer);
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.getDataInterval)
				}
				//如果不为空
			}.bind(this))//调用getData函数,事件绑定
			.on('focus',$.proxy(this.showLayer,this))//调用showLayer函数,显示
			.on('click',function(ev){
				//阻止事件冒泡
				ev.stopPropagation();
			});
			$(document).on('click',$.proxy(this.hideLayer,this));

			this.$searchLayer.showHide(this.options);//初始化	
		},
		getData:function(){
			console.log('get data')
			//数据的获取
			//当用户输入提示数据
			//获取服务器数据
			if(this.jqXHR){//判断上次的ajax请求在不在，确保拿到的是最新数据
				this.jqXHR.abort();//终止ajax请求
			}
			//当发送ajax请求的时候，会返回一个jqXHR对象
			this.jqXHR = $.ajax({
				url:this.options.url+this.getInputVal(),
				dataType:'jsonp',
				jsonp:'callback'

			})
			//成功
			.done(function(data){
				//console.log(data);
				this.$elem.trigger('getData',[data])//data是传递的参数,传递$searchLayer
			}.bind(this))
			//失败
			.fail(function(err){
				//this.$searchLayer.html('').hide();
				this.$elem.trigger('getNoData')
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
			}.bind(this))
		},
		showLayer:function(){
			//判断layer层有没有加载数据
			//if($.trim(this.$searchLayer.html()) == '') return;
			if(!this.isLoaded) return;
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());//用于去除字符串两端的空白字符
		},
		appendLayer:function(html){
			this.$searchLayer.html(html);
			this.isLoaded = !!html;
		},
		setInputVal:function(val){
			this.$searchInput.val(removeHTMLTag(val));
			function removeHTMLTag(str){
				return str.replace(/<[^<|>]+>/g,'')
			}
		}
	}
	Search.DEFAULTS = {
		autocomplete:false,
		css3:false,
		js:false,
		mode:'slideUpDown',
		getDataInterval:200,//延迟
		url:'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1530610785701_3352&k=1&area=c2c&bucketid=16&q='
	}
	$.fn.extend({
		search:function(options,val){
			return this.each(function(){
				var $this = $(this);
				var search = $this.data('search');
				if(!search){//单例模式
					options  = $.extend(Search.DEFAULTS,options);
					search = new Search($(this),options);
					$this.data('search',search);
				}
				if(typeof search[options] == 'function'){
					search[options](val);
				}
			});
		}
	})
	/*搜索框结束*/

	//分类导航
	/*
	var $category = $('.category .dropdown');

	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});
	*/
})(jQuery);