

//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const ProductModel = require('../models/product.js');
const router = Router();
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
//添加地址
router.post('/',(req,res)=>{
	let body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		//已有地址
		if(user.shipping){
			user.shipping.push(body);
		}
		else{
			user.shipping = [body];
		}
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping,
			})
		})
	})
})	
//获取登录用户的地址
router.get('/list',(req,res)=>{
	let body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:user.shipping
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取用户信息失败'
		})
	})
})
//删除地址
router.put('/delete',(req,res)=>{
	let body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		user.shipping.id(body.shippingId).remove();
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping
			})
		})			
	})

})
//根据Id获取地址
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)
	.then(user=>{
		res.json({
			code:0,
			data:user.shipping.id(req.query.shippingId)
		})
	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取用户信息失败'
		})
	})
})
//
//编辑地址
router.put('/',(req,res)=>{
	let body = req.body;
	userModel.findById(req.userInfo._id)
	.then(user=>{
		let shipping = user.shipping.id(body.shippingId);
		shipping.name = body.name;
		shipping.province = body.province;
		shipping.city = body.city;
		shipping.address = body.address;
		shipping.phone = body.phone;
		shipping.zip = body.zip;
		user.save()
		.then(newUser=>{
			res.json({
				code:0,
				data:user.shipping,
			})
		})
	})
})
module.exports = router;
