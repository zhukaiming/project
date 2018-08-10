	/*
	//options = {
		page:
		model:
		query:
		projection:
		sort
	}
	*/
	//获取页码
	let pagination = ((options)=>{
		return new Promise((resolve,reject)=>{
			let page = 1;//没有传page的话显示第一页
			//判断传进来的page 是不是数字
			if(!isNaN(parseInt(options.page))){
				page = parseInt(options.page)
			}
			let limit = 2;//每页两条用户信息
			if(page <= 0){
				page = 1;
			}
			////获取总条数count
			options.model.estimatedDocumentCount({})
			.then((count)=>{
				let pages = Math.ceil(count/limit);//获取总页数,总条数/每页的条数
				if(page>pages){
					page = pages;
				}
				if(pages == 0){//如果总页数为0
					page = 1;
				}
				//存放页码
				let list = [];
				for(let i = 1;i<=pages;i++){
					list.push(i);
				}
				//跳过的条数

				let skip = (page-1)*limit;
				let query = options.model.find(options.query,options.projection);
				if(options.populate){//
					for(let i = 0;i<options.populate.length;i++){
						query = query.populate(options.populate[i])
					}
				}


				
				//找到所有user，显示用户的 id username isAdmin
				query
				.sort(options.sort)
				.skip(skip)
				.limit(limit)
				.then((docs)=>{//
					resolve({
					docs:docs,
					page:page*1,//传递当前页,把字符串转化为数字
					list:list,
					pages:pages
				})
				})		
			})				
		})
		
			
	})
	module.exports = pagination;

