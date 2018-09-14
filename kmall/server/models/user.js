//
const mongoose = require('mongoose');

const ProductModel = require('./product.js');

//购物车列表中的内容
const CartItemSchema = new mongoose.Schema({
	product:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Product'
	},
	count:{
		type:Number,
		default:1
	},
	totalPrice:{
		type:Number,
		default:0
	},
	checked:{
		type:Boolean,
		default:true
	}
})
//购物车列表
const CartSchema = new mongoose.Schema({
	//
	cartList:{
		type:[CartItemSchema]
	},
	allChecked:{
		type:Boolean,
		default:true
	},
	totalCartPrice:{
		type:Number,
		default:0
	}
})
const UserSchema = new mongoose.Schema({
	//储存的内容

	username:{
		type:String
	},
	password:{
		type:String,
	},
	isAdmin:{//是否是管理员
		type:Boolean,
		default:false//默认为普通用户
	},
	email:{
		type:String
	},
	cart:{
		type:CartSchema
	},
	phone:{
		type:String
	}
},{
	timestamps:true
});
//定义getCart方法
UserSchema.methods.getCart = function(){
	return new Promise((resove,reject)=>{
		if(!this.cart){//没有购物车信息,返回空
			resove(null)
		}
		//获取
		let getCartItem = ()=>{
			return this.cart.cartList.map(cartItem=>{//遍历商品
				return ProductModel.findById(cartItem.product,"name price stock images")
				.then(product=>{
					cartItem.product = product
					cartItem.totalPrice = product.price * cartItem.count//
					return cartItem//
				})
			})
		}
		//
		Promise.all(getCartItem())
		.then(cartItems=>{
			this.cart.cartList = cartItems;
			let totalCartPrice = 0;//总价
			//遍历每一个商品价格,求出总价
			cartItems.forEach(item=>{
				totalCartPrice += item.totalPrice;
			});
			this.cart.totalCartPrice = totalCartPrice;
			resove(this.cart);//返回
		})
	})
}
//3用定义好的schema生成model模型
const userModel = mongoose.model('User',UserSchema);//8/10号修改user为User

module.exports = userModel;