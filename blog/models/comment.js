//
const mongoose = require('mongoose');
const pagination = require('../util/pagination.js');
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

CommentSchema.statics.getPageComment = function(req,query={}){
	return new Promise((resolve,reject)=>{
		let options = {
			page:req.query.page,//需要显示的页码
			model:this,//操作的数据模型
			query:query,//查询条件
			projection:'-__v',//投影
			sort:{_id:-1},//排序
			populate:[{ path: 'article', select: 'title' },{ path: 'user', select: 'username' }]
		}
	pagination(options)
		.then((data)=>{
			resolve(data);
		})
	})
}
//3用定义好的schema生成model模型
const CommentModel = mongoose.model('Comment',CommentSchema);//8/10号修改user为User

module.exports = CommentModel;