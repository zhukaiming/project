

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
//显示新增的页面
router.get('/add',(req,res)=>{
	//获取首页
	res.render('Admin/category-add-edit',{
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
		res.render('Admin/category-add-edit',{
			userInfo:req.userInfo,//用户信息
			category:category
		});
	})
	
})
//处理编辑请求
//对分类进行编辑处理

router.post('/edit',(req,res)=>{
	let body = req.body;
	/*
	CategoryModel.findOne({name:body.name})
	.then((category)=>{//已有该分类,
		if(category && category.order == body.order){
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'编辑分类失败,有同名分类'
			});
		}else{//没有该分类的话,更新分类
			CategoryModel.update({_id:body.id},{name:body.name,order:body.order},(err,rew)=>{
				if(!err){//
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
	*/
	//逻辑：通过id查找分类,对分类进行处理:若数据库中的name=传进来的name且数据库中的order=传进来的order
	//则有同名分类;在进行查找,name是传进来的name,但当前的id不是传进来的Id,有同名分类,剩下的进行更新操作
	CategoryModel.findById(body.id)
	.then((category)=>{
		if(category.name == body.name && category.order == body.order){
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'编辑分类失败,有同名分类'
			});			
		}else{

			console.log('body',body)
			CategoryModel.findOne({name:body.name,_id:{$ne:body.id}})
			.then((newcategory)=>{
				if(newcategory){
					res.render('Admin/err',{
					userInfo:req.userInfo,//用户信息
					message:'编辑分类失败,有同名分类'
					});						
				}else{
					CategoryModel.update({_id:body.id},{name:body.name,order:body.order},(err,rew)=>{
						if(!err){//
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
		}
	})
})

//
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
