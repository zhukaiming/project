
const Router  = require('express').Router;
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const ProductModel = require('../models/product.js');
const router = Router();
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product_img/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })


//排序
//获取
router.get('/homeList',(req,res)=>{

	let page = req.query.page;
	let query = {status:0}
	//
	//console.log(query)
	if(req.query.categoryId){
		query.category = req.query.categoryId;
	}else{
		query.name = {$regex : new RegExp(req.query.keyword,'i')}
	}
	let projection='name price _id images';
	let sort  = {order:-1};
	//
	// console.log(projection)
	if(req.query.orderBy == 'price_asc'){
		sort = {price:-1}
	}else if(req.query.orderBy == 'price_desc'){
		sort = {price:1}
	}
	//
	ProductModel.getPageProduct(page,query,projection,sort)
	.then(result=>{
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
	.catch(e=>{
		res.json({
			code:1,
			message:'获取失败'
		})
	})
})
//获取商品详情页信息
router.get('/homeDetail',(req,res)=>{
	console.log(req.query.productId)
	ProductModel
	.findOne({status:0,_id:req.query.productId},"-__v -createdAt -updatedAt")
	.then(product=>{
		res.json({
			code:0,
			data:product
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取商品详情页信息失败'
		})
	})
})
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})

//处理图片新增资源
router.post('/uploadproductImages',upload.single('file'),(req,res)=>{
	//发送FilePath到服务器端
	//
	const FilePath = 'http://127.0.0.1:3000/product_img/'+req.file.filename
	res.send(FilePath)// path: 'public\\resource\\1534175359489.jpg')
})

//
router.post('/updataload',upload.single('upload'),(req,res)=>{
	const FilePath = 'http://127.0.0.1:3000/product_img/'+req.file.filename
	res.json({
	  "success": true,
	  "msg": "error message",
	  "file_path": FilePath	
	})// path: 'public\\resource\\1534175359489.jpg')
})

//处理提交
router.post('/',(req,res)=>{
	let body = req.body;
		new ProductModel({
			name:body.name,
			category:body.category,
			description:body.description,
			detail:body.detail,
			images:body.images,
			price:body.price,
			stock:body.stock,
			status:body.status
		})
		.save()
		.then((product)=>{//渲染成功页面
			//新增分类成功
			if(product){//
				res.json({
					code:0,
					message:'新增商品成功'
				})
			}
		})
		//新增失败
		.catch((e)=>{
			res.json({
				code:1,
				message:'新增商品失败'
			})
		})

			//name price _id status:0//在售
			//_id pid
			//
})



//get获取分类
router.get('/',(req,res)=>{

	let page = req.query.page;
	console.log('page',page)
	//如果有page的话,显示分页列表
		ProductModel.getPageProduct(page,{})//调用获取分页封装的函数
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
})

//搜索
router.get('/searchProduct',(req,res)=>{
	let page = req.query.page || 1;
	let keyword = req.query.keyword;
	console.log(keyword)
	//如果有page的话,显示分页列表
		ProductModel
		.getPageProduct(page,{
			name:{$regex : new RegExp(keyword,'i')}})//新建一个正则,查找
		.then((result)=>{
			res.json({
				code:0,
				data:{
					list:result.list,
				    current:result.current,
				    total:result.total,
				    pageSize:result.pageSize,
				    keyword:keyword
				}
			})
		})
})
//更新排序
router.put('/updataProductOrder',(req,res)=>{
	//console.log(req.body)
	let body = req.body;
	ProductModel.update({_id:body.id},{order:body.order})
	.then((product)=>{
		if(product){
			ProductModel.getPageProduct(body.page,{})//调用获取分页封装的函数
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
//编辑商品
router.put('/',(req,res)=>{
	//console.log(req.body)
	let body = req.body;
	let update = {
		name:body.name,
		category:body.category,
		description:body.description,
		detail:body.detail,
		images:body.images,
		price:body.price,
		stock:body.stock,
		status:body.status
	}
	ProductModel
	.update({_id:body.id},update)
	.then((product)=>{//渲染成功页面
		//新增分类成功
		if(product){//
			res.json({
				code:0,
				message:'编辑商品成功'
			})
		}
	})
	//新增失败
	.catch((e)=>{
		res.json({
			code:1,
			message:'新增商品失败'
		})
	})
})
//
router.put('/updataProductStatus',(req,res)=>{
	//console.log(req.body)
	let body = req.body;
	ProductModel.update({_id:body.id},{status:body.status})
	.then((product)=>{
		if(product){
			res.json({
				code:0,
				message:'更新状态成功'
			})						
		}else{
			ProductModel.getPageProduct(body.page,{id:body.id})//调用获取分页封装的函数
			.then((result)=>{
				res.json({
					code:1,
					data:{
						list:result.list,
					    current:result.current,
					    total:result.total,
					    pageSize:result.pageSize					
					}
				})
			})			
				
		}
	})
})
//
router.get('/detail',(req,res)=>{
	//获取首页
	let id = req.query.id;
	//console.log(id)
	ProductModel
	.findById(id,"-__v -order -status -createdAt -updatedAt")//筛选字段，不要
	.populate({path:'category',select:'_id pid'})//
	.then((product)=>{
		res.json({
			code:0,
			data:product
		})		
	})
	
})


//设置权限
router.use((req,res,next)=>{
	if(req.userInfo._id){
		next();
	}else{
		res.json({
			code:10
		})
	}
})

/*
//post新增分类
router.post('/',(req,res)=>{
	//console.log(req.body)
	//插入数据到数据库
	let body = req.body;
	ProductModel.findOne({name:body.name,pid:body.pid})
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
			new ProductModel({
				name:body.name,
				pid:body.pid
			})
			.save()
			.then((newcate)=>{//渲染成功页面
				//新增分类成功
				if(newcate){
					if(body.pid==0){//如果添加的是一级分类,返回一级分类,在前台显示新添加的一级分类
						ProductModel.find({pid:0},"_id name")
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
*/
module.exports = router;
