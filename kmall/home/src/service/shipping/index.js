
//加下划线,内部使用的方法
var _util = require('util')
var _shipping = {
	addCart:function(data,success,error){
		_util.request({
			method:'post',
			url:'/cart',
			data:data,
			success:success,
			error:error
		})
	},
}

module.exports = _shipping;