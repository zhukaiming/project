
import React,{Component} from 'react';

import { Form, Icon, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import './index.css'
const FormItem = Form.Item;

class NormalLoginForm  extends React.Component{
	constructor(props){
		super(props)

		this.handleSubmit = this.handleSubmit.bind(this)
	}
  handleSubmit(e){
  	//阻止默认行为
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //获取到用户的信息
        //发送ajax请求到服务器
        //console.log('Received values of form: ', values);
        axios({
          method: 'post',
          url: 'http://127.0.0.1:3000/admin/login',
          data:values
        })
        .then((result)=>{
          console.log(result)
        })
        .catch((e)=>{
          console.log(e)
        })      
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="login">
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' },{pattern:/^[a-z|\d]{3,6}$/,message:"用户名为3-6个字符"}]
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' },{pattern:/^[a-z|\d]{3,6}$/,message:"密码为3-6个字符"}],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button 
            type="primary" 
            onClick={this.handleSubmit} 
            loading={false}
            className="login-form-button">
            登录
          </Button>
        </FormItem>
      </Form>
      </div>
    )
  }
}
export default Form.create()(NormalLoginForm);

