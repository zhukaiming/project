//20180610
$(function(){
	/*
	$('.nav-site .dropdown').hover(function(){
		var $this = $(this);
		var activeClass =  $this.data('active') + "-active";

		$this.addClass(activeClass);
	},function(){
		var $this = $(this);
		var activeClass =  $this.data('active') + "-active";

		$this.removeClass(activeClass);
	});
	*/
	//下拉菜单开始
	/*
	function loadhtmlOnce($elem,callback){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载

		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
		//console.log(data);
			
		});		
	}
	var $menu = $('.nav-site .dropdown')
	$menu.on('dropdown-show',function(ev){

		// console.log(this);
	});
	function buildmenuitem($elem,data){
			var html = '';
			for(var i = 0;i<data.length;i++){
				html += '<li><a href="#" class="menu-item">'++'</a></li>'
			}
			//模拟网络延时
			setTimeout(function(){
				$elem.find('.dropdown-layer').html(html);
				$elem.data('isLoaded',true);
			},1000);		
	}
	//var $category = $('.category .dropdown');
	$menu.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});
	//下拉菜单结束
	*/

	//搜索框
	var $search = $('.search')
	$search.search({
		autocomplete:true//自动完成
	});
	$search
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
		console.log($search);
		//$searchInput.val(removeHTMLTag($(this).html()));
		//$searchForm.trigger('submit');//trigger触发被选元素的指定事件类型
		//执行jq对象的setInputVal方法
		$search.search('setInputVal',$(this).html());
		$search.search('submit')
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
	//搜索框结束

	//分类导航
	var $category = $('.category .dropdown');

	$category.on('dropdown-show',function(ev){
		// console.log(this);
		var $this = $(this);
		//当需要显示时从服务器获取数据并且加载

		//获取需要请求的地址
		var loadUrl = $this.data('load');
		//如果页面上没有设置请求地址直接返回
		if(!loadUrl) return;

		var isLoaded = $this.data('isLoaded');
		//如果已经加载过数据了直接返回
		if(isLoaded) return;
		
		//如果有请求地址,发送请求获取数据
		$.getJSON(loadUrl,function(data){
			//console.log(data);
			var html = '';
			/*
				"title": "电视",
		"items": [
			"抢亿元红包",
			"合资品牌",
			"国产品牌",
			"互联网品牌"
		]
			*/
			/*
											<dl class = "category-details clearfix">
								<dt class = "cate-title fl">
									<a href="#" class = "cate-title-link">电视&gt;</a>
								</dt>
								<dd class = "cate-item fl">
									<a href="#" class="link">人工智能电视</a>
									<a href="#" class="link">人工智能电视</a>

								</dd>
							</dl>
			*/
			for(var i = 0;i<data.length;i++){
				html += '<dl class = "category-details clearfix"><dt class = "cate-title fl"><a href="#" class = "cate-title-link">'+data[i].title+'</a></dt><dd class = "cate-item fl">';
				for(var j = 0;j<data[i].items.length;j++){
					html += '<a href="#" class="link">'+data[i].items[j]+'</a>'
				}
				html += '</dd></dl>';
			}
			//模拟网络延时
			setTimeout(function(){
				$this.find('.dropdown-layer').html(html);
				$this.data('isLoaded',true);
			},1000);
		});

	});
	
	//var $category = $('.category .dropdown');
	$category.dropdown({
		css3:false,
		js:true,
		mode:'slideLeftRight'
	});

	//轮播图开始
	
	//轮播图结束
})