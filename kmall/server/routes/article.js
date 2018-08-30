

//
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
/*
router.get('/',(req,res)=>{
	//获取首页
	res.render('Admin/article',{
		userInfo:req.userInfo//用户信息
	});
})
*/
//分页显示分类
//显示新增管理页面
router.get('/',(req,res)=>{//处理前台发送过来的请求
	//console.log('kkk')
	let options = {
		page:req.query.page,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:-1},
		populate:[{ path: 'category', select: 'name' },{ path: 'user', select: 'username' }]
	}
	//调用pagination
	

	// getPageArticle(req)
	pagination(options)
	.then((data)=>{
		res.render('Admin/article',{
			userInfo:req.userInfo,//用户信息
			articles:data.docs,
			page:data.page*1,//传递当前页,把字符串转化为数字
			list:data.list,
			pages:data.pages,
			url:'/article'
		})
	})
})
//显示新增
router.get('/add',(req,res)=>{
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then((categories)=>{
		res.render('Admin/article-add-edit',{
			userInfo:req.userInfo,//用户信息
			categories:categories
		});		
	})
})
//处理添加请求
//处理前台发送过来的请求
router.post('/add',(req,res)=>{
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
		message:'新增文章成功',
		url:'/article'
		});
	})
	.catch((e)=>{
		res.render('Admin/err',{
		userInfo:req.userInfo,//用户信息
		message:'新增文章失败'
		});
	})
})
/*
//显示编辑页面
router.get('/edit/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CategoryModel.findById(id)
	.then((category)=>{
		res.render('Admin/article-edit',{
			userInfo:req.userInfo,//用户信息
			category:category
		});
	})
	
})
*/
//显示编辑页面

router.get('/edit/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CategoryModel.find({},'_id name')
	.sort({order:-1})
	.then((categories)=>{
		ArticleModel.findById(id)
		.then((article)=>{
			res.render('Admin/article-add-edit',{
				userInfo:req.userInfo,//用户信息
				categories:categories,
				article:article
			});
		})
		.catch((e)=>{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'获取文章失败'
			});			
		})
	})
})
//处理编辑请求
//对文章分类进行编辑处理

router.post('/edit',(req,res)=>{
	let body = req.body;
	let options = {
		title:body.title,
		content:body.content,
		category:body.category,
		intro:body.intro
	}
	ArticleModel.update({_id:body.id},options,(err,rew)=>{
		if(!err){//
			res.render('Admin/success',{
			userInfo:req.userInfo,//用户信息
			message:'编辑文章成功',
			url:'/category'
			});
		}else{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'编辑文章失败'
			});				
		}
	})
})

//删除
router.get('/delete/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	ArticleModel.remove({_id:id},(err,suc)=>{
		if(!err){
			res.render('Admin/success',{
			userInfo:req.userInfo,//用户信息
			message:'删除分类成功',
			// url:'/category'			
			});		
		}else{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'编辑分类失败'
			});			
		}
	})
	
})
module.exports = router;
