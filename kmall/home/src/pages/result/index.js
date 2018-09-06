
require('pages/common/logo')
require('pages/common/footer')
require('./index.css')
var _util = require('util')

$(function(){
	//console.log('result...')
	var type = _util.getParmFromUrl('type')
	console.log(type)
})