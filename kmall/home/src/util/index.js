//
var Hogan = require('hogan.js')
var _util = {
	//封装发送ajax请求的方法
	request:function(params){
		var _this = this;
		$.ajax({
			url:params.url || '',
			method:params.method || 'get',
			dataType:params.dataType || 'json',
			data:params.data || '',
			success:function(result){
				if(result.code == 0){//请求成功
					params.success && params.success(result.data)
				}
				else if(result.code == 10){//没有登录
					_this.doLogin();
				}
				else if(result.code == 1){//请求错误
					params.error && params.error(result.message)
				}
			},
			error:function(result){
				params.error && params.error(result.statusText)
			}
		})
	},
	//显示错误信息
	showErrMessage:function(msg){
		alert(msg)
	},//进入登录页
	showSuccessMessage:function(msg){
		alert(msg)
	},
	//处理删除
	confirm:function(msg){
		return window.confirm(msg)
	},
	doLogin:function(){
		window.location.href = './user-login.html?redirect='+encodeURIComponent(window.location.href)
	},//返回首页
	gohome:function(){
		window.location.href = './'
	},//从url中获取参数
	getParmFromUrl:function(key){
/*		var query = window.location.search.substr(1);
		//type=erere&dsd=we
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');*/
		var query = window.location.search.substr(1);
		var reg = new RegExp('(^|&)'+key+'=([^&]*)(&|$)');
		//
		var result = query.match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},//side
	//模板渲染
	render:function(tpl,data){
		var template = Hogan.compile(tpl);
		var html = template.render(data)
		return html;		
	},//验证
	validate:function(value,type){
		var value = $.trim(value)
		//菲空验证
		if(type == 'require'){
			return !!value;
		}
		//用户名验证
		if(type == 'username'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//mima验证
		if(type == 'password'){
			return /^[a-zA-Z0-9_]{3,10}$/.test(value)
		}
		//手机验证
		if(type == 'phone'){//^开头$结尾
			return /^1[3568]\d{9}$/.test(value)
		}	
		//邮箱验证
		if(type == 'email'){//^开头$结尾
			return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)
		}
	}
}
//
module.exports = _util;