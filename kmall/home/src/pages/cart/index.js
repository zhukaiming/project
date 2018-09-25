
var _nav = require('pages/common/nav')
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
		//购物车选中处理
		$('.cart-box').on('click','.select-one',function(){
			var $this = $(this)
			//获取单选框id
			let productId = $this.parents('.cart-item').data('product-id')
			if($this.is(':checked')){	
				_cart.selectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){	
					_this.showErrorMsg();
				});
			}
			else{
				_cart.unselectOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){	
					_this.showErrorMsg();
				});
			}
		})

		//购物车全选,全取消
		$('.cart-box').on('click','.select-all',function(){
			var $this = $(this)
			if($this.is(':checked')){	
				_cart.selectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){	
					_this.showErrorMsg();
				});
			}
			else{
				_cart.unselectAll(function(cart){
					_this.renderCart(cart)
				},function(msg){	
					_this.showErrorMsg();
				});
			}
		})

		//删除单个
		$('.cart-box').on('click','.delete-one',function(){
			var $this = $(this)
			//获取单选框id
			let productId = $this.parents('.cart-item').data('product-id')
			if(_util.confirm('你确定删除这条商品吗')){
				_cart.deleteOne({productId:productId},function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrorMsg();
				});
			}
		})
		//删除选中
		$('.cart-box').on('click','.delete-selected',function(){
			//获取单选框id
			if(_util.confirm('你确定删除这条商品吗')){
				_cart.deleteSelect(function(cart){
					_this.renderCart(cart)
				},function(msg){
					_this.showErrorMsg();
				});
			}
		})
		//更新数量
		//增加
		$('.cart-box').on('click','.btn-count',function(){
			var $this = $(this)
			var productId = $this.parents('.cart-item').data('product-id')
			var $input = $this.siblings('.count-input');
			var current = parseInt($input.val());
			var max = $input.data('stock');
			var min = 1;
			var newCurrent = 0;
			//增加
			if($this.hasClass('plus')){
				if(current >= max){
					_util.showErrMessage('商品达到上限了');
					return;
				}
				newCurrent = current + 1;
			}
			//减少
			else if($this.hasClass('minus')){
				if(current <= min){
					_util.showErrMessage('商品最少为一件');
					return;
				}
				newCurrent = current - 1;
			}
			//修改
			_cart.updataCount({productId:productId,count:newCurrent},function(cart){
				_this.renderCart(cart);//成功
			},function(){
				_this.showErrorMsg();
			});
			//
		})
		//结算
		$('.cart-box').on('click','.btn-submit',function(){
			if(_this.cart && _this.cart.totalCartPrice > 0){
				window.location.href = "./order-confirm.html"
			}
			else{
				_util.showErrMessage('请选择商品后提交');
			}
		})
	},
	loadCart:function(){
		var _this = this;
		//获取购物车信息
		_cart.getCart(function(cart){
			console.log('222',cart)
			_this.renderCart(cart);//成功
		},function(){
			//console.log('222')
			_this.showErrorMsg();
		});
	},
	renderCart:function(cart){
		//购物车数量同步
		_nav.cartInfo();
		//缓存购物车
		this.cart = cart;
		// console.log(cart)
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
		cart.notEmpty = !!cart.cartList.length;
		var html = _util.render(tpl,cart);
		$('.cart-box').html(html)
	},
	showErrorMsg:function(){
		$('.cart-box').html('<p class = "empty-message">获取信息失败</p>')
	}
}
$(function(){
	page.init()
})
