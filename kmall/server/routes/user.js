

//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const router = Router();
const hmac = require('../util/crypto.js');
//用户注册
/*
router.get('/init',(req,res)=>{
	const data = [];
	for(var i=0;i<100;i++){
		data.push({
			username:'username'+i,
			password:hmac('password'+1),
			phone:'18838468'+i,
			email:'zhang' +i+'@kuazhu.com',
			isAdmin:false
		})
	}
	userModel.create(data)
	.then(result=>{
		res.send('ok')
	})
})
*/
router.post('/register',(req,res)=>{//接收ajax请求
	//res.render('main/index');
	let body = req.body;
	//定义返回数据,返回结果类型
	var result = {
		code:0,
		errmsg:''
	}
	//数据库中是否有username
	userModel
	.findOne({username:body.username})
	.then((user)=>{
		if(user){//用户名存在
			result.code = 10;
			result.errmsg = '用户名已存在'
			res.json(result)//把result对象转化为json返回出去
		}else{//用户名不存在
			new userModel({
				username:body.username,
				password:hmac(body.password),
				//isAdmin:true
			})//新建userModel实例
			.save((err,newUser)=>{//
				if(!err){//插入数据库成功
					res.json(result)
				}else{
					result.code = 10;
					result.errmsg = '注册失败'
					req.json(err)
				}
			})
		}
	})
})

//用户登录
router.post('/login',(req,res)=>{
	//获取首页
	//res.render('main/index');
	let body = req.body;
	var result = {
		code:0,
		errmsg:''
	}
	//查询
	userModel
	.findOne({username:body.username,password:hmac(body.password)})
	.then((user)=>{
		if(user){//用户名存在
			/*
			result.data = {
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			*/
			//设置cookies为userInfo，然后在app.js获取userInfo    cookies接收的是字符串
			//req.cookies.set('userInfo',JSON.stringify(result.data));//
			//res.json(result);//返回,浏览器端获取cookies
			
			//加密用户信息
			req.session.userInfo = {
				_id:user._id,
				username:user.username,
				isAdmin:user.isAdmin
			}
			res.json(result);
			
		}else{//
			result.code = 10;
			result.message = '用户名和密码错误'
			res.json(result)
		}
	})
})
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		code:10
	}
})
//退出
router.get('/logout',(req,res)=>{
	let result = {
		code:0,
		errmsg:''
	}
	//req.cookies.set('userInfo',null);//
	//res.json(result);
	//清除session
	req.session.destroy();
	res.json(result);
})
/*router.get('/userout',(req,res)=>{
	let result = {
		code:0,
		errmsg:''
	}
	//req.cookies.set('userInfo',null);//
	//res.json(result);
	//清除session
	req.session.destroy();
	res.json(result);
})*/


module.exports = router;
