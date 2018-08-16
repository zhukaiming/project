

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
	if(req.userInfo._id){
		next();
	}else{
		res.send('请登录');
	}
})
//显示首页
router.get('/',(req,res)=>{
	//获取首页
	res.render('home/index',{
		userInfo:req.userInfo//用户信息
	});
})

//显示用户评论内容
router.get('/comments',(req,res)=>{
	CommentModel.getPageComment(req,{user:req.userInfo._id})//只显示用户自己的评论
	.then(data=>{
		res.render('home/comment',{
			userInfo:req.userInfo,//用户信息
			comments:data.docs,
			page:data.page,
			pages:data.pages,
			list:data.list,
			url:'/home/comments'
		})		
	})
})
//删除评论
router.get('/comment/delete/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	CommentModel.remove({_id:id,user:req.userInfo._id},(err,suc)=>{
		if(!err){
			res.render('home/success',{
			userInfo:req.userInfo,//用户信息
			message:'删除评论成功',
			url:'/home/comments'			
			});		
		}else{
			res.render('home/err',{
			userInfo:req.userInfo,//用户信息
			message:'删除评论失败'
			});			
		}
	})
	
})

//删除密码

//更新密码
router.get('/password',(req,res)=>{
	//获取首页
	res.render('home/password',{
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
		res.render('home/success',{
		userInfo:req.userInfo,//用户信息
		message:'修改密码成功',
		url:'/'			
		});
	})
})

module.exports = router;
