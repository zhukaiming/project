//
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
	//储存的内容

	name:{
		type:String
	},
	path:{
		type:String,
	}

});

//3用定义好的schema生成model模型
const ResourceModel = mongoose.model('Resource',ResourceSchema);//8/10号修改user为User

module.exports = ResourceModel;