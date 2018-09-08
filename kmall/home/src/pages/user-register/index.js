
require('pages/common/logo')
require('pages/common/footer')
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
	//绑定事件
	bindEvent:function(){//处理提交事件
		var _this = this;
		//
		$('[name="username"]').on('blur',function(){
			var username = $(this).val();
			if(!_util.validate(username,'require')){
				return;
			}
			if(!_util.validate(username,'username')){
				return;
			}
			_user.checkedUsername(username,function(){
				//该用户名没有注册
				console.log('ok')
				formErr.hide()
			},function(){
				//已被注册
				console.log('ok')
				formErr.show(message)
			})
		})
		$('#form-sub-btn').on('click',function(){
			_this.submit();
			//console.log('sss')
		})
	},
	submit:function(){
		//1获取数据
		var formDate = {
			password:$.trim($('[name="password"]').val()),
			repassword:$.trim($('[name="repassword"]').val()),
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
		
		if(!_util.validate(formDate.password,'password')){
			result.msg = '密码不能为空'
			return result;
		}
		if(!_util.validate(formDate.password,'password')){
			result.msg = '密码格式错误'
			return result;
		}
		if(formDate.password != formDate.repassword){
			result.msg = '两次密码不一致'
			return result;
		}
		//
		result.status = true;
		return result;
	}
}

$(function(){
	page.init()
})