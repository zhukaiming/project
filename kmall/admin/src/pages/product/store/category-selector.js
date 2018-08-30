import React,{Component} from 'react';
import MyLayout from 'common/layout';
import { proajax } from 'util';
import * as types from './actionType.js';
import { Select  } from 'antd';
import { GET_CATEGORY } from 'api'
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
class CreateSelect extends Component{
	constructor(props){
		super(props)
		this.state={
			levalOneCategories:[],
			levalOneCategoriesId:'',
			levalTwoCategories:[],
			levalTwoCategoriesId:''
		}
		this.handleOneCategory = this.handleOneCategory.bind(this)
		this.handleTwoCategory = this.handleTwoCategory.bind(this)
	}
  componentDidMount(){
  	this.loadOneCategory();
  }
  //选择一级分类一级分类
  loadOneCategory(){
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data:{
          	pid:0
          }
        })
        .then((result)=>{
          if(result.code == 0){
          	this.setState({
          		levalOneCategories:result.data
          	})
          }else{
            	message.error('获取失败')         	
          }
        })
  }
  //
  handleOneCategory(value){
  	this.setState({
  			levalOneCategoriesId:value,
			  levalTwoCategories:[],
			  levalTwoCategoriesId:''
  	},()=>{
  		this.loadTwoCategory()
  	})
  }
  //chuli二级分类
  loadTwoCategory(){
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data:{
          	pid:this.state.levalOneCategoriesId//一级分类的id
          }
        })
        .then((result)=>{
          if(result.code == 0){
          	this.setState({
          		levalTwoCategories:result.data
          	})
          }else{
            	message.error('获取失败')         	
          }
        }) 	
  }
  handleTwoCategory(value){
    this.setState({
        levalTwoCategoriesId:value,
    })
  }
	render(){
	  const {levalOneCategories,levalOneCategoriesId,levalTwoCategories,levalTwoCategoriesId} = this.state;
  	const levalOneOptions = levalOneCategories.map(category => <Option key={levalOneCategoriesId} value = {category.name}>{category.name}</Option>);
  	const levalTwoOptions = levalTwoCategories.map(category => <Option key={levalTwoCategoriesId} value = {category.name}>{category.name}</Option>);
		return (
	      <div>
	        <Select 
	        	style={{ width: 90 }}
	        	onChange={this.handleOneCategory}
	        	>
	          {levalOneOptions}
	        </Select>
	        <Select 
	        	style={{ width: 90 }}
            defaultValue={ levalTwoCategoriesId }
            value={ levalTwoCategoriesId }
	        	onChange={this.handleTwoCategory}
	        	>
	          {levalTwoOptions}
	        </Select>
	      </div>				
			)
	}
}

export default CreateSelect;