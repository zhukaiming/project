	(function(win,doc){
		//获取根元素
		var iRoot = doc.getElementsByTagName('html')[0];
		function reFont(){

			//获取宽度
			var iWidth = doc.body.clientWidth || doc.documentElement.clientWidth;
			//根据宽度获取fontsize
			//屏幕宽度/10等于1rem;
			//
			var iFont = iWidth / 10;
			//
			iRoot.style.fontSize = iFont + 'px';			
		}

		//添加事件
		win.addEventListener('resize',reFont,false);
		doc.addEventListener('DOMContentLoaded',reFont,false);
	})(window,document)