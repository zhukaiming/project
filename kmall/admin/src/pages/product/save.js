import React,{Component} from 'react';
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { Table,Breadcrumb,InputNumber } from 'antd';
import { actionCreators } from './store';
import CreateSelect from './store/category-selector.js'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
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
const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryForm extends Component{
	constructor(props){
		super(props)
		this.handleSubmit=this.handleSubmit.bind(this)
	}
  componentDidMount(){
    //handleGetCategory,发送ajax请求
    //获取一级分类
    this.props.handleGetOneCategory()
  }
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		    //console.log('Received values of form: ', values);
		    this.props.handleAdd(values)
		  }
		});
	}
	render(){
		console.log('aaa:',this.props.categories)
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 22 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 2,
        },
        sm: {
          span: 16,
          offset: 2,
        },
      }
    };
		return (
				<div>
					<MyLayout>
						<div>
				          <Breadcrumb>
				            <Breadcrumb.Item>Category</Breadcrumb.Item>
				            <Breadcrumb.Item><a href="">分类列表</a></Breadcrumb.Item>
				          </Breadcrumb>
					      <Form onSubmit={this.handleSubmit} className="login-form">
					        <FormItem
					          {...formItemLayout}
					          label="商品名称"
					        >
					          {getFieldDecorator('name', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <Input />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品描述"
					        >
					          {getFieldDecorator('name', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <Input />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品分类"
					        >
					        	<CreateSelect />
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品价格"
					        >
					          {getFieldDecorator('name', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <InputNumber

					              formatter={value => `${value}元`}
					              parser={value=>value.replace()}
					            />
					          )}
					        </FormItem>
					        <FormItem {...tailFormItemLayout}>
					          <Button 
					          	type="primary"
					          	onClick={this.handleSubmit}
					          	loading={this.props.isAddFeting} 
					          	>新增</Button>
					        </FormItem>
					      </Form>
						</div>
					</MyLayout>
				</div>
			)
	}
}
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    isAddFeting:state.get('category').get('isAddFeting'),
    oneCategories:state.get('category').get('oneCategories'),
 /*   name:state.get('category').get('name'),
    pid:state.get('category').get('pid')*/
  }
}
//
const mapDispatchToProps = (dispatch)=>{
  return{
    handleAdd:(values)=>{
      dispatch(actionCreators.getAddAction(values))
    },
    handleGetOneCategory:()=>{
    	dispatch(actionCreators.GetCategoryOneAction())
    }
  }
}

const ProductAdd=  Form.create()(NormalCategoryForm)

export default connect(mapStateToProps,mapDispatchToProps)(ProductAdd);
