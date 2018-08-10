//
const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
	//储存的内容

	category:{//保证数据唯一性
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	title:{
		type:String
	},
	intro:{
		type:String
	},
	content:{
		type:String
	},
	click:{
		type:Number,
		default:0
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

//3用定义好的schema生成model模型
const ArticleModel = mongoose.model('Article',ArticleSchema);

module.exports = ArticleModel;