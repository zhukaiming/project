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
	userInfo:function(){
		_user.getUserInfo(function(userInfo){
			console.log(userInfo)
			$('.not-login').hide();
			$('.login')
			.show()
			.find('username')
			.text(userInfo.username)
		})
	},
	cartInfo:function(){
		console.log()
	},
	

}
module.exports = nav.init();