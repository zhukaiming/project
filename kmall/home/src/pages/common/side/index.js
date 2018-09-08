require('./index.css')
var _util = require('util')
var tpl = require('./index.tpl')
var Hogan = require('hogan.js')
var side = {
	list:[
		{name:'user-center',desc:'用户中心',href:'./user-center.html'},
		{name:'user-list',desc:'我的订单',href:'./user-list.html'},
		{name:'update-password',desc:'修改密码',href:'./update-password.html'}
	],
	//渲染模板
	render:function(name){//配置模板,设置侧边栏active
		//确定那个需要active
		for(var i=0;i<this.list.length;i++){
			if(this.list[i].name == name){
				this.list[i].isActive = true;
			}
		}
		//生成html
		var html = _util.render(tpl,{
			list:this.list
		})
		//插入html
		$('.side').html(html)

	}
}
module.exports = side;