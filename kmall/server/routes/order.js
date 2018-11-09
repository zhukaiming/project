
//
const Router  = require('express').Router;

const userModel = require('../models/user.js');
const ProductModel = require('../models/product.js');
const router = Router();

//获取选中订单商品信息信息
router.get('/orderProductList',(req,res)=>{
	userModel.findById(req.userInfo._id)//获取用户信息
	.then(user=>{//
		//调用getCart方法,获取购物车信息
		user
		.getOrderProductList()
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
			message:'获取订单商品信息失败'
		})
	})
})


module.exports = router;
