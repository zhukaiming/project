	

//配置
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const publicPath = "/";
//
const getHtmlConfig=(name)=>({
	//模板文件
    template:'./src/view/'+name+'.html',
    filename:name+'.html',
    inject:true,
    hash:true,
    chunks:['common',name]
})
module.exports = {
	mode:'development',
	//入口文件
	entry: {
		'index':'./src/pages/index/index.js',
		'common':'./src/pages/common/index.js',
		'list':'./src/pages/list/index.js',
		'detail':'./src/pages/detail/index.js',
		'cart':'./src/pages/cart/index.js',
		'login':'./src/pages/user-login/index.js',
		'order-confirm':'./src/pages/order-confirm/index.js',
		'register':'./src/pages/user-register/index.js',
		'user-center':'./src/pages/user-center/index.js',
		'update-password':'./src/pages/update-password/index.js',
		'result':'./src/pages/result/index.js'
	},
	//配置额外jq
	externals:{
		'jquery':'window.jQuery'
	},
	//出口文件
	output: {
		//
		filename: 'js/[name].js',
		//path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。
		publicPath:publicPath,
		path: path.resolve(__dirname, 'dist')
	},
	//配置别名
	resolve:{
		alias:{
			pages:path.resolve(__dirname,'./src/pages'),
			images:path.resolve(__dirname,'./src/images'),
			util:path.resolve(__dirname,'./src/util'),
			node_modules:path.resolve(__dirname,'./node_modules'),
			service:path.resolve(__dirname,'./src/service'),
			common:path.resolve(__dirname,'./src/common')
		}
	},
   	module: {//
		rules: [//
			{
	  		test: /\.css$/,
	        use: [
	          {
	            loader: MiniCssExtractPlugin.loader,
	            options: {
	              // you can specify a publicPath here
	              // by default it use publicPath in webpackOptions.output
	              publicPath: '../'
	            }
	          },
	          "css-loader"
	        ]
			},
			//处理图片
			{
				test:/\.(png|jpg|gif|ttf|woff2|woff|eot|svg)\??.*$/,
				use:[{
					loader:'url-loader',
					options:{
						limit:100,//
						name:'resource/[name].[ext]'
						}
					}
				]
			},
		    {//
	        test:/\.js$/,
	        exclude: /(node_modules)/,
	        use: {
	            loader: 'babel-loader',
	            options: {
	                presets: ['env','es2015','stage-3'],
	            }
	        }               
		    },
		    {//对以tpl结尾的文件的处理
	        test:/\.tpl$/,
	        exclude: /(node_modules)/,
	        use: {
	            loader: 'html-loader',
	        }               
		    }		
		]
   	},
   	//自动生成html
	plugins:[
	    new htmlWebpackPlugin(getHtmlConfig('index')),
	    new htmlWebpackPlugin(getHtmlConfig('login')),
	    new htmlWebpackPlugin(getHtmlConfig('register')),
	    new htmlWebpackPlugin(getHtmlConfig('user-center')),
	    new htmlWebpackPlugin(getHtmlConfig('update-password')),
	    new htmlWebpackPlugin(getHtmlConfig('list')),
	    new htmlWebpackPlugin(getHtmlConfig('detail')),
	    new htmlWebpackPlugin(getHtmlConfig('order-confirm','结算')),
	    new htmlWebpackPlugin(getHtmlConfig('cart')),
	    new htmlWebpackPlugin(getHtmlConfig('result')),
	    new CleanWebpackPlugin(['dist']),//清除文件
	    new MiniCssExtractPlugin({
	    	filename:'css/[name].css'
	    })
	],
	devServer:{//实时重新加载页面
		contentBase: './dist',
		port:3002,//跨域代理
		proxy:{//3002端口以/user发送出去的请求,相当于从3000端口发送的请求,就不存在跨域了
			"/user":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true//是否跨域
			},
			"/product":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true//是否跨域
			},
			"/cart":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true//是否跨域
			},
			"/order":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true//是否跨域
			},
			"/shipping":{
				target:'http://127.0.0.1:3000',
				changeOrigin:true//是否跨域
			},
		}		
	}
}
