
require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
//
require('util/pagination')//分页插件
var _util = require('util')
var _product = require('service/product')
var tpl = require('./index.tpl')
var page = {
	//升降序
	listParams:{
		keyword:_util.getParmFromUrl('keyword') || '',
		page:_util.getParmFromUrl('page') || 1,//
		categoryId:_util.getParmFromUrl('categoryId') || '',
		orderBy:_util.getParmFromUrl('orderBy') || 'default'
	},
	init:function(){
		//this.bindEvent();
		this.bindEvent();
		this.initPagination();
		this.loadProductList();
	},
	//
	initPagination:function(){
		var _this = this;
		var $pagination = $('.pagination-box');//
		//接收监听page
		$pagination.on('page-change',function(e,value){
			//console.log('value',value)
			_this.listParams.page = value;
			_this.loadProductList();//重新加载
		})
		$pagination.pagination();
	},
	bindEvent:function(){
		var _this = this;
		$('.sort-item').on('click',function(){
			var $this = $(this)
			//默认排序
			if($this.hasClass('default')){
				if($this.hasClass('active')){
					return;
				}
				$this
				.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				//addClass('active')
				_this.listParams.orderBy = 'default';
			}
			//按价格排序
			if($this.hasClass('price')){
				$this
				.addClass('active')
				.siblings('.sort-item')
				.removeClass('active')
				//addClass('active')
				if(!$this.hasClass('asc')){
					$this
					.addClass('asc')
					.removeClass('desc')
					_this.listParams.orderBy = 'price_asc';
				}else{
					$this
					.addClass('desc')
					.removeClass('asc')
					_this.listParams.orderBy = 'price_desc';
				}
			}
			//
			_this.listParams.page = 1;
			_this.loadProductList();
		})
	},
	//加载商品页
	loadProductList:function(){
		//console.log('111111111111111：：：',this.listParams)
		this.listParams.categoryId//搜索的添加要么按照关键字,要么按照分类id
		? (delete this.listParams.keyword)
		: (delete this.listParams.categoryId)
		//console.log('111',this.listParams)
		//获取数据
		_product.getProductList(this.listParams,function(result){
			console.log(result)
			//
			var list = result.list.map(function(product){
				//
				console.log('pro',product.images)
				//
				if(product.images){
					product.images = product.images.split(',')[0];
				}else{
					product.images =  require('images/floor/f2.jpg')//默认图片
				}
				return product;
			})
			//console.log('list',list)
			var html = _util.render(tpl,{
				list:list
			});
			$('.product-list').html(html)	
			//
			$('.pagination-box').pagination('render',{
				current:result.current,
				total:result.total,
				pageSize:result.pageSize
			})
		},function(msg){
			_util.showErrMessage(msg);//
		})
	}

}

$(function(){
	page.init()
})
