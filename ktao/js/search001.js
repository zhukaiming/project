//2018-06-12

;(function($){

	/*
	function Search($elem,options){
		this.$elem = $elem;
		this.$searchForm = this.$elem.find('#search-form');
		this.$searchInput = this.$elem.find('')
	}
	*/
	var $searchForm = $('#search-form'),
		$searchInput = $('.search-input'),
		$searchLayer = $('.search-layer')

	$searchForm.on('submit',function(){
		if(getInputVal() == ''){
			return false;//阻止默认行为，阻止提交
		}
		console.log('submit')
	});

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
	
})(jQuery);