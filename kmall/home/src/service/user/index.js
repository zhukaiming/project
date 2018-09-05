
//加下划线,内部使用的方法
var _util = require('util')
var _user = {
	logout:function(){
		_util.request({
			url:'/user/logout',//
			success:success,
			error:error			
		})
	}
}

module.exports = _user;