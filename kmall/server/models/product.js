//
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js')

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
		default:'0'//在售
	},
	order:{
		type:Number,
		default:0
	}
},{
	timestamps:true
});

ProductSchema.statics.getPageProduct = function(page,query={},projection='name price _id status order',sort={order:-1}){
	return new Promise((resolve,reject)=>{
		let options = {
			page:page,//需要显示的页码
			model:this,//操作的数据模型
			query:query,//查询条件
			projection:projection,//投影
			sort:sort//排序
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