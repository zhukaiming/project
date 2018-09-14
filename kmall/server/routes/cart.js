

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
//购物车
router.post('/',(req,res)=>{
	let body = req.body;
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//
			let cartItem = user.cart.cartList.find((item)=>{
				return item.product = body.productId;
				})
				//
				if(cartItem){
					cartItem.count = cartItem.count + parseInt(body.count)
				}else{
					user.cart.cartList.push({
						product:body.productId,
						count:body.count
					})					
				}
		}
		else{//没有,新建一个
			user.cart = {
				cartList:[
				{
					product:body.productId,
					count:body.count	
				}
			]
		}
		}
		user.save()
		.then(newUser=>{
			console.log('newUser',newUser)
			res.json({
				code:0,
				message:'添加购物车成功',
				//data:newUser
			})
		})
	})
})	
//获取购物车信息
router.get('/',(req,res)=>{
	userModel.findById(req.userInfo._id)//获取用户信息
	.then(user=>{//
		//调用getCart方法,获取购物车信息
		user
		.getCart()
		.then(cart=>{
			res.json({
				code:0,
				data:user.cart
			})			
		})

	})
	.catch(e=>{
		res.json({
			code:1,
			message:'获取购物车信息失败'
		})		
	})
})


//选中购物车中的一项
router.put('/selectOne',(req,res)=>{
	let body = req.body;
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//
			let cartItem = user.cart.cartList.find((item)=>{
				return item.product = body.productId;
				})
				//
				if(cartItem){
					cartItem.checked = true;
				}else{
					res.json({
						code:1,
						message:'购物车记录不存在'
				})				
				}
		}
		else{//没有,新建一个
				res.json({
					code:1,
					message:'还没有购物车'
				})
		}
		user
		.save()
		.then(newUser=>{
			user.getCart()
			.then(cart=>{
				res.json({
					code:0,
					data:cart
				})			
			})
		})
	})
})	


//取消购物车中的一项
router.put('/unselectOne',(req,res)=>{
	let body = req.body;
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//
			let cartItem = user.cart.cartList.find((item)=>{
				return item.product = body.productId;
				})
				//
				if(cartItem){
					cartItem.checked = false;
				}else{
					res.json({
						code:1,
						message:'购物车记录不存在'
				})				
				}
		}
		else{//没有,新建一个
				res.json({
					code:1,
					message:'还没有购物车'
				})
		}
		user
		.save()
		.then(newUser=>{
			user.getCart()
			.then(cart=>{
				res.json({
					code:0,
					data:cart
				})			
			})
		})
	})
})	
module.exports = router;
