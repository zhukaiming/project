
require('pages/common/logo')
require('pages/common/footer')
require('pages/common/nav')
require('pages/common/search')
require('pages/common/side')
require('./index.css')
var _util = require('util')
var _user = require('service/user')
var formErr = {
	show:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)		
	},
	hide:function(msg){
		$('.error-item')
		.show()
		.find('.error-msg')
		.text(msg)		
	}
}
var page = {
	init:function(){
		this.bindEvent()
	},
	onload:function(){//
		_side.render('update-password')
	},
	//绑定事件
	bindEvent:function(){//处理提交事件
		var _this = this;
		//
		$('#form-sub-btn').on('click',function(){
			_this.submit();
			//console.log('sss')
		})
	},
	submit:function(){
		//1获取数据
		var formDate = {
			username:$.trim($('[name="username"]').val()),
			password:$.trim($('[name="password"]').val())
		}
		//console.log(data)
		//2验证数据
		var validateResult = this.validate(formDate)
		//3提交
		if(validateResult.status){//验证成功
			formErr.hide();	
			//发送登录请求
			_user.updatePassword(formDate,function(result){
				//_util.gohome()
				// console.log('ok,,,')
				window.location.href = './result.html?type=updatePassword'//定义一个参数
			},function(msg){
				formErr.show(msg)
			})		
		}else{//验证失败
			formErr.show(validateResult.msg);
		}
	},
	validate:function(formDate){
		var result = {
			status:0,
			msg:''
		}
		//验证用户名不能为空
		if(!_util.validate(formDate.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_util.validate(formDate.username,'username')){
			result.msg = '用户名格式错误';
			return result;
		}
		if(!_util.validate(formDate.password,'password')){
			result.msg = '密码不能为空'
		}
		if(!_util.validate(formDate.password,'password')){
			result.msg = '密码格式错误'
		}
		//
		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})