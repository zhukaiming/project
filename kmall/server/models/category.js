//
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js')
const CategorySchema = new mongoose.Schema({
	//储存的内容

	name:{
		type:String
	},
	pid:{
		type:String
	},
	order:{
		type:Number,
		default:0
	}
},{
	timestamps:true
});

CategorySchema.statics.getPageCategory = function(page,query={}){
	return new Promise((resolve,reject)=>{
		let options = {
			page:page,//需要显示的页码
			model:this,//操作的数据模型
			query:query,//查询条件
			projection:'_id name order pid',//投影
			sort:{order:-1},//排序
		}
	pagination(options)
		.then((data)=>{
			resolve(data);
		})
	})
}
//3用定义好的schema生成model模型
const CategoryModel = mongoose.model('Category',CategorySchema);

module.exports = CategoryModel;