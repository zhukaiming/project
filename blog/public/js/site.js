
//新增分类
(function($){
	//删除
	$('.btn-remove').on('click',function(){
		//console.log(this)
		$(this.parentNode).remove()
	})
	//新增
	$('.btn-add').on('click',function(){
		var $dom = $(this).siblings().eq(0).clone(true);
		console.log($dom)
		$(this.parentNode).append($dom);
	})
})(jQuery)
