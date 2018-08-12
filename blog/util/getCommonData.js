

const CategoryModel = require('../models/category.js');
const ArticleModel = require('../models/article.js');
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
			resolve({
				categories:categories,
				topArticle:topArticle
			})
		})
		})
	})		
})
module.exports = getCommonData;