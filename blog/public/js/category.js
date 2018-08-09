
//新增分类
(function($){

	//
	$('#sum-btn').on('click',function(){
		var catename = $('[name = "name"]').val();//通过属性选择器获取分类名
		if(catename.trim() == ''){
			$('.err').html('分类名不能为空');
			return false;
		}
	})
})(jQuery)
