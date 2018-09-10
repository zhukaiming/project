require('./index.css')

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
//修改了keyWord
var page = {
	init:function(){
		this.bindEvent();
		this.load();
	},
	load:function(){
		var keyword = _util.getParmFromUrl('keyword')
		if(keyword){
			$('#search-input').val(keyword)
		}
	},
	//绑定事件
	bindEvent:function(){//处理提交事件
		var _this = this;
		$('#search-btn').on('click',function(){
			_this.submit();
			//console.log('sss')
		})
		//enter
		$('input').on('keyup',function(e){
			if(e.keyCode == 13){
				_this.submit();
			}
		})
	},
	submit:function(){
		//1获取数据
		var keyword = $.trim($('#search-input').val());
		window.location.href = "./list.html?keyword="+keyword;
/*		console.log('keyword',keyword)
		if(keyword){
			window.location.href = "./list.html?keyword="+keyword;
		}else{
			_util.gohome();
		}*/
	},
}

$(function(){
	page.init()
})