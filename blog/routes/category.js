

//
const Router  = require('express').Router;

const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js')
const router = Router();


//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})
//分类列表
router.get('/',(req,res)=>{
	//获取首页

	let options = {
		page:req.query.page,
		model:CategoryModel,
		query:{},
		projection:'_id name order',
		sort:{_id:-1}	
	}
	//调用pagination
	pagination(options)
	.then((data)=>{
		res.render('Admin/category-list',{
			userInfo:req.userInfo,//用户信息
			categories:data.docs,
			page:data.page*1,//传递当前页,把字符串转化为数字
			list:data.list,
			pages:data.pages,
			url:'/category'
		})
	})
	/*
	CategoryModel.find({},'_id name order')
	.then((categories)=>{
		res.render('Admin/category-list',{
			userInfo:req.userInfo,//用户信息
			categories:categories,
		});
	})
	*/

})

router.get('/add',(req,res)=>{
	//获取首页
	res.render('Admin/category-add',{
		userInfo:req.userInfo//用户信息
	});
})

//新增分类
router.post('/add',(req,res)=>{
	//console.log(req.body)
	//插入数据到数据库
	let body = req.body;
	CategoryModel.findOne({name:body.name})
	.then((cate)=>{
		//已经存在分类名的话
		if(cate){//渲染失败页面
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'新增分类失败'
		});
		}else{//bu存在分类名
			//新建一个model
			new CategoryModel({
				name:body.name,
				order:body.order
			})
			.save()
			.then((newcate)=>{//渲染成功页面
				//新增分类成功
				if(newcate){
					res.render('Admin/success',{
					userInfo:req.userInfo,//用户信息
					message:'新增分类成功',
					url:'/category'
					});
				}
			})
			//新增失败
			.catch((e)=>{
				res.render('Admin/err',{
				userInfo:req.userInfo,//用户信息
				message:'新增分类失败'
				});
			})
		}
	})
})

//显示编辑页面
router.get('/edit/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CategoryModel.findById(id)
	.then((category)=>{
		res.render('Admin/category-edit',{
			userInfo:req.userInfo,//用户信息
			category:category
		});
	})
	
})
//编辑
router.post('/edit',(req,res)=>{
	let body = req.body;
	CategoryModel.findOne({name:body.name})
	.then((cate)=>{//已有该分类
		if(cate){
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'编辑分类失败'
			});
		}else{//
			CategoryModel.update({_id:body.id},{name:body.name,order:body.oder},(err,rew)=>{
				if(!err){
					res.render('Admin/success',{
					userInfo:req.userInfo,//用户信息
					message:'修改分类成功',
					url:'/category'
					});
				}else{
					res.render('Admin/err',{
					userInfo:req.userInfo,//用户信息
					message:'修改分类失败'
					});					
				}
			})
		}
	})
})

router.get('/delete/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CategoryModel.remove({_id:id},(err,suc)=>{
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
