//
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Cookies = require('cookies');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
//1链接数据库
mongoose.connect('mongodb://localhost:27017/kmall',{useNewUrlParser:true});
const db = mongoose.connection;//
db.on('error',(err)=>{
	throw err;
});
db.once('open', function(){

  	console.log('open connect...')

})

const app = express();//

//跨域配置
app.use((req,res,next)=>{
	res.append("Access-Control-Allow-Origin","http://localhost:8080");
	res.append("Access-Control-Allow-Credentials",true);
	res.append("Access-Control-Allow-Methods","GET, POST, PUT,DELETE");
	res.append("Access-Control-Allow-Headers", "Content-Type, X-Requested-With,X-File-Name"); 
	next();
})

//options请求处理
app.use((req,res,next)=>{
	if(req.method == 'options'){
		res.send('options ok..')
	}else{
		next();
	}
})
//设置cookies中间件
//目的在服务器端和客户端保存用户的状态信息
/*
app.use((req,res,next)=>{
	req.cookies = new Cookies(req,res);
	//console.log(req.cookies.get('userInfo'));//获取cookies(用户信息)
	req.userInfo = {};
	let userInfo = req.cookies.get('userInfo');
	if(userInfo){//如果有用户cookies的信息
		try{
			req.userInfo = JSON.parse(userInfo);//转化为对象
		}catch(e){

		}
	}
	next();
})
*/
//设置session

app.use(session({
	name:'kmall',
  	secret: 'keyboard cat',
  	resave: true,
  	saveUninitialized: true,
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))
//加密用户信息
app.use((req,res,next)=>{
	//console.log(req.cookies.get('userInfo'));//获取cookies(用户信息)
	req.userInfo = req.session.userInfo || {};
	next();
})

//3:配置静态资源
app.use(express.static('public'));//托管静态文件

//4:添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//5:处理路由
app.use("/Admin",require('./routes/Admin.js'));


app.use("/",require('./routes/index.js'));
app.use("/user",require('./routes/user.js'));
app.use("/category",require('./routes/category.js'));
app.use("/article",require('./routes/article.js'));
app.use("/comment",require('./routes/comment.js'));
app.use("/product",require('./routes/product.js'));
app.use("/resource",require('./routes/resource.js'));
app.use("/home",require('./routes/home.js'));
app.use("/cart",require('./routes/cart.js'));

app.use("/order",require('./routes/order.js'));
app.use("/shipping",require('./routes/shipping.js'));

// app.use("/wish",require('./routes/wish.js'));
app.listen(3000,()=>{
	console.log("server running at 127.0.0.1:3000")
})
