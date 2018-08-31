
const Router  = require('express').Router;
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const router = Router();
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/product_img/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
//设置权限
router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next();
	}else{
		res.send('请使用管理员登录');
	}
})

//处理新增资源
router.post('/uploadproductImages',upload.single('file'),(req,res)=>{
	//发送FilePath到服务器端
	//
	const FilePath = 'http://127.0.0.1:3000/product_img/'+req.file.filename
	res.send(FilePath)// path: 'public\\resource\\1534175359489.jpg')
})

//
router.post('/updataload',upload.single('upload'),(req,res)=>{
	const FilePath = 'http://127.0.0.1:3000/product_img/'+req.file.filename
	res.json({
	  "success": true,
	  "msg": "error message",
	  "file_path": FilePath	
	})// path: 'public\\resource\\1534175359489.jpg')
})

module.exports = router;
