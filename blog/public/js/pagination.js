

(function($){

	$.fn.extend({
		pagination:function(){
			var self = this;//$('#page')
			this.on('click','a',function(){
				//console.log(this)
				var $this = $(this);
				var page = 1;
				//获取当前页
				var currentpage = self.find('.active a').html();
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
				var query = self.data('url') + '?page='+page;//
				//获取前台(list)的value
				// var category = $('#category-id').val();//
				var id = self.data('id');
				//如果有value,即有该分类
				if(id){
					query += "&id="+id;//
				}
				$.ajax({
					url:query,
					type:'get',
					dataType:'json'
				})
				.done(function(result){
					if(result.code == 0){
						// buildArticlelist(result.data.docs);
						// buildPage(result.data.list,result.data.page);
						self.trigger('get-data',[result]);//触发事件,传递数据
					}
				})
				.fail(function(err){
					console.log(err)
				})

			})			
		} 
	})
//发送ajax文章列表请求


})(jQuery)
