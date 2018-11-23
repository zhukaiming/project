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
const ShippingSchema = new mongoose.Schema({
	name:{
		type:String
	},
	province:{
		type:String
	},
	city:{
		type:String
	},
	address:{
		type:String
	},
	phone:{
		type:String
	},
	zip:{
		type:String
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
	},
	shipping:{
		type:[ShippingSchema],
		default:[]
	}
},{
	timestamps:true
});
//定义getCart方法
UserSchema.methods.getCart = function(){
	return new Promise((resove,reject)=>{
		if(!this.cart){//没有购物车信息,返回空
			resove({
				cartList:[]
			})
		}
		//获取
		let getCartItem =  this.cart.cartList.map(cartItem=>{//遍历商品
			console.log(cartItem)
			return ProductModel.findById(cartItem.product,"name price stock images _id")
			.then(product=>{
				console.log('www',product)
				cartItem.product = product;
				cartItem.totalPrice = product.price * cartItem.count;//求总价
				//console.log('qqq',cartItem)
				return cartItem;//

			})
		})
		//
		Promise.all(getCartItem)
		.then(cartItems=>{
			this.cart.cartList = cartItems;
			let totalCartPrice = 0;//总价
			//遍历每一个商品价格,求出总价
			cartItems.forEach(item=>{
				if(item.checked){
					totalCartPrice += item.totalPrice;
				}
			});
			this.cart.totalCartPrice = totalCartPrice;
			//生成新的
			this.cart.cartList = cartItems;

			//判断有没有选中的项目
			//
			let hasNotCheckedItem = cartItems.find((item)=>{
				return item.checked == false;
			})
			//有一项没有
			if(hasNotCheckedItem){
				this.cart.allChecked = false;
			}else{
				this.cart.allChecked = true;
			}
			resove(this.cart);//返回
		})
	})
}

//
UserSchema.methods.getOrderProductList = function(){
	return new Promise((resove,reject)=>{
		if(!this.cart){//没有购物车信息,返回空
			resove({
				cartList:[]
			})
		}
		//
		let checkedCartList = this.cart.cartList.filter(cartItem=>{//筛选出一个新的数组
			return cartItem.checked;
		})
		//获取
		let getCartItem =  checkedCartList.map(cartItem=>{//遍历商品
			console.log(cartItem)
			return ProductModel.findById(cartItem.product,"name price stock images _id")
			.then(product=>{
				// console.log('www',product)
				cartItem.product = product;
				cartItem.totalPrice = product.price * cartItem.count;//求总价
				//console.log('qqq',cartItem)
				return cartItem;//

			})
		})
		//
		Promise.all(getCartItem)
		.then(cartItems=>{
			this.cart.cartList = cartItems;
			let totalCartPrice = 0;//总价
			//遍历每一个商品价格,求出总价
			cartItems.forEach(item=>{
				if(item.checked){
					totalCartPrice += item.totalPrice;
				}
			});
			this.cart.totalCartPrice = totalCartPrice;
			//生成新的
			this.cart.cartList = cartItems;

			resove(this.cart);//返回
		})
	})
}
//3用定义好的schema生成model模型
const userModel = mongoose.model('User',UserSchema);//8/10号修改user为User

module.exports = userModel;