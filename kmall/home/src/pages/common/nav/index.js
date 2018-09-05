console.log('drrrdd')
require('./index.css')
var _user = require('service/user')
var _util = require('util')
var nav = {
	init:function(){
		this.bindEvent();
		this.userInfo();
		this.cartInfo();
		return this;
	},
	bindEvent:function(){//退出
/*		$('#logout').on('click',function(){
			_user.logout(function(result){
				window.location.reload();
			},function(message){
				_uitl.showErrMessage(message)
			});
		})*/
		$('#logout').on('click',function(){
			alert('sss')
		})
		console.log('ddd')
	},
	userInfo:function(){
		console.log()
	},
	cartInfo:function(){
		console.log()
	}

}
module.exports = nav;