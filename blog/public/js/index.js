

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
})(jQuery)
