

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
/*
router.get('/init',(req,res)=>{
	new userModel({
		username:'admin',
		password:hmac('admin'),
		isAdmin:true
	})
	.save((err,newUser)=>{
		if(!err){
			res.send('ok')
		}else{
			res.send('err')
		}
	})
})
*/
//登录
router.post('/login',(req,res)=>{
	//获取首页
	let body = req.body;
	var result = {
		code:0,
		message:''
	}
	//查询
	console.log('body::',body)
	userModel
	.findOne({username:body.username,password:hmac(body.password),isAdmin:true})
	.then((user)=>{
		console.log('1',user)
		if(user){//用户名存在
			req.session.userInfo = {
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			//把登录的用户名返回到前台

			result.data={
				username:user.username
			}
			res.json(result);
			console.log('233...',result)
		}else{//
			result.code = 1;
			result.message = '用户名和密码错误'
			res.json(result)
		}
	})
})

//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>');
	}
})
//数据处理
router.get('/count',(req,res)=>{
	//返回数据
	res.json({
		code:0,
		data:{
			usernum:200,
			ordernum:201,
			productnum:202
		}
	})
})
//显示用户列表
router.get('/users',(req,res)=>{//处理前台发送过来的请求
	let options = {
		page:req.query.page,
		model:userModel,
		query:{},
		projection:'',
		sort:{_id:-1}
	}
	//调用pagination
	pagination(options)
	.then((result)=>{
		res.json({
			code:0,
			data:{
				list:result.list,
			    current:result.defaultCurrent,
			    total:result.total,
			    pageSize:result.pageSize				
			}
		})
	})
})

/*//处理用户
router.get('/user',(req,res)=>{
	//返回数据
	res.json({
		code:0,
		data:{
	        defaultCurrent:1,
	        total:300,
	        pageSize:10
		}
	})
})
*/
//显示管理员首页
router.get('/',(req,res)=>{
	//获取首页
	res.render('Admin/index',{
		userInfo:req.userInfo//用户信息
	});
})

//显示用户列表
router.get('/users',(req,res)=>{//处理前台发送过来的请求
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
