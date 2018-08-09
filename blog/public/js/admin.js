
//后台管理退出
(function($){
	$('#get-out').on('click',function(){
		$.ajax({
			url:'/user/userout',
			dataType:'json',
			type:'get'
		})
		.done(function(result){

			//window.location.reload('/');//
			window.location.href = '/';//刷新当前页面,跳转到首页
		})
		.fail(function(err){
			console.log(err)
		})
	})
})(jQuery)
