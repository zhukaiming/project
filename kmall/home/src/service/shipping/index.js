
//加下划线,内部使用的方法
var _util = require('util')
var _shipping = {
	addShipping:function(data,success,error){
		_util.request({
			method:'post',
			url:'/shipping',
			data:data,
			success:success,
			error:error
		})
	},
	//
	getShippingList:function(success,error){
		_util.request({
			url:'/shipping/list',
			success:success,
			error:error
		})		
	},
	//
	deleteShipping:function(data,success,error){
		_util.request({
			method:'put',
			url:'/shipping/delete',
			data:data,
			success:success,
			error:error			
		})
	}
}

module.exports = _shipping;