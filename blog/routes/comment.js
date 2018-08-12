

//
const Router  = require('express').Router;

const CommentModel = require('../models/comment.js');
const router = Router();

//处理前台发送过来的请求
router.post('/add',(req,res)=>{
	let body = req.body;
	//console.log(body)
	new CommentModel({
		article:body.id,
		user:req.userInfo._id,
		content:body.content
	})
	.save()
	.then(comment=>{
		res.json({
			code:0
		})
	})
	
})

module.exports = router;
