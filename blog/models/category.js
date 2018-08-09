//
const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
	//储存的内容

	name:{
		type:String
	},
	order:{
		type:Number,
		default:0
	},
});

//3用定义好的schema生成model模型
const CategoryModel = mongoose.model('Category',CategorySchema);

module.exports = CategoryModel;