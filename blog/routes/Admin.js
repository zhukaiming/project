

//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const pagination = require('../util/pagination.js');
const router = Router();
var multer  = require('multer');
var upload = multer({ dest: 'public/uploads/' });

//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})
//显示管理员首页
router.get('/',(req,res)=>{
	//获取首页
	res.render('Admin/index',{
		userInfo:req.userInfo//用户信息
	});
})

//显示用户列表
router.get('/users',(req,res)=>{//处理前台发送过来的请求
	//获取用户信息给模板

	//获取页码
	/*
	let page = req.query.page || 1;//没有传page的话显示第一页
	let limit = 2;//每页两条用户信息
	if(page <= 0){
		page = 1;
	}
	////获取总条数count
	userModel.estimatedDocumentCount({})
	.then((count)=>{
		let pages = Math.ceil(count/limit);//获取总页数,总条数/每页的条数
		if(page>pages){
			page = pages;
		}
		//存放页码
		let list = [];
		for(let i = 1;i<=pages;i++){
			list.push(i);
		}
		//跳过的条数
		let skip = (page-1)*limit;
		userModel
		.find({},'_id username isAdmin')//找到所有user，显示用户的 id username isAdmin
		.skip(skip)
		.limit(limit)
		.then((users)=>{
			res.render('Admin/user-list',{
				userInfo:req.userInfo,//用户信息
				users:users,
				page:page*1,//传递当前页,把字符串转化为数字
				list:list
			});
		})		
	})
	*/
	let options = {
		page:req.query.page,
		model:userModel,
		query:{},
		projection:'_id username isAdmin',
		sort:{_id:-1}	
	}
	//调用pagination
	pagination(options)
	.then((data)=>{
		res.render('Admin/user-list',{
			userInfo:req.userInfo,//用户信息
			users:data.docs,
			page:data.page*1,//传递当前页,把字符串转化为数字
			list:data.list,
			pages:data.pages,
			url:'/Admin/users'
		})
	})
})

//上传图片处理
router.post('/uploadImages', upload.single('upload'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  let path = '/uploads/'+req.file.filename;
  //console.log(req.file.filename)
  res.json({
  	uploaded:true,
  	url:path
  })
})
module.exports = router;
