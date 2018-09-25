

//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const ProductModel = require('../models/product.js');
const router = Router();

//获取购物车数量
router.get('/getCartCount',(req,res)=>{
	if(req.userInfo._id){
		userModel.findById(req.userInfo._id)//获取用户信息
		.then(user=>{//
			//如果有购物车
			if(user.cart){
				let count = 0;
				user.cart.cartList.forEach(item=>{
					count += item.count
				})
				res.json({
					code:0,
					data:count
				})
			}
			//
			else{
				res.json({
					code:0,
					data:0
				})
			}

		})
		.catch(e=>{
			res.json({
				code:1,
				message:'获取购物车信息失败'
			})
		})
	}
	else{
		res.json({
			code:0,
			data:0
		})		
	}

})
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
				return item.product == body.productId;
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
				data:cart
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

//全部选中购物车
router.put('/selectAll',(req,res)=>{
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//
			user.cart.cartList.forEach((item)=>{
				item.checked = true
			})
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

//全部取消购物车
router.put('/unselectAll',(req,res)=>{
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//
			user.cart.cartList.forEach((item)=>{
				item.checked = false
			})
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

//删除单个
router.put('/deleteOne',(req,res)=>{
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//返回一个新的cartList不包括传进来的productId,也就移除了该商品
			let newCartlist = user.cart.cartList.filter(item=>{
				return item.product != req.body.productId
			})
			user.cart.cartList = newCartlist;
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

//删除选中
router.put('/deleteSelect',(req,res)=>{
	//console.log(body)
	userModel.findById(req.userInfo._id)
	.then(user=>{
		if(user.cart){//有购物车
			//返回没有选中的
			let newCartlist = user.cart.cartList.filter(item=>{
				return item.checked = false
			})
			user.cart.cartList = newCartlist;
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
//购物车数量修改
//取消购物车中的一项
router.put('/updataCount',(req,res)=>{
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
					cartItem.count = body.count;
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
