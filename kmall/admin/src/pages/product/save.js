

//商品分类
import React,{Component} from 'react';
import MyLayout from 'common/layout';
import { connect } from 'react-redux';
import { Table,Breadcrumb,InputNumber } from 'antd';
import { actionCreators } from './store';
import CreateSelect from './category-selector.js';
import UpDateImg from 'common/upload-img';

import RichEditor from 'common/rich-editor';

import {GET_PRODUCT_IMG,UPDATA_PRODUCT_DETAIL_IMAGE} from 'api';


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
/*  componentDidMount(){
    //handleGetCategory,发送ajax请求
    //获取一级分类
    this.props.handleGetOneCategory()
  }*/
  //处理提交事件
  //获取组件信息,然后发送到后台,进行数据更新处理
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		    //console.log('Received values of form: ', values);
		    this.props.handleSave(err,values)
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
    ////传递GetCategoryId方法函数到子组件,获取子组件的分类id
    // pid,id：分类的父id和子id
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
					            <Input 
					            	style={{ width: 400 }}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品描述"
					        >
					          {getFieldDecorator('description', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <Input 
					            	style={{ width: 400 }}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品分类"
					          required={true}
					          validateStatus={this.props.categoryIdvalidataStatus}
					          help={this.props.categoryIdhelp}
					        >	
					        	<CreateSelect 
					        		GetCategoryId = {(parentCategoryId,categoryId)=>{
					        			//console.log(pid,id)
					        			this.props.handleCategory(parentCategoryId,categoryId);
					        		}}
					        	/>

					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品价格"
					        >
					          {getFieldDecorator('price', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <InputNumber
					            	style={{ width: 400 }}
					              formatter={value => `${value}元`}
					              parser={value=>value.replace('元')}

					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品库存"
					        >
					          {getFieldDecorator('stock', {
					            rules: [{
					              required: true, message: '请输入分类',
					            }],
					          })(
					            <InputNumber
					            	style={{ width: 400 }}
					              formatter={value => `${value}件`}
					              parser={value=>value.replace('件')}
					            />
					          )}
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品图片"
					        >
					        <UpDateImg
					        	action={GET_PRODUCT_IMG}
					        	max={3}
					        	//接收子组件传过来的图片地址
					        	getImg={
					        		(fileList)=>{
					        			//console.log('save..',fileList)
					        			this.props.handleImages(fileList);
					        		}
					        	}
					        />
					        </FormItem>
					        <FormItem
					          {...formItemLayout}
					          label="商品详情"
					        >
					        <RichEditor 
					        	url = { UPDATA_PRODUCT_DETAIL_IMAGE }
					        	GetRichEditorValue={
					        		(value)=>{
					        			//console.log(value)
					        			this.props.handleDetail(value);
					        		}
					        	}
					        />
					        </FormItem>
					        <FormItem {...tailFormItemLayout}>
					          <Button 
					          	type="primary"
					          	onClick={this.handleSubmit}
					          	loading={this.props.isAddFeting} 
					          	>提交</Button>
					        </FormItem>
					      </Form>
						</div>
					</MyLayout>
				</div>
			)
	}
}

//映射store 的state
const mapStateToProps = (state)=>{
  console.log(state)
  return{
    categoryIdvalidataStatus:state.get('product').get('categoryIdvalidataStatus'),
    categoryIdhelp:state.get('product').get('categoryIdhelp'),
 /*   name:state.get('category').get('name'),
    pid:state.get('category').get('pid')*/
  }
}
//
const mapDispatchToProps = (dispatch)=>{
  return{
    handleSave:(err,values)=>{
      dispatch(actionCreators.getSaveAction(err,values))
    },
    handleCategory:(parentCategoryId,categoryId)=>{
    	dispatch(actionCreators.GetSetCategoryAction(parentCategoryId,categoryId))
    },
    handleImages:(fileList)=>{
    	dispatch(actionCreators.GetSetImagesAction(fileList))
    },
    handleDetail:(value)=>{
    	dispatch(actionCreators.GetSetDetailAction(value))
    }
  }
}

const ProductAdd=  Form.create()(NormalCategoryForm)

export default connect(mapStateToProps,mapDispatchToProps)(ProductAdd);
