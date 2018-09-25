require('./index.css')
var _user = require('service/user')
var _util = require('util')
var _cart = require('service/cart')
var nav = {
	init:function(){
		this.bindEvent();
		this.loadUsername();
		this.cartInfo();
		return this;
	},
	bindEvent:function(){//退出
		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_util.showErrMessage(message)
			});
		})
/*		$('#logout').on('click',function(){
			alert('sss')
		})*/
	},
	loadUsername:function(){
		_user.getUsername(function(user){
			//console.log(loadUsername)
			$('.not-login').hide();
			$('.login')
			.show()
			.find('.username')
			.text(user.username)
		})
	},
	cartInfo:function(){

		//
		_cart.getCartCount(function(count){
			$('.nav-list .cart-num').text(count || 0)
		},function(msg){
			$('.nav-list .cart-num').text(0)
		})
	},
	

}
module.exports = nav.init();