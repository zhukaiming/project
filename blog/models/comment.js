//
const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
	//储存的内容

	article:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	content:{
		type:String,
	},
	createdAt:{
		type:Date,
		default:Date.now
	}
});

//3用定义好的schema生成model模型
const CommentModel = mongoose.model('Comment',CommentSchema);//8/10号修改user为User

module.exports = CommentModel;