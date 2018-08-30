

const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
const path = require('path');
const fs = require('fs');
//

//获取前台共通数据
let getCommonData = ((options)=>{
	return new Promise((resolve,reject)=>{
	CategoryModel.find({},'_id name')
	.sort({order:1})
	.then(categories=>{//获取分类
		ArticleModel.find({},'_id title click')
		.sort({click:1})
		.limit(10)
		.then(topArticle=>{
			let filePath = path.normalize(__dirname + '/../site.json');//获取文件的路径
			fs.readFile(filePath,(err,data)=>{//读取文件
				let site = {};
				if(!err){
					site = JSON.parse(data);//转化为对象
	
				}
				resolve({
					categories:categories,
					topArticle:topArticle,
					site:site//读取不到的话返回一个空对象
				})				
			})			

			})
		})
	})		
})
module.exports = getCommonData;