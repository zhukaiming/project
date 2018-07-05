//2018-06-12

;(function($){
	function Search($elem,options){
		this.$elem = $elem;
		this.$searchForm = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchBtn = this.$elem.find('.search-btn')
		this.options = options;
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
			.on('input',$.proxy(this.getData,this))//调用getData函数,事件绑定
			.on('focus',$.proxy(this.showLayer,this))//调用showLayer函数,显示
			.on('click',function(ev){
				//阻止事件冒泡
				ev.stopPropagation();
			});
			$(document).on('click',$.proxy(this.hideLayer,this));

			this.$searchLayer.showHide(this.options);//初始化	
		},
		getData:function(){
			//数据的获取
			//当用户输入提示数据
			//获取服务器数据
			$.ajax({
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
			}.bind(this));
		},
		showLayer:function(){
			if($.trim(this.$searchLayer.html()) == '') return;
			this.$searchLayer.showHide('show');
		},
		hideLayer:function(){
			this.$searchLayer.showHide('hide');
		},
		getInputVal:function(){
			return $.trim(this.$searchInput.val());
		},
		appendLayer:function(html){
			this.$searchLayer.html(html);
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
	/*
	function Search($elem,options){
		this.$elem = $elem;
		this.$searchForm = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('')
	}
	*/
	/*
	var $searchForm = $('#search-form'),
		$searchInput = $('.search-input'),
		$searchLayer = $('.search-layer')

	$searchForm.on('submit',function(){
		if(getInputVal() == ''){
			return false;//阻止默认行为，阻止提交
		}
		console.log('submit')
	});
	//			
	var url = 'https://suggest.taobao.com/sug?code=utf-8&_ksTS=1530610785701_3352&callback=jsonp3353&k=1&area=c2c&bucketid=16&q=';
	//当用户输入提示数据
	$searchInput.on('input',function(){
		//获取服务器数据
		$.ajax({
			url:url+getInputVal(),
			dataType:'jsonp',
			jsonp:'callback'

		})

		.done(function(data){
			console.log(data);

			if(data.result.length == 0){
				$searchLayer.html('').hide();
				return;
			}
			var html = '';

			var dataNum = 6;//自定义搜索内容的长度
			for(var i = 0;i<data.result.length;i++){
				if(i>=dataNum) break;
				html += '<li class = "search-item">'+data.result[i][0]+'</li>'
			}
			$searchLayer.html(html).show();
		})

		.fail(function(err){

		});


	})

	//事件代理
	$searchLayer.on('click','.search-item',function(){
		console.log(this);
		$searchInput.val(removeHTMLTag($(this).html()));
		$searchForm.trigger('submit');//trigger触发被选元素的指定事件类型
	});

	$(document).on('click',function(){
		$searchLayer.hide();
	});

	$searchInput
		.on('focus',function(){//获取焦点

			if($(searchLayer.html()) == ''){
				$searchLayer.hide();
			}else{
				$searchLayer.show();
			}
	})
		.on('click',function(ev){
			//阻止事件冒泡
			ev.stopPropagation();
	})
	function getInputVal(){
		return $.trim($searchInput.val());
	}
	//
	function removeHTMLTag(str){
		return str.replace(/<[^<|>]+>/g,'')
	}
	*/
})(jQuery);