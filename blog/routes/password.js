const Router  = require('express').Router;
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js');

const router = Router();
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})

//
router.post('/',(req,res)=>{
	let body = req.body;
	new ArticleModel({
		category:body.category,
		user:req.userInfo._id,
		title:body.title,
		intro:body.intro,
		content:body.content
	})
	.save()
	.then((article)=>{//
		res.render('Admin/success',{
		userInfo:req.userInfo,//用户信息
		message:'新增分类成功',
		url:'/article'
		});
	})
	.catch((e)=>{
		res.render('Admin/err',{
		userInfo:req.userInfo,//用户信息
		message:'新增分类失败'
		});
	})
})