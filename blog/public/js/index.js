

(function($){

	//
	var $login = $('#login');
	var $register = $('#register');
	var $userInfo = $('#user-info')
	$('.get-login').on('click',function(){
		$register.hide();
		$login.show();
	})
	$('.get-register').on('click',function(){
		$login.hide();
		$register.show();
	})
	//
	//用户注册处理
	$('#sub-register').on('click',function(){
		//获取数据
		var username = $register.find("[name = 'username']").val();
		var password = $register.find("[name = 'password']").val();
		var respassword = $register.find("[name = 'respassword']").val();
		var errmsg = '';
		//验证
		//用户名
		//用户名必须是字母数字下划线开头,2-9个字符
		if(!/^[a-z][a-z|0-9|_]{2,9}$/i.test(username)){
			errmsg = '用户名必须是字母数字下划线开头,2-9个字符';
		}
		//密码
		if(!/^\w{3,10}$/.test(username)){
			errmsg = '密码为3-10个字符'
		}
		//两次密码是否相同
		if(password != respassword){
			errmsg = '两次密码不相同'
		}

		//验证不通过
		if(errmsg){
			$register.find('.err').html(errmsg);
			return;
		}else{
			//console.log(ok);
			//发送请求
			$.ajax({
				url:'/user/register',
				data:{
					username:username,
					password:password

				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				//console.log(result);
				//注册成功
				if(result.code === 0){
					$('.get-login').trigger('click');
				}else{
					$register.find('.err').html(result.message)
				}
			})
			.fail(function(err){
				console.log(err)
			})
		}

	})

	//用户登录
	$('#sub-btn').on('click',function(){
		//获取数据
		var username = $login.find("[name = 'username']").val();
		var password = $login.find("[name = 'password']").val();
		var errmsg = '';
		var $err = $login.find('.err');
		//验证
		//用户名
		//用户名必须是字母数字下划线开头,2-9个字符
		if(!/^[a-z][a-z|0-9-_]{2,9}$/i.test(username)){
			errmsg = '用户名必须是字母数字下划线开头,2-9个字符';
		}

		//密码
		else if(!/^\w{3,10}$/i.test(username)){
			errmsg = '密码为3-10个字符'
		}

		//验证不通过
		if(errmsg){
			$err.html(errmsg);
			return;
		}else{
			$err.html('');
			//console.log(ok);
			//发送请求
			$.ajax({
				url:'/user/login',
				data:{
					username:username,
					password:password

				},
				type:'post',
				dataType:'json'
			})
			.done(function(result){
				//console.log(result);
				//登入成功
				if(result.code === 0){
					/*
					$login.hide();
					$userInfo.find('span').html(result.data.username)
					$userInfo.show();
					*/
					//刷新页面
					window.location.reload();
				}else{
					$err.html(result.message)
				}
			})
			.fail(function(err){
				console.log(err)
			})
		}

	})
	//退出
	//清除cookies
	$('#userout').on('click',function(){
		$.ajax({
			url:'/user/userout',
			dataType:'json',
			type:'get'
		})
		.done(function(result){
			window.location.reload();
			//window.location.href = '/';
		})
		.fail(function(err){
			console.log(err)
		})
	})
	//
	/*
	$('#get-out').on('click',function(){
		$.ajax({
			url:'/Admin/getout',
			dataType:'json',
			type:'get'
		})
		.done(function(result){
			window.location.reload();
		})
		.fail(function(err){
			console.log(err)
		})
	})
	*/


//发送ajax文章列表请求
	var $articlePage = $('#article-page');
	$articlePage.on('get-data',function(e,result){
		buildArticlelist(result.data.docs);
		buildPage($articlePage,result.data.list,result.data.page);
	})
	$articlePage.pagination();
	/*
	$articlePage.on('click','a',function(){
		//console.log(this)
		var $this = $(this);
		var page = 1;
		//获取当前页
		var currentpage = $('#page').find('.active a').html();
		var lable = $this.attr('aria-label')
		//上一页
		if(lable == 'Previous'){
			page = currentpage - 1;
		}else if(lable == 'Next'){
		//下一页	
			page = currentpage*1 + 1;
		}else{
			page = $(this).html();
		}
		//发送ajax请求
		var query = 'page='+page;//
		//获取前台(list)的value
		var category = $('#category-id').val();//
		//如果有value,即有该分类
		if(category){
			query += "&category="+category;//?
		}
		$.ajax({
			url:'/articles?'+query,
			type:'get',
			dataType:'json'
		})
		.done(function(result){
			if(result.code == 0){
				buildArticlelist(result.data.docs);
				buildPage(result.data.list,result.data.page);
			}
		})
		.fail(function(){

		})

	})
	*/
	function buildPage($page,list,page){
		var html = '';
		//
			html = `
					    <li>
					      <a href="javascript:;" aria-label="Previous">
					        <span aria-hidden="true">&laquo;</span>
					      </a>
					    </li>
					    `
					    for(i in list){
							if(list[i] == page){
							html += `<li class = "active"><a href="javascript:;">${list[i]}</a></li>`
						}else{
							html += `<li><a href="javascript:;">${list[i]}</a></li>`
							}
						}
				html += `
					    <li>
					      <a href="javascript:;" aria-label="Next">
					        <span aria-hidden="true">&raquo;</span>
					      </a>
					    </li>
						`
			//
			$page.find('.pagination').html(html);
			// $('#page .pagination').html(html);
	}
	function buildArticlelist(articles){
		var html = '';
		for(var i = 0;i<articles.length;i++){
		var data = moment(articles[i].createdAt).format('MMMM Do YYYY, h:mm:ss');	
		html += `<div class="panel panel-default content-item">
			  <div class="panel-heading">
			    <h3 class="panel-title">
			    <a href="/view/${articles[i]._id}" class="link" target="_blank">${ articles[i].title }</a>
			    </h3>
			  </div>
			  <div class="panel-body">
				${ articles[i].intro }
			  </div>
			  <div class="panel-footer">
			  	<span class = "glyphicon glyphicon-user"></span>
			  	<span>${ articles[i].user.username }</span>
			  	<span class = "glyphicon glyphicon-th-list"></span>
			  	<span>${ articles[i].category.name }</span>
			  	<span class = "glyphicon glyphicon-time"></span>
			  	<span>${ data }</span>
			  	<span class = "glyphicon glyphicon-eye-open"></span>
			  	<span>${ articles[i].click }</span>
			  </div>
			</div>`
		}
		//
		$('#article-list').html(html);
	}

	function buildCommentlist(comments){
		var html = '';
		for(var i = 0;i<comments.length;i++){
		var createdAt = moment(comments[i].createdAt).format('MMMM Do YYYY, h:mm:ss');

		html += 
			`
			<div class="panel panel-default">
			  <div class="panel-heading">${ comments[i].user.username }发表于${ createdAt }</div>
			  <div class="panel-body">
			    ${ comments[i].content }
			  </div>
			</div>
			`
		}
		$('#comment-list').html(html);	
	}


	//评论
	var $commentPage = $('#comment-page');

	
	$('#comment-btn').on('click',function(){
		var articleId = $('#article-id').val();
		var conmmentContent = $('#comment-content').val();
		if(conmmentContent.trim() == ''){
			$('.err').html('评论不能为空');
			return false;
		}else{
			$('.err').html('')
		}
		
		$.ajax({
			url:'/comment/add',
			dataType:'json',
			type:'post',
			data:{id:articleId,content:conmmentContent}
		})
		.done(function(result){
			//
			//buildCommentlist(result.data.docs)
			//2.
			//buildPage(result.data.list,result.data.page)
			
			if(result.code == 0){
				//1渲染评论列表
				buildCommentlist(result.data.docs);
				//2渲染分页
				buildPage($commentPage,result.data.list,result.data.page)
			}
			
			//console.log('111',result)
		})
		.fail(function(err){
			console.log(err)
		})
	})
	$commentPage.on('get-data',function(e,result){
		buildCommentlist(result.data.docs);
		//2渲染分页
		if(result.data.pages>1){
			buildPage($commentPage,result.data.list,result.data.page);
		}
		
	})
	$commentPage.pagination();	

})(jQuery)
