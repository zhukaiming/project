//20180610
$(function(){
	$('.dropdown').hover(function(){
		var $this = $(this);
		var activeClass =  $this.data('active') + "-active";

		$this.addClass(activeClass);
	},function(){
		var $this = $(this);
		var activeClass =  $this.data('active') + "-active";

		$this.removeClass(activeClass);
	});


//搜索框
	var $elem = $('.search')
	$elem.search({
		autocomplete:true//自动完成
	});

	$elem
	.on('getData',function(ev,data,){//接收传递的参数getData
		var $this = $(this);
		var html = createSearchLayer(data,10);//创建一个html
		//html通过参数的形式传到函数内部，在通过appendLayer方法把html添加进去，在调用显示的showlayer方法
		$this.search('appendLayer',html).search('showLayer');
		//var dataNum = 10;//自定义搜索内容的长度

		//$searchLayer.html(html).showHide('show');

		//console.log(this)this就是search元素
	})
	.on('click','.search-item',function(){
		console.log($elem);
		//$searchInput.val(removeHTMLTag($(this).html()));
		//$searchForm.trigger('submit');//trigger触发被选元素的指定事件类型
		//执行jq对象的setInputVal方法
		$elem.search('setInputVal',$(this).html());
		//$elem.search('submit')
	})
	.on('getNoData',function(){
		//$searchLayer.html('').showHide('hide');
		$this.search('appendLayer','').search('hideLayer');
	});

	function createSearchLayer(data,maxNum){
		if(data.result.length == 0){
			return '';
		}
		var html = '';
		for(var i = 0;i<data.result.length;i++){
			if(i>=maxNum) break;
			html += '<li class = "search-item">'+data.result[i][0]+'</li>'
		}
		return html;	
	}
})