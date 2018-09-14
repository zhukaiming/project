
require('pages/common/nav')
require('pages/common/search')
require('util/carousel')
// require('pages/common/user-center')
require('./index.css')
var _util = require('util')
var keywordTpl = require('./keyword.tpl')
var carouselTpl = require('./carousel.tpl')
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
	carousel:[
		{categoryId:'5b862dcf8e2e0b52609ae6c8',image:require('images/carousel/carousel2.jpg')},
		{categoryId:'5b862dcf8e2e0b52609ae6c8',image:require('images/carousel/carousel4.jpg')},
		{categoryId:'5b862dcf8e2e0b52609ae6c8',image:require('images/carousel/carousel5.jpg')}
	],
	floor:[
		{
			title:'F1 电器',
			item:[
				{image:require('images/floor/f1.jpg'),text:'手机',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('images/floor/f2.jpg'),text:'电脑',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('images/floor/f3.png'),text:'IPhone',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('images/floor/f4.jpg'),text:'苹果',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('images/floor/f5.jpg'),text:'或权',categoryId:'5b862dcf8e2e0b52609ae6c8'}
			]
		},
		{
			title:'F2 服饰',
			item:[
				{image:require('../../util/carousel/images/f5.jpg'),text:'手机',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'电脑',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'IPhone',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'苹果',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'或权',categoryId:'5b862dcf8e2e0b52609ae6c8'}
			]
		},
		{
			title:'F3 家居',
			item:[
				{image:require('../../util/carousel/images/f5.jpg'),text:'手机',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'电脑',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'IPhone',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'苹果',categoryId:'5b862dcf8e2e0b52609ae6c8'},
				{image:require('../../util/carousel/images/f5.jpg'),text:'或权',categoryId:'5b862dcf8e2e0b52609ae6c8'}
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
		var html = _util.render(keywordTpl,{
			keyWords:this.keyWords
		})
		$('.keywords').html(html)
	},
	loadCaousel:function(){
		//
		var html = _util.render(carouselTpl,{
			carousel:this.carousel
		})
		$('.carousel').html(html)

		//
		var $carousel = $('.carousel').unslider({
			keys:true,
			dots:true
		});
		$('.arrow').on('click',function(){
			let direction = $(this).hasClass('next') ? 'next' : 'prev';
			$carousel.data('unslider')[direction]();
		})

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
