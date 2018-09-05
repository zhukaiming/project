//
var _util = {
	request:function(){
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
			error:function(){
				params.error && params.error(result.statusText)
			}
		})
	},
	showErrMessage:function(msg){
		alert(msg)
	},
	doLogin:function(){
		window.location.href = './user-login.html'
	}
}

module.exports = _util;