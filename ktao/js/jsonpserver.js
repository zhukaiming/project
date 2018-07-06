var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
var server = http.createServer(function(req,res){
	res.setHeader("Content-Type","text/html;charset=UTF-8");
	var urlStr = req.url;
	console.log("req url:::",urlStr);
	//如果请求的是/favicon.ico直接返回
	if(urlStr == '/favicon.ico'){
		res.statusCode = 404;
		res.end();
	}

	var prams = url.parse(urlStr,true).query;
	//通常拿到参数后需要根据参数做相应的处理
	//todo......
	var parmsStr = JSON.stringify(prams);
	res.statusCode = 200;
	res.end(parmsStr);

});

server.listen(3000,'127.0.0.1',function(){
	console.log("server is running at http://127.0.0.1:3000");
})