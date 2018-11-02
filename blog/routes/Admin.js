

//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const pagination = require('../util/pagination.js');
const router = Router();
const multer  = require('multer');
const hmac = require('../util/crypto.js');

const upload = multer({ dest: 'public/uploads/' });
const CommentModel=require('../models/comment.js');
const fs = require('fs');
const path = require('path');
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

//显示用户评论内容
router.get('/comments',(req,res)=>{
	CommentModel.getPageComment(req)
	.then(data=>{
		console.log('1:::',data.docs)
		res.render('Admin/comment',{
			userInfo:req.userInfo,//用户信息
			comments:data.docs,
			page:data.page,
			pages:data.pages,
			list:data.list,
			//url:'Admin/comments'//发送url到content.html,它里面的pagination使用url
		})
	})
})
//删除评论
router.get('/comment/delete/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CommentModel.remove({_id:id},(err,suc)=>{
		if(!err){
			res.render('Admin/success',{
			userInfo:req.userInfo,//用户信息
			message:'删除评论成功',
			url:'/Admin/comments'			
			});		
		}else{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'删除评论失败'
			});			
		}
	})
})
//显示站点
router.get('/site',(req,res)=>{
	//获取首页
	let filePath = path.normalize(__dirname + '/../site.json');//获取文件的路径
	fs.readFile(filePath,(err,data)=>{//读取文件
		if(!err){
			let site = JSON.parse(data);//转化为对象
			//console.log(site)
			res.render('Admin/site',{
				userInfo:req.userInfo,//用户信息
				site:site
			});			
		}else{
			console.log(err)
		}
	})

})
//处理修改网站配置需求
//把网站的配置信息写入配置文件site.json中
router.post('/site',(req,res)=>{
	let body = req.body;
	//console.log(body)
	let site = {
		name:body.name,
		author:{
			name:body.authorName,
			intro:body.authorIntro,
			image:body.authorImage,
			wechat:body.authorWechat
		},
		icp:body.icp
	}
	site.carouseles = [];
	//console.log('111',body.carouselUrl);//body.carouselUrl:是一个字符串'http://www.kuazhu.com', 'http://www.taobao.com' 
	if(body.carouselUrl.length && (typeof body.carouselUrl == 'object')){//是数组
		for(var i = 0;i<body.carouselUrl.length;i++){
			site.carouseles.push({
				url:body.carouselUrl[i],
				path:body.carouselPath[i]
			})			
		}
	}else{
		site.carouseles.push({
			url:body.carouselUrl,
			path:body.carouselPath
		})
	}

	site.ads = [];
	if(body.adUrl.length && (typeof body.adUrl == 'object')){//是数组
		for(var i = 0;i<body.adUrl.length;i++){
			site.ads.push({
				url:body.adUrl[i],
				path:body.adPath[i]
			})			
		}
	}else{
		site.ads.push({
			url:body.adUrl,
			path:body.adPath
		})
	}

	//console.log(site)
	let strsite = JSON.stringify(site);//从一个对象中解析出字符串
	let filePath = path.normalize(__dirname + '/../site.json');//获取文件的路径
	fs.writeFile(filePath,strsite,(err,data)=>{//写入文件
		if(!err){
			res.render('Admin/success',{
			userInfo:req.userInfo,//用户信息
			message:'成功',
			url:'/Admin/site'			
			});		
		}else{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'失败'
			});			
		}				
	})
})


//更新密码
router.get('/password',(req,res)=>{
	//获取首页
	res.render('Admin/password',{
		userInfo:req.userInfo//用户信息
	});
})
//修改密码
router.post('/password',(req,res)=>{
	userModel.update({_id:req.userInfo._id},{//当前登录用户的id
		password:hmac(req.body.password)
	})
	.then(raw=>{
		req.session.destroy();//退出
		res.render('Admin/success',{
		userInfo:req.userInfo,//用户信息
		message:'修改密码成功',
		url:'/'			
		});
	})
})

router.get('/home',(req,res)=>{
	//获取首页
	res.render('home/layout',{
		userInfo:req.userInfo//用户信息
	});
})

module.exports = router;
