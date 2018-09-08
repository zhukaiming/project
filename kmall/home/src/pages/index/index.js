
require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
var _util = require('util')
var keykordTpl = require('./keyword.tpl')
var floorTpl = require('./floor.tpl')
var page = {
	keyWords:[
		{item:[{name:'手机'},{name:'电脑'}]},
		{item:[{name:'IPhone'},{name:'电脑'}]},
		{item:[{name:'衣服'},{name:'连衣裙'}]},
		{item:[{name:'家具'},{name:'沙发'}]},
		{item:[{name:'美妆'},{name:'沙龙'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]},
		{item:[{name:'鞋包'},{name:'品牌'}]}
		
	],
	floor:[
		{
			title:'F1 电器',
			item:[
				{image:require('../../util/carousel/images/f1.jpg'),text:'手机',categoryId:1111},
				{image:require('../../util/carousel/images/f2.jpg'),text:'电脑',categoryId:2222},
				{image:require('../../util/carousel/images/f3.png'),text:'IPhone',categoryId:3333},
				{image:require('../../util/carousel/images/f4.jpg'),text:'苹果',categoryId:4444},
				{image:require('../../util/carousel/images/f5.jpg'),text:'或权',categoryId:5555}
			]
		},
		{
			title:'F2 服饰',
			item:[
				{image:require('../../util/carousel/images/f5.jpg'),text:'手机',categoryId:1111},
				{image:require('../../util/carousel/images/f5.jpg'),text:'电脑',categoryId:2222},
				{image:require('../../util/carousel/images/f5.jpg'),text:'IPhone',categoryId:3333},
				{image:require('../../util/carousel/images/f5.jpg'),text:'苹果',categoryId:4444},
				{image:require('../../util/carousel/images/f5.jpg'),text:'或权',categoryId:5555}
			]
		},

	],
	init:function(){
		//this.bindEvent();
		this.loadKeyword();
		this.loadCaousel();
		this.loadFloor();
	},
	loadKeyword:function(){
		var html = _util.render(keykordTpl,{
			keyWords:this.keyWords
		})
		$('.keywords').html(html)
	},
	loadCaousel:function(){
		$('.carousel').unslider({
			keys:true,
			dots:true
		});
	},
	loadFloor:function(){
		var html = _util.render(floorTpl,{
			floor:this.floor
		})
		$('.floor-box').html(html)
	}
}

$(function(){
	page.init()
})
