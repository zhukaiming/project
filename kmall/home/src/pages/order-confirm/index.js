
var _nav = require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
require('pages/common/side/index.css')
var _util = require('util')
var _cart = require('service/cart')

var _order = require('service/order')
var _shipping = require('service/shipping')
var _modal = require('./modal.js')
var shippingtpl = require('./shippinglist.tpl');
var producttpl = require('./product.tpl')
var page = {
	init:function(){
		//this.bindEvent();
		this.$shippingBox = $('.shipping-box');
		this.bindEvent();
		this.onload();
		this.loadShippingList();
		this.productList();
	},
	onload:function(){
		this.loadCart();
	},
	bindEvent:function(){
		var _this = this;
		//购物车选中处理
		//绑定新增地址事件
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show({
				success:function(shippings){
					_this.renderShippingList(shippings)
				}
			});
		});
		//删除地址
		this.$shippingBox.on('click','.shipping-delete',function(){
			var $this = $(this);
			var shippingId = $this.parents(".panel-item").data("shipping-id");
			if(_util.confirm('你确定删除这条地址码')){
				_shipping.deleteShipping({shippingId:shippingId},function(shippings){
					_this.renderShippingList(shippings)
				},function(msg){
					_util.showErrMessage(msg);
				})
			}
		});
		//编辑地址
		this.$shippingBox.on('click','.shipping-edit',function(){
			var $this = $(this);
			var shippingId = $this.parents(".panel-item").data("shipping-id");
			_shipping.getShipping({shippingId:shippingId},function(shippings){
				//console.log(shippings)
				_modal.show({
					data:shippings,
					success:function(shippings){
						_this.renderShippingList(shippings)
					}
				});				
			},function(msg){
				_util.showErrMessage(msg);
			})
		});
	},
	loadShippingList:function(){
		var _this = this;
		_shipping.getShippingList(function(shippings){
			_this.renderShippingList(shippings);
		},function(msg){
			_this.$shippingBox.html('<p class = "empty-message">获取信息失败</p>')
		}) 
	},
	productList:function(){
		this.loadProductList();
	},
	renderShippingList:function(shippings){
		var html = _util.render(shippingtpl,{
				shippings:shippings
			});
		this.$shippingBox.html(html);
	},
	loadCart:function(){
		var _this = this;
		//获取购物车信息
	},
	loadProductList:function(){
		var _this = this;
		_order.getOrderProductList(function(result){//成功
			console.log(result);
		result.cartList.forEach(item=>{
			//图片添加
			if(item.product.images){//
				item.product.image = item.product.images.split(',')[0]
			}else{
				item.product.image = require('images/floor/f1.jpg')
			}
		})
		//
		result.notEmpty = !!result.cartList.length;
		var html = _util.render(producttpl,result);
		$('.product-box').html(html);
		},function(){//失败
			$('.product-box').html('<p class = "empty-message">获取信息失败</p>')
		}) 
	}
}
/**/
$(function(){
	page.init()
})
