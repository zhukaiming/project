
//加下划线,内部使用的方法
var _util = require('util')
var _product = {
	getProductList:function(data,success,error){
		_util.request({
			method:'get',
			url:'/user/productList',
			data:data,
			success:success,
			error:error
		})
	}
}

module.exports = _product;