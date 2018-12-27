import React,{Component} from 'react';

import './todolist.css';
import { Input,Button,Row,Col,List  } from 'antd';
// import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM } from './store/actionTypes.js'
import { connect } from 'react-redux';
import { actionCreators } from './store';
//ES68
//定义组件，必须继承React.Compoment
//处理业务逻辑,容器组件
//
class Todolist extends Component{
	//必须有一个render
	componentDidMount(){
		// this.props.componentDidMount();
	}
	render(){
		console.log('Todolist render')
		return(
			<div className='box'>
			    <Row>
			      <Col span={18}>
			      <Input  
			      	value = { this.props.value }
			    	 onChange = { this.props.handleChange }
			      /></Col>
			      <Col span={6}><Button 
			      onClick = { this.props.handleAdd }
			      type="primary">提交</Button></Col>
			    </Row>
			    <List 
			    style = {{ marginTop:10 }}
			      bordered
			      dataSource={ this.props.list }
			      renderItem={(item,index) => (<List.Item 
			      	onClick = {()=>{this.props.handleDelete(index)}}
			      	>{item}</List.Item>)}
			    />			
			</div>
		)
	}
}
//
//合并reducer后生成一个todolist对象,传给store,再由store返回给组件
//store里面的state映射到子组件的props
const mapStateProps = (state)=>{
	console.log('111',state)
	return {
		value:state.get('todolist').get('value'),
		list:state.get('todolist').get('list')
	}
}
//映射dispatch到props
const mapdispatchtoprops = (dispatch)=>{
	// console.log('222',dispatch)
	return {
		handleChange:(e)=>{
			const action = actionCreators.getChangeValue(e.target.value);
			dispatch(action)
		},
		handleAdd:()=>{
			const action = actionCreators.addItem();
			dispatch(action)
		},
		handleDelete:(index)=>{
			const action = actionCreators.deleteItem();
			dispatch(action)
		},
		componentDidMount:()=>{
			//action是一个函数
			const action = actionCreators.getDataAction();
			dispatch(action)
		
		}
	}
}			
//connect是让指定的组件可以链接到store
export default connect(mapStateProps,mapdispatchtoprops)(Todolist);