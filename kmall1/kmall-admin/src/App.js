
import React,{Component} from 'react';

import Todolist from './pages/login';

import './App.css';

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
//ES68
//定义组件，必须继承React.Compoment
//处理业务逻辑,容器组件
//
class App extends Component{
	render(){
		return(
			<Router>
				<div className='box'>
					<Route component={ Todolist } />
				</div>
			</Router>
		)
	}
}

export default App;