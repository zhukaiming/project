

//
const Router  = require('express').Router;

//const CategoryModel = require('../models/category.js');
const router = Router();
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})
router.get('/',(req,res)=>{
	//获取首页
	res.render('Admin/article',{
		userInfo:req.userInfo//用户信息
	});
})
router.get('/add',(req,res)=>{
	//获取首页
	res.render('Admin/article-text',{
		userInfo:req.userInfo//用户信息
	});
})
module.exports = router;
