

//
const Router  = require('express').Router;
const path = require('path');
const fs = require('fs');
const pagination = require('../util/pagination.js')
const ResourceModel = require('../models/resource.js');
const multer = require('multer');

//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/resource/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
const router = Router();


//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})

//显示资源列表内容
router.get('/',(req,res)=>{
	// res.render('Admin/resource')
	let options = {
		page:req.query.page,//需要显示的页码
		model:ResourceModel,//操作的数据模型
		query:{},//查询条件
		projection:'-__v',//投影
		sort:{_id:-1},//排序
	}
	pagination(options)
	.then(data=>{
		res.render('Admin/resource',{
			userInfo:req.userInfo,//用户信息
			resources:data.docs,
			page:data.page,
			pages:data.pages,
			list:data.list
		})		
	})
	
})
//显示新增资源页面
router.get('/add',(req,res)=>{
	// CategoryModel.find({},'_id name')
	// .sort({order:1})
	// .then((categories)=>{
		res.render('Admin/resource-add',{
			userInfo:req.userInfo,//用户信息
		});		
	// })
})
//处理新增资源请求
//req.file 'file'文件的信息
//req.body 将具有文本域数据，如果存在的话  

router.post('/add',upload.single('file'),(req,res)=>{
	let body = req.body;
	new ResourceModel({
		path:'/resource/'+req.file.filename,// path: 'public\\resource\\1534175359489.jpg'
		name:req.body.name
	})
	.save()
	.then(resource=>{//
		res.render('Admin/success',{
		userInfo:req.userInfo,//用户信息
		message:'新增资源成功',
		url:'/resource'//返回到resource页面
		});
	})

})

//删除：删除数据库中的和本地的文件
router.get('/delete/:id',(req,res)=>{
	//获取首页
	let id = req.params.id;
	//console.log(id)
	ResourceModel.findByIdAndRemove(id)
	.then(resource=>{
		//1删除数据库中的
		let filePath = path.normalize(__dirname + '/../public/'+resource.path);//获取文件的路径
		//console.log(filePath)
		//2删除物理文件
		fs.unlink(filePath,(err)=>{
		if(!err){
			res.render('Admin/success',{
			userInfo:req.userInfo,//用户信息
			message:'删除资源成功',
			url:'/resource'			
			});		
		}else{
			res.render('Admin/err',{
			userInfo:req.userInfo,//用户信息
			message:'删除资源失败'
			});			
		}			
		})
	})
	.catch(e=>{
		res.render('Admin/err',{
		userInfo:req.userInfo,//用户信息
		message:'删除数据库资源失败'
		});				
	})

	
})
module.exports = router;
