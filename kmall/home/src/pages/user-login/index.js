
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')

var page = {
	init:function(){
		this.bindEvent()
	},
	bindEvent:function(){//处理提交事件
		var _this = this;
		$('form-sub-btn').on('click',function(){
			_this.submit();
		})
	},
	submit:function(){
		//1获取数据
		var date={
			username:$.trim($('[name="username"]')),
			password:$.trim($('[name="password"]'))
		}



		//2验证数据
		var validateResult = this.validate(date)
		//3提交

		if(validateResult.status){//成功

		}else{//失败

		}
	},
	validate:function(){
		var result={
			status:0,
			msg:''
		}
		//验证用户名不能为空
		if(_util.validate(data.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(_util.validate(data.password,'require')){
			result.msg = '密码不能为空'
		}
	}
}

$(function(){
	page.init()
})