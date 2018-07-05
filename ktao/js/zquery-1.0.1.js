

//基本结构是闭包
(function(window,undefined){
var
	zQuery = function(selector){
		return new zQuery.fn.init(selector);
	};
zQuery.fn = zQuery.prototype = {//让zquery的原型对象等于jQuery.fn
	constructor:zQuery,
	init:function(selector){
		//布尔值是假的情况下传回空的jquery对象
		//trim在低版本使用不了
		selector = zQuery.trim(selector);
		if(!selector){
			return this;
		}
		//如果是函数的话返回有documnent的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
		else if(zQuery.isFunction(selector)){
			document.addEventListener('DOMContentLoaded',function(){
				selector();
			});
			this[0] = document;
			this.length = 1;
			//return this;
		//处理字符串
		}else if(zQuery.isString(selector)){
			//HTML代码处理
			if(zQuery.isHTML(selector)){
			var tmpDOM = document.createElement('div');
			tmpDOM.innerHTML = selector;
			//包装成jQuery对象
			/*for(var i = 0;i<tmpDOM.children.length;i++){
				this[i] = tmpDOM.children[i];
			}
			this.length = tmpDOM.children.length;*/

			//转化为伪数组
			[].push.apply(this,tmpDOM.children);
			//return this;//返回jQuery对象

			//选择器处理
			}else{
				var doms = document.querySelectorAll(selector);
				//包装成jQuery对象
				/*for(var i = 0;i<doms.length;i++){
					this[i] = doms[i];
				}*/
				//转化为伪数组
				//this.length = doms.length;

				[].push.apply(this,doms);

			}
			//处理数组
		}else if(zQuery.isArray(selector)){
			//传进来的数组转化为真数组,由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
			var tmpArr = [].slice.call(selector);
			//转化为伪数组
			[].push.apply(this,tmpArr);
			//return this;
			//返回参数对应的内容的jquery对象
		}else{
			this[0]  = selector;
			this.length = 1;
			//return this;
		}

		return this;
	},
	//原型上的属性和方法
	selector: "",
	length: 0,
	jQuery:'1.0.1',
	push:[].push,
	sort:[].sort,
	splice:[].splice,
	toArray:function() {
		return [].slice.call(this);
	},
	get:function(num){
		if(arguments.length == 1){
			//正数
			if(num>=0){
				return this[num];

			}else{
				return this[this.length + num]
			}
		}else{
			return this.toArray();
		}
	},
	eq:function(num){
		if(arguments.length == 1){
			return zQuery(this.get(num))
		}else{
			return new zQuery;
		}
	},
	first:function(){
		return this.eq(0);
	},
	last:function(){
		return this.eq(-1);
	},
	each:function(fn){
		return zQuery.each(this,fn);
	},
	map:function(fn){
		return zQuery(zQuery.map(this,fn));
	}

}


//

zQuery.extend = zQuery.fn.extend = function(obj){
	for(key in obj){
		//console.log(obj)
		this[key] = obj[key];
	}
}
//zQuery静态方法
zQuery.extend({
		isFunction : function(str){
			return typeof str === 'function';
		},
		isString : function(str){
			return typeof str === 'string';
		},
		isHTML : function(str){
			 return str.charAt(0) == "<" && str.charAt(str.length - 1) == ">" && str.length >=3;
		},
		trim : function(str){
			if(zQuery.isString(str)){
				return str.replace(/^\s+|\s+$/g,'')//用正则去除空格
			}else{
				return str;
			}
		},
		isArray : function(str){
			return  zQuery.isObject(str) && length in str//判断数组，首先是是对象且有长度
		},
		isObject : function(str){
			return typeof str == 'object';
		},
		//each()方法规定为每个匹配元素规定运行的函数,返回 false 可用于及早停止循环
		//静态each方法
		each:function(arr,fn){
			//如果是数组
			if(zQuery.isArray(arr)){
				for(var i = 0;i<arr.length;i++){
					var res = fn.call(arr[i],arr[i]);
					if(res == false){
						break;
					}else if(res == true){
						continue;
					}
				}
			//是对象
			}else{
				for(key in arr){
					var res = fn.call(arr[key],key,arr[key]);
					if(res == false){
						break;
					}else if(res == true){
						continue;
					}
				}
			}
			return arr;
		},
		towords:function(str){//
			return str.match(/\b\w+\b/g);
		},
		addEvent:function(dom,eventName,fn){
			if(dom.addEventListener){
				dom.addEventListener(eventName,fn);
			}else{
				//attachEvent()里面的第一个参数是onclick而不是和addEventListener()中的click一样
				dom.attachEvent('on' + eventName,fn);//低版本浏览器
			}
		},

		//map()把每个元素通过函数传递到当前匹配集合中,生成包含返回值的新的 jQuery 对象
		map:function(arr,fn){
			//
			retarr = [];//如果是数组
			if(zQuery.isArray(arr)){
				for(var i=0;i<arr.length;i++){
					var res = fn(arr[i],i);
					if(res){
						retarr.push(res);
					}
				}
			//
			}else{
				for(key in arr){
					var res = fn(arr[key],key);
					if(res){
						retarr.push(res);
					}
				}
			}
		}
})
//zQuery对象上属性操作方法
zQuery.fn.extend({//原型对象上
	html:function(){
		if(content){//有内容的话,所有的dom都被添加
			this.each(function(){//遍历循环
				this.innerHTML = content;
			});
			return this;
		}else{//为空,输出第一个dom节点
			return this[0].innerHTML;
		}
	},
	text:function(){
		//
		if(content){
			this.each(function(){
				this.innerText = content;
			});
		}else{
			var str = '';
			this.each(function(){
				//this.innerText = content;
				str += this.innerText;
			});
			return str;
		}
	},
	attr:function(ar1,ar2){

		if(zQuery.isObject(ar1)){//设置所有的DOM属性值为对象中的所有值

			this.each(function(){
				var dom = this;
				zQuery.each(ar1,function(attr,val){
					dom.setArrtribute(attr,val);
				});
			})
		}else{
			if(arguments.length == 1){
				return this[0].getArrtribute(ar1);//获取属性

			}else if(arguments.length == 2){
				this.each(function(){
					this.setArrtribute(ar1,ar2);//给ar2设置属性
				});
			
			}
		}
	},
	removeAttr:function(attr){
		if(attr){
			this.each(function(){//
				this.removeAttr(attr);
			});
		}
		return this;

	},
	val:function(val){
		if(val){
			this.each(function(){
				this.value = val;
			})
			return this;
		}else{
			//
			return this[0].value;
		}
	},
	css:function(ar1,ar2){
		//是字符串
		if(zQuery.isString(ar1)){
			if(arguments.length == 1){
				//获取第一个元素的样式
				if(this[0].currentStyle){
					return this[0].currentStyle(ar1);//兼容低级浏览器
				}else{

					return getComputedStyle(this[0],false)[ar1];//

				}
			}else if(arguments.length == 2){////获取第一个元素的样式
				this.each(function(){
					this.style[ar1] = ar2;
				});																																																																																															
			}
			//是对象
		}else if(zQuery.isObject(ar1)){
			this.each(function(){
				for(key in ar1){
					this.style[key] = ar1[key];
				}
			});
		}
		return this;
	},
	hasClass:function(str){
		var res = false;
		
		//有参数
		if(str){
			var reg = eval('/\\b' + str + '\\b/');//eval把字符串转换为对象
			//判断传入的参数是否存在
			//this.className()
			this.each(function(){
				if(reg.test(this.className)){
					res = true;
					return res;
				}	
			});
			
		}
		return res;
	},

	addClass:function(str){
		//
		this.each(function(){
			//如果有参数对应的class不添加
			var $this = zQuery(this);
			if(!$this.hasClass(str)){
				this.className = this.className + '' + str;
			}
		})
		return this;
	},
	removeClass:function(str){
		//如果有参数对应的class
		if(str){
			var names = zQuery.towords(str);
			this.each(function(){
				//
				var $this = zQuery(this);
				for(var i = 0;i<names.length;i++){//
					//
					if(zQuery.hasClass(names)){//如果class中存在names
						//
						var reg = eval('/\\b' + names[i] + '\\b/');//eval将字符串转化为对象
						this.className = this.className.replace(reg,'');
					}				
				}
			});
			//如果传入的参数为空
		}else{
			this.each(function(){
				this.className = '';
			})
		}
		
		return this;
	},
	//该方法检查每个元素中指定的类。如果不存在则添加类，如果已设置则删除之。这就是所谓的切换效果
	toggleClass:function(str){
		//如果参数str存在
		var names = zQuery.towords(str);
		if(str){
			this.each(function(){
				var $this = zQuery(this);
				for(var i = 0;i<names.length;i++){
					if($this.hasClass(names[i])){
						$this.removeClass(names[i]);
					}else{
						$this.addClass(names[i]);
					}
				}
			})
			////如果参数不存在
		}else{
			this.each(function(){
				this.className = '';
			})
		}
		return this;
	}

});

//zQuery对象上DOM操作方法
zQuery.fn.extend({
	empty:function(){
		this.each(function(){
			this.innerHTML = '';
		});
		return this;
	},
	remove:function(selector){
		//
		if(selector){
			//参数不为空
			var doms = document.querySelectorAll(selector);
			this.each(function(){
				for(var i = 0;i<doms.length;i++){
					if(doms[i] == this){
						var parentNode = this.parentNode;
						parentNode.removeChild(this);
					}
				}
			})
			
		}else{//参数为空
			this.each(function(){
				var parentNode = this.parentNode;
				parentNode.removeChild(this);
			})
		}
		return this;
	},
	append:function(source){//在被选元素的后面（仍位于内部）插入指定内容
		if(source){
			//dom节点,jquery对象,HTML代码片段
			var $source = zQuery(source);

			this.each(function(index,value){
				var parentNode = this;
				if(index == 0){//第一个DOM直接插
					$source.each(function(){
						parentNode.appendChild(this);
						
					});
				}else{
					$source.each(function(){
						var dom = this.cloneNode(true);//复制一份当前DOM节点
						parentNode.appendChild(dom);
						
					});
				}
			});
		}
		return this;
	},
	prepend:function(source){//在被选元素的开头（仍位于内部）插入指定内容
		if(source){
			//dom节点，jquery对象，,
			var $source = zQuery(sourcsourcee);
			this.each(function(index,value){
				var parentNode = this;
				if(index == 0){
					$source.each(function(){
						//parentNode.appendChild(this)
						parentNode.insertBefore(this,parentNode.firstChild);//
					})
				}else{
					$source.each(function(){
						var dom = this.cloneNode(true);
						//parentNode.appendChild(dom);
						parentNode.insertBefore(dom,parentNode.firstChild);//
					})
				}
			})
		}
		return this;
	},
	/*
	clone:function(bcopy){
		var res = [];
		this.each(function(){
			var dom = this.cloneNode(true);
			if(bcopy && this.bucketEvent){
				zQuery.each(this,bucketEvent,function(eventName,fnArr){
					zQuery.each(fnArr,function(){
						zQuery(dom).on(eventName,this)
					})
				})
			}
			res.push(dom);
		})
	}
	*/
});
//zQuery对象上事件操作方法
zQuery.fn.extend({

	on:function(eventName,fn){

		this.each(function(){
			//判断dom节点上是否有bucketEvent事件,第一次进入时是没有的,所以先定义一个空对象
			/*{
				eventName:[fn1,fn2,fn3];

			}*/
			if(!this.bucketEvent){//
				this.bucketEvent = {};
			}
			//
			if(!this.bucketEvent[eventName]){//判断对象上有没有eventName这个数组
				this.bucketEvent[eventName] = [];//没有的话创建一个空数组
				this.bucketEvent[eventName].push(fn);
				zQuery.addEvent(this,eventName,function(){//
					zQuery.each(this.bucketEvent[eventName],function(){
						this();
					})
				})
			}
			else{//如果有这个数组的话把fn直接push到数组内
				this.bucketEvent[eventName].push(fn);
			}
			//this.addEventListener(eventName,fn);//向指定元素添加事件句柄
			//zQuery.addEvent(this.eventName,fn);
		});
	},
	off:function(eventName,fnName){
		//
		if(arguments.length == 0){//不传参数
			this.each(function(){
				this.bucketEvent = {};//移除所有事件
			})
		}else if(arguments.length == 1){//传递参数eventName
			this.each(function(){
				if(this.bucketEvent){
					this.bucketEvent[eventName] = [];
				}
			})

		}else if(arguments.length == 2){
			this.each(function(){
				var dom = this;
				if(this.bucketEvent && this.bucketEvent[eventName]){
					zQuery.each(this.bucketEvent[eventName],function(index,fn){
						if(this == fnName){
							dom.bucketEvent[eventName].splice(index,1);
						}
					})
				}
			})
		}
	}

})
zQuery.fn.init.prototype = zQuery.fn;//

window.zQuery = window.$ = zQuery;
})(window)