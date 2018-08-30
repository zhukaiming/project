//
const mongoose = require('mongoose');

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
	phone:{
		type:String
	}
},{
	timestamps:true
});

//3用定义好的schema生成model模型
const userModel = mongoose.model('User',UserSchema);//8/10号修改user为User

module.exports = userModel;