
(function($){
	//
	var $subtn = $('#sum-btn');
	$subtn.on('click',function(){
		//alert('aaa')
		//获取数据
		var passwordreg = /^\w{3,10}$/;
		var password = $("[name = 'password']").val();
		var repassword = $("[name = 'repassword']").val();
		var $err = $('.err');
		//密码
		if(!passwordreg.test(password)){
			$err.eq(0).html('密码为3-10个字符');
			return false;
		}else{
			$err.eq(0).html('');
		}
		//两次密码是否相同
		if(password != repassword){
			$err.eq(1).html('两次密码不相同');
			return false;
		}else{
			$err.eq(1).html('');
		}
		//验证不通过
	})

})(jQuery)
