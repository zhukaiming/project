//20180610
;(function($){
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
		/*
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

	//获取数据一次
	function getDataOnce($elem,url,callback){//callback回调函数
		var data = $elem.data(url);//储存
		//当第一次调用时，没有data，没有数据
		if(!data){
			$.getJSON(url,function(resData){//发送请求，回调函数获取数据
				$elem.data(url,resData);//储存
				callback(resData);//回调
			})
		}else{//有数据的话
			callback(data);
		}
	}
	function loadImage(url,success,error){
		//console.log('successs')
		var image = new Image();
		image.onload = function(){
			if(typeof success == 'function') success(url);
		}
		image.onerror = function(){
			if(typeof error == 'function') error(url);
		}
		image.src = url;
	}

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
	/*
		按需加载步骤
		1.什么时候加载
		2.具体加载
		3.善后
	*/
	var $focusCarousel = $('.focus .carousel-container');
	/*
		
	*/
	function carouselLazyLoad($elem){
		$elem.item = {};
		$elem.totalItemNum = $elem.find('.carousel-img').length;//轮播图个数
		$elem.loadedItemNum = 0;
		//
		$elem.on('carousel-show',loadFn = function(ev,index,elem){
			//console.log('carousel-show loading');

			if($elem.item[index] != 'loaded'){
				$elem.trigger('carousel-loadItem',[index,elem]);
			}
			//$img.attr('src',imgUrl);
		})
		$elem.on('carousel-loadItem',function(ev,index,elem){
			//console.log('issuc')
			var $imgs = $(elem).find('.carousel-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){//成功
					$img.attr('src',url);
				},function(url){//失败
					$img.attr('src','../images/header-logo.png');
				});
				$elem.item[index] = 'loaded';
				$elem.loadedItemNum++;
				if($elem.loadedItemNum == $elem.totalItemNum){//轮播完毕
					$elem.trigger('carousel-loadItems');
				}
			})
		})
		$elem.on('carousel-loadItems',function(){
			$elem.off('carousel-show',$elem.loadFn)//终止事件的函数回调

		})
	}
	carouselLazyLoad($focusCarousel);
	$focusCarousel.on('carousel-loadItems',function(){
			$focusCarousel.off('carousel-show',$focusCarousel.loadFn);//终止事件的函数回调
	})
	/*调用轮播图插件*/
	$focusCarousel.carousel({
		activeIndex:0,
		mode:'slide',
		interval:3000
	});
	//轮播图结束

	//今日热销开始

	var $todaysCarousel = $('.todays .carousel-container');
	//
	carouselLazyLoad($todaysCarousel);
	$todaysCarousel.on('carousel-loadItems',function(){
		$todaysCarousel.off('carousel-show',loadFn)//终止事件的函数回调

	})
	$todaysCarousel.carousel({
	activeIndex:0,
	mode:'slide',
	interval:2000
	});

	//今日热销结束

	//选项卡

	var $floor = $('.floor');
	/*
	$floor.on('tab-show tab-shown tab-hide tab-hidden',function(ev,index,elem){
		console.log(index,elem,ev.type);
	});
	*/
	//图片按需加载函数
	function floorlLazyLoad($elem){
		var item = {},
			totalItemNum = $elem.find('.floor-img').length,//轮播图个数
			loadedItemNum = 0;
			loadFn = null;
		//
		$elem.on('tab-show',loadFn = function(ev,index,elem){
			//console.log('tab-show loading');

			if(item[index] != 'loaded'){
				$elem.trigger('tab-loadItem',[index,elem]);//
			}
			//$img.attr('src',imgUrl);
		})
		$elem.on('tab-loadItem',function(ev,index,elem){
			console.log('img')
			var $imgs = $(elem).find('.floor-img');
			$imgs.each(function(){
				var $img = $(this);
				var imgUrl = $img.data('src');
				loadImage(imgUrl,function(url){//成功
					setTimeout(function(){
						$img.attr('src',url);
					},1000);
				},function(url){//失败
					$img.attr('src','images/header-logo.png');
				});
				item[index] = 'loaded';
				loadedItemNum++;
				if(loadedItemNum == totalItemNum){//轮播完毕
					$elem.trigger('tab-loadItems');
				}
			});
		});
		//
		$elem.on('tab-loadItems',function(){
			$elem.off('tab-show',loadFn)//终止事件的函数回调

		});
		//遍历，循环
	}	
	/*
	$floor.each(function(){
		floorlLazyLoad($(this));
	})
	*/
	/*
	$floor.tab({
		css3:false,
		js:false,
		mode:'fade',
		eventName:'mouseenter',
		activeIndex:0,
		delay:200,
		interval:0

	})
	*/
	var $win = $(window);
	var $doc = $(document);
	//
	function isView($elem){
		//return ($win.height() + $win.scrollTop()>$elem.offset().top) && ($win.scrollTop()< $elem.offset().top +$win.height());
		return ($win.height() + $win.scrollTop() > $elem.offset().top) && ($win.scrollTop() < $elem.offset().top+$elem.height());
	};
	function timeToShow(){
		console.log('time to show')
		$floor.each(function(index){
			//判断满足条件
			if(isView($(this))){
				$doc.trigger('floor-show',[index,this]);//触发,参数传递
			}			
		})

	};

	//
	
	function buildFloorHtml(oneFloorData){
		var html = '';
		html += '<div class="container">';
		html += buildFloorHeaderHtml(oneFloorData);
		html += buildFloorbodyHtml(oneFloorData);
		html += '</div>';
		return html;
	}
	function buildFloorHeaderHtml(oneFloorData){
		//console.log(oneFloorData,'111');
		var html = '';
		html += '<div class="floor-hd">';
		html +=	'<h2 class ="floor-tit fl">';
		html +=		'<span class = "floor-tit-meu fl">'+oneFloorData.num+'F</span>';
		html +=		'<span class = "floor-tit-text fl">'+oneFloorData.text+'</span>';
		html +=	'</h2>';
		html +=	'<ul class = "floor-item fr">';
		for(var i = 0;i<oneFloorData.tabs.length;i++){
				html +=	'<li fl><a class = "tab-item tab-item-active" href="javascript:;">'+oneFloorData.tabs[i]+'</a></li>';
				/*
				if(i != oneFloorData.tabs.length - 1){
					html += <li class = ""></li>
				}	
				*/		
		}

			html +=	'</ul>';
		html +=	'</div>';
		return html;
		//console.log('html');
	}
	function buildFloorbodyHtml(oneFloorData){
		var html = '';
		html += '<div class="floor-bd">';
		for(var i = 0; i<oneFloorData.items.length;i++){
			html += '<ul class = "tab-panel clearfix">';
				for(var j = 0;j<oneFloorData.items[i].length;j++){
					html += '<li class = "tab-tit fl">';
						html += '<p class = "tab-img">';
						html += '	<img class = "floor-img" src = "images/loading1.gif" data-src="images/floor/'+oneFloorData.num+'/'+(i+1)+'/'+(j+1)+'.png" alt="">';
						html += '</p>';
						html += '<p class = "tab-ren">';
						html += '<a href="#" class = "link">'+oneFloorData.items[i][j].name+'</a>';
						html += '</p>';
						html += '<p class = "tab-men">￥'+oneFloorData.items[i][j].price+'</p>';
					html += '</li>';
				}
			html += '</ul>';
		}
		html +=	'</div>';
		return html;
	}
	
	//楼层html按需加载
	function floorlHtmlLazyLoad(){
		var item = {},
			totalItemNum = $floor.length,//轮播图个数
			loadedItemNum = 0,
			loadFn = null;
		//监听
		$doc.on('floor-show',loadFn = function(ev,index,elem){
			console.log('floor-show loading');

			if(item[index] != 'loaded'){
				$doc.trigger('floor-loadItem',[index,elem]);
			}
			//$img.attr('src',imgUrl);
		});
		//监听floor-loadItem事件
		$doc.on('floor-loadItem',function(ev,index,elem){
			//加载html
			console.log('lllwill load' +index,elem);
			//请求数据
			getDataOnce($doc,'data/floorData.json',function(floorData){//回调函数获取floordata

				console.log(floorData);
				var html = buildFloorHtml(floorData[index]);//index具体那一层的数据
				//模拟延时
				setTimeout(function(){

					$(elem).html(html);	//放到楼层的dom节点上

					//加载图片
					floorlLazyLoad($(elem));
						$(elem).tab({
						css3:false,
						js:false,
						mode:'fade',
						eventName:'mouseenter',
						activeIndex:0,
						delay:200,
						interval:0

					});
				},1000)			
			});

			item[index] = 'loaded';
			loadedItemNum++;
			if(loadedItemNum == totalItemNum){//轮播完毕
				$doc.trigger('floor-loadItems');
			}
		});
		//
		$doc.on('floor-loadItems',function(){
			$doc.off('floor-show',loadFn)//终止事件的函数回调
			$win.off('scroll resize',$floor.toShowfn);//
		});
		//遍历，循环
	}
	
	var floorTimer = null;
	//
	$win.on('scroll resize',$floor.toShowfn = function(){
		clearTimeout($floor.floorTimer);
		$floor.floorTimer = setTimeout(function(){
			timeToShow();
		},200)
	});	
	floorlHtmlLazyLoad();
	
	//结束




	/*电梯开始*/
	//判断楼层号
	function whichFloor(){
		var num = -1;
		//遍历楼层
		$floor.each(function(index,elem){
		//	
		num = index;
		if($win.scrollTop() + 100 < $(elem).offset().top){//第零个元素的距离顶部的距离大于滚动距离
			num = index - 1;
			return false;
		}	

		})
		return num;
	}
	//设置电梯
	var $elevator = $('#elevator');
	$elevator.items = $elevator.find('.elevator-item');
	function setElevator(){
		var num = whichFloor();

		if(num == -1){//
			$elevator.fadeOut();
		}else{
			$elevator.fadeIn();//显示
			$elevator.items.removeClass('elevator-active');
			$elevator.items.eq(num).addClass('elevator-active');
		}
	}
	$win.on('scroll resize load',function(){
		clearTimeout($elevator.elevatorTimer);
		$elevator.elevatorTimer = setTimeout(function(){
			setElevator();
		},200)
	});
	$elevator.on('click','.elevator-item',function(){
		var num = $elevator.items.index(this);//获取当前楼层号
		$('body,html').animate({
			scrollTop:$floor.eq(num).offset().top
		})
	})
	//console.log(whichFloor());
	/**/
})(jQuery);