import React,{Component} from 'react';
import MyLayout from 'common/layout';
import {
// 使用BrowserRouter时,页面刷新会向服务器发送请求,而HashRouter不会
// 使用BrowserRouter时devServer的historyApiFallback:true	
  BrowserRouter as Router,
  // HashRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
class ProductList extends Component{
	render(){
		return (
				
					<MyLayout>
						<Link to="/product/save">
							<p>add...</p>
						</Link>
					</MyLayout>
			)
	}
}

export default ProductList;