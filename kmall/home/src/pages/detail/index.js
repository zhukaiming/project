
require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
//
require('util/pagination')//分页插件
var _util = require('util')
var _product = require('service/product')
var _cart = require('service/cart')
var tpl = require('./index.tpl')
var page = {
	//升降序
	params:{
		productId:_util.getParmFromUrl('productId') || ''
	},
	init:function(){
		//this.bindEvent();
		this.bindEvent();
		this.onload();
	},
	onload:function(){
		if(this.params.productId){
			this.loadProductDetail();
		}
	},
	bindEvent:function(){
		var _this = this;
		//切换图片
		$('.detail-box').on('mouseenter','.detail-small-img-list-item',function(){
			var $this = $(this)
			$this.addClass('active')
			.siblings('.detail-small-img-list-item').removeClass('active')

			var imgSrc = $this.find('img').attr('src')
			$('.detail-main-img img').attr('src',imgSrc)
		})

		//购买数量处理
		$('.detail-box').on('click','.count-btn',function(){
			console.log('aaa')
			var $this = $(this)
			var $input = $('.count-input')
			var stock = _this.stock;
			var min = 1;
			var current = parseInt($input.val());//
			//
			if($this.hasClass('plus')){
				$input.val(current >= stock ? stock : current+1)
			}else if($this.hasClass('minus')){
				$input.val(current > min ? current - 1 : min)
			}
		})
		//购物车添加
		$('.detail-box').on('click','.add-cart-btn',function(){
			_cart.addCart({
				productId:_this.params.productId,
				count:$('.count-input').val()
			},function(){//添加购物车成功
				//console.log('data',data)
				window.location.href = './result.html?type=addCart'
			},function(){
				_util.showErrMessage(msg);//
			})
		})
	},
	//加载商品页
	loadProductDetail:function(){
		//
		var _this = this;
		_product.getProductDetail({productId:this.params.productId},function(product){
			console.log('156',product.images)
			if(product.images){
				product.images = product.images.split(',');//把一个字符串分割成字符串数组
			}else{
				product.images =  [require('images/floor/f1.jpg')]
				//
			}
			product.mainImg = product.images[0];
			//缓存库存,修改的时候用
			_this.stock = product.stock;
			var html = _util.render(tpl,product);
			$('.detail-box').html(html)
		},function(msg){
			_util.showErrMessage(msg);//
		})
	}
}
$(function(){
	page.init()
})
