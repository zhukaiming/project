

//
const Router  = require('express').Router;

//const WishModel = require('../models/wish.js')
const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const pagination = require('../util/pagination.js')
const getCommonData = require('../util/getCommonData.js')
const CommentModel=require('../models/comment.js')

const router = Router();
//显示首页
router.get('/',(req,res)=>{
	//获取首页
	/*
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		ArticleModel.getPageArticle(req)
		.then((data)=>{
			ArticleModel.find({},'_id title click')
			.sort({click:1})
			.then((topArticle)=>{//处理侧边文章
				res.render('main/index',{
					userInfo:req.userInfo,//用户信息
					articles:data.docs,
					page:data.page*1,//传递当前页,把字符串转化为数字
					list:data.list,
					pages:data.pages,
					topArticle:topArticle,
					url:'/articles',//提交的地址
					categories:categories
				})				
			})
		})	
	})
	*/
	ArticleModel.getPageArticle(req)
	.then(pageData=>{
		getCommonData()
		.then(data=>{
			res.render('main/index',{
				userInfo:req.userInfo,//用户信息
				articles:pageData.docs,
				page:pageData.page*1,//传递当前页,把字符串转化为数字
				list:pageData.list,
				pages:pageData.pages,
				topArticle:data.topArticle,
				categories:data.categories,
				site:data.site,
				url:'/articles'//提交的地址
				
			})			
		})
	})
})

//利用ajax请求获取文章列表的分页
//接收ajax请求
router.get('/articles',(req,res)=>{
	let category = req.query.id;
	let query  = {};
	if(category){
		query.category = category;
	}
	//console.log(query)
		ArticleModel.getPageArticle(req,query)
		.then((data)=>{
			res.json({
				code:'0',
				data:data
			})
		})
})


//处理view
//显示详情页面
router.get('/view/:id',(req,res)=>{
	//获取
	let id = req.params.id;
	//console.log(id)
	/*
	ArticleModel.updata({_id:id},{$inc:{click:1}})
	.then((rew)=>{
		ArticleModel.findById(id)
		.then((article)=>{

		})
	})
	*/
	/*
	ArticleModel.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
	.populate('category','name')
	.then((article)=>{
		//分配数据到模板
		CategoryModel.find({},'_id name')
		.sort({order:1})
		.then((categories)=>{
			ArticleModel.find({},'_id title click')
			.sort({click:1})
			.then((topArticle)=>{
				//
				res.render('main/detail',{
					userInfo:req.userInfo,
					article:article,
					categories:categories,
					topArticle:topArticle
				})
			})			
		})
	})
	*/
	ArticleModel.findByIdAndUpdate(id,{$inc:{click:1}},{new:true})
	.populate('category','name')
	.then(article=>{
		getCommonData()
		.then(data=>{
			CommentModel.getPageComment(req,{article:id})//查询条件,获评论类的id
			.then(pageData=>{
				res.render('main/detail',{
					userInfo:req.userInfo,
					article:article,
					categories:data.categories,
					topArticle:data.topArticle,
					comments:pageData.docs,
					page:pageData.page,
					list:pageData.list,
					site:data.site,
					pages:pageData.pages,
					category:article.category._id.toString()
				})
			})
		})
	})
})
//显示列表页
router.get('/list/:id',(req,res)=>{
	//获取
	let id = req.params.id;
	ArticleModel.getPageArticle(req,{category:id})//查询条件,获取文章分类的id
	.then(pageData=>{
		getCommonData()
		.then(data=>{
			res.render('main/list',{
				userInfo:req.userInfo,//用户信息
				articles:pageData.docs,
				page:pageData.page*1,//传递当前页,把字符串转化为数字
				list:pageData.list,
				pages:pageData.pages,
				site:data.site,
				topArticle:data.topArticle,
				categories:data.categories,
				//category:id:接收一个分类,然后把该分类的id传递到页面,目的是让每一个列表页只显示他自己的文章
				category:id,
				url:'/articles'//提交的地址
			})			
		})
	})
})

module.exports = router;
