
require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
//
var _util = require('util')
var _cart = require('service/cart')
var tpl = require('./index.tpl')
var page = {

	init:function(){
		//this.bindEvent();
		this.bindEvent();
		this.onload();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this)
			//获取单选框id
			let productId = $this.parents('.cart-item').data('product-id')
			if($this.is(':checked')){
				_cart.selectOne({productId:productId},function(cart){
				},function(msg){	
					_this.showErrorMsg();
				});
			}
			else{
				_cart.unselectOne({productId:productId},function(cart){
				},function(msg){	
					_this.showErrorMsg();
				});
			}
		})
	},
	loadCart:function(){
		var _this = this;
		//获取购物车信息
		_cart.getCart(function(cart){
			//console.log(cart)
			_this.renderCart(cart);//成功
		},function(){
			_this.showErrorMsg();
		});
	},
	renderCart:function(cart){
		console.log(cart)
		var html = _util.render(tpl,cart);
		cart.cartList.forEach(item=>{
			//图片添加
			//console.log(item.product)
			if(item.product.images){//
				item.product.image = item.product.images.split(',')[0]
			}else{
				item.product.image = require('images/floor/f1.jpg')
			}
		})
		//
		cart.notEmpty = cart.cartList.length;
		$('.cart-box').html(html)
	},
	showErrorMsg:function(){
		$('.cart-box').html('<p class = "empty-message">获取信息失败</p>')
	}
}
$(function(){
	page.init()
})
