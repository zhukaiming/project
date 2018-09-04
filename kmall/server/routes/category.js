

//
const Router  = require('express').Router;

const CategoryModel = require('../models/category.js');
const pagination = require('../util/pagination.js')
const router = Router();

//设置权限
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send({
			code:10
		});
	}
})

//post新增分类
router.post('/',(req,res)=>{
	//console.log(req.body)
	//插入数据到数据库
	let body = req.body;
	CategoryModel.findOne({name:body.name,pid:body.pid})
	.then((cate)=>{
		console.log('44',cate)
		//已经存在分类名的话
		if(cate){//渲染失败页面
			res.json({
				code:1,
				message:'已有该分类'
			})
		}else{//bu存在分类名
			//新建一个model
			new CategoryModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newcate)=>{//渲染成功页面
				//新增分类成功
				if(newcate){
					if(body.pid==0){//如果添加的是一级分类,返回一级分类,在前台显示新添加的一级分类
						CategoryModel.find({pid:0},"_id name")
						.then((categories)=>{
							res.json({
								code:0,
								data:categories
							})
						})
					}else{
						res.json({
							code:0,
						})						
					}
				}
			})
			//新增失败
			.catch((e)=>{
				res.json({
					code:1,
					message:'新增分类失败'
				})
			})
		}
	})
})

//get获取分类
router.get('/',(req,res)=>{
	let pid = req.query.pid;
	
	let page = req.query.page;
	console.log('page',page)
	//如果有page的话,显示分页列表
	if(page){
		CategoryModel.getPageCategory(page,{pid:pid})//调用获取分页封装的函数
		.then((result)=>{
			res.json({
				code:0,
				data:{
					list:result.list,
				    current:result.current,
				    total:result.total,
				    pageSize:result.pageSize					
				}
			})
		})
	}else{
		console.log(req.query.pid)
		CategoryModel.find({pid:pid},"_id name order pid")
		.then((categories)=>{
			//console.log('categories...',categories)
			res.json({
				code:0,
				data:categories
			})
		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取分类失败'
			})
		})		
	}

})

//更新分类

router.put('/updataname',(req,res)=>{
	//console.log(req.body)
	let body = req.body;
	CategoryModel.findOne({name:body.name,pid:body.pid})
	.then((cate)=>{
		console.log('cate...',cate)
		//已经存在分类名的话
		if(cate){//渲染失败页面
			res.json({
				code:1,
				message:'已有该分类名'
			})
		}else{//bu存在分类名
			CategoryModel
			.update({_id:body.id},{name:body.name})
			.then((cate)=>{
				if(cate){
					CategoryModel.getPageCategory(body.page,{pid:body.pid})//调用获取分页封装的函数
					.then((result)=>{
						//console.log('555',result)
						res.json({
							code:0,
							data:{
								list:result.list,
							    current:result.current,
							    total:result.total,
							    pageSize:result.pageSize					
							}
						})
					})
				}else{
					res.json({
						code:1,
						message:'更新分类失败'
					})					
				}
				
			})				
		}
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取分类失败11'
		})
	})	
})


//更新order

router.put('/updataorder',(req,res)=>{
	//console.log(req.body)
	let body = req.body;
	CategoryModel.update({_id:body.id},{order:body.order})
	.then((cate)=>{
		console.log('2222...',cate)
		if(cate){
			CategoryModel.getPageCategory(body.page,{pid:body.pid})//调用获取分页封装的函数
			.then((result)=>{
				res.json({
					code:0,
					data:{
						list:result.list,
					    current:result.current,
					    total:result.total,
					    pageSize:result.pageSize					
					}
				})
			})					
		}else{
			res.json({
				code:1,
				message:'更新order失败'
			})					
		}
	})
})

//////
//分类列表
/*router.get('/',(req,res)=>{
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
	
})*/
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
/*
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
	/*
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
*/

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
