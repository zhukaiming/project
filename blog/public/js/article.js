
//新增分类
(function($){

	//
    ClassicEditor
    .create( document.querySelector( '#editor' ),{
    	language:'zh-cn',
    	ckfinder:{
    		uploadUrl:'/Admin/uploadImages'
    	}
    } )
    .then(editor=>{
    	document.editor = editor
    })
    .catch( error => {
        console.error( error );
    } );

    //验证
    /*
    var $err = $('.err')
	$('#sum-btn').on('click',function(){
		var title = $('[name = "title"]').val();//通过属性选择器获取分类名
		var intro = $('[name = "intro"]').val();//通过属性选择器获取分类名
		var content = $('[name = "content"]').val();
		if(title.trim() == ''){
			$err.html('分类名不能为空');
			return false;
		}
		if(intro.trim() == ''){
			$err.html('分类名不能为空');
			return false;
		}
		if(content = '<p></p>'){
			$err.html('分类名不能为空');
			return false;
		}
	})  
	*/
})(jQuery)
