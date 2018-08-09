

//
const Router  = require('express').Router;

//const WishModel = require('../models/wish.js')
const router = Router();

//显示首页
router.get('/',(req,res)=>{
	//获取首页
	res.render('main/index',{
		userInfo:req.userInfo
	});
})

module.exports = router;
