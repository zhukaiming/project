
var _nav = require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
//
var _util = require('util')
var _cart = require('service/cart')
var shippingtpl = require('./shippinglist.tpl')
var page = {
	init:function(){
		//this.bindEvent();
		this.bindEvent();
		this.onload();
		this.shippingList();
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
	renderShippingList:function(){
		var html = _util.render(shippingtpl);
		$('.shipping-box').html(html);
	},
	loadCart:function(){
		var _this = this;
		//获取购物车信息

	},
}
$(function(){
	page.init()
})
