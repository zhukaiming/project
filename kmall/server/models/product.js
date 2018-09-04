//
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js')

category
:
"5b862e258e2e0b52609ae6d7"
description
:
"sds"
detail
:
"<p>dsdsds</p>"
images
:
"http://127.0.0.1:3000/product_img/1535764122521.jpg"
name
:
"asaads"
price
:
1
stock
:
2
const ProductSchema = new mongoose.Schema({
	//储存的内容
	category:{//保证数据唯一性
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	description:{
		type:String
	},
	detail:{
		type:String
	},
	images:{
		type:String
	},
	name:{
		type:String
	},
	price:{
		type:Number
	},
	stock:{
		type:Number
	},
	status:{
		type:String,
		default:0//在售
	},
	order:{
		type:Number,
		default:0
	}
},{
	timestamps:true
});

ProductSchema.statics.getPageProduct = function(page,query={}){
	return new Promise((resolve,reject)=>{
		let options = {
			page:page,//需要显示的页码
			model:this,//操作的数据模型
			query:query,//查询条件
			projection:'name price _id status order',//投影
			sort:{order:-1},//排序

		}
	pagination(options)
		.then((data)=>{
			resolve(data);
		})
	})
}
//3用定义好的schema生成model模型
const ProductModel = mongoose.model('Product',ProductSchema);

module.exports = ProductModel;