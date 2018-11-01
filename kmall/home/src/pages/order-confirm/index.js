
var _nav = require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
//
var _util = require('util')
var _cart = require('service/cart')
var shippingtpl = require('./shippinglist.tpl');
var producttpl = require('./product.tpl')
var page = {
	init:function(){
		//this.bindEvent();
		this.bindEvent();
		this.onload();
		this.shippingList();
		this.productList();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//购物车选中处理
	},
	shippingList:function(){
		this.renderShippingList();
	},
	productList:function(){
		this.renderProductList();
	},
	renderShippingList:function(){
		var html = _util.render(shippingtpl);
		$('.shipping-box').html(html);
	},
	loadCart:function(){
		var _this = this;
		//获取购物车信息
	},
	renderProductList:function(){
		var html = _util.render(producttpl);
		$('.product-box').html(html);
	}
}
$(function(){
	page.init()
})
