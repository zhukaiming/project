

//
const Router  = require('express').Router;

const CommentModel = require('../models/comment.js');
const router = Router();

//处理前台发送过来的ajax添加评论请求
router.post('/add',(req,res)=>{
	let body = req.body;
	//console.log(body)
	//console.log(req.userInfo._id)
	new CommentModel({
		article:body.id,
		user:req.userInfo._id,
		content:body.content
	})
	.save()
	.then(comment=>{
		CommentModel.getPageComment(req)
		.then(data=>{
			res.json({
				code:0,
				data:data
			})			
		})

	})
	
})

//
router.get('/list',(req,res)=>{
	let article = req.query.id;
	let query  = {};
	if(article){
		query.article = article;
	}
	//console.log(query)
	CommentModel.getPageComment(req,query)
	.then((data)=>{
		res.json({
			code:'0',
			data:data
		})
	})	
})
//编辑评论
/*
router.get('/',(req,res)=>{
	//
	let options = {
		page:req.query.page,
		model:CommentModel,
		query:{},
		projection:'_id name order',
		sort:{_id:-1}	
	}
	//调用pagination
	pagination(options)
	.then((data)=>{
		res.render('Admin/comment',{
			userInfo:req.userInfo,//用户信息
			categories:data.docs,
			page:data.page*1,//传递当前页,把字符串转化为数字
			list:data.list,
			pages:data.pages,
			url:'/category'
		})
	})
})
*/
module.exports = router;
