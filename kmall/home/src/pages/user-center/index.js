
require('pages/common/logo')
require('pages/common/search')
require('pages/common/nav')
require('pages/common/footer')
require('./index.css')

var _util = require('util')
var _user = require('service/user')
var _side = require('pages/common/side')
var tpl = require('./index.tpl')
//
var page = {
	init:function(){
		this.onload()
	},
	onload:function(){//
		_side.render('user-center')
	},
	loadUserInfo:function(){
		//
		_user.getUserInfo(function(userInfo){
			var html = _util.render(tpl,userInfo);
			$('.side-content').html(html)
		})
	}
}

$(function(){
	page.init()
})