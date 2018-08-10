

//
const Router  = require('express').Router;

//const WishModel = require('../models/wish.js')
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js')
const router = Router();
//显示首页
/*
router.get('/',(req,res)=>{
	//获取首页
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories:categories
		});		
	})
})
*/
router.get('/',(req,res)=>{
	let options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1},
		populate:[{ path: 'category', select: 'name' },{ path: 'user', select: 'username' }]
	}
	//调用pagination
	pagination(options)
	.then((data)=>{
		res.render('main/index',{
			userInfo:req.userInfo,//用户信息
			articles:data.docs,
			page:data.page*1,//传递当前页,把字符串转化为数字
			list:data.list,
			pages:data.pages,
			url:'/article'
		})
	})
})

module.exports = router;
