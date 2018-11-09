
//加下划线,内部使用的方法
var _util = require('util')
var _order = {
	getOrderProductList:function(success,error){
		_util.request({
			url:'/order/orderProductList',
			success:success,
			error:error
		})
	},
}

module.exports = _order;