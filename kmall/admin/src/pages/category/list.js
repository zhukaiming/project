

import React,{Component} from 'react';
import MyLayout from 'common/layout';
import CategoryAdd from './add.js';
import { Table,Breadcrumb,Button,Divider,InputNumber   } from 'antd';
import { connect } from 'react-redux';
import './index.css'
import { actionCreators } from './store';
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
import moment  from 'moment';
const columns = [
{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
}, 
{
  title: '分类名称',
  dataIndex: 'name',
  key: 'name',
},
{
  title: '排序',
  dataIndex: 'order',
  key: 'order',
  render:(order,record)=>(
  	<InputNumber defaultValue={order} />
  )
},
{
  title: '操作',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">更新名称</a>
      <Divider type="vertical" />
      <Link to={"/category/"+record.id}>查看子分类</Link>
    </span>
  ),
}
];
const data = [{
  key: '1',
  id:'222',
  order:'45',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
  tags: ['nice', 'developer'],
}, {
  key: '2',
  id:'333',
  order:'45',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
  tags: ['loser'],
}, {
  key: '3',
  id:'444',
  order:'45',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
  tags: ['cool', 'teacher'],
}];
class CategoryList extends Component{
  constructor(props){
    super(props)
      console.log(this.props.match.params)

    this.state={
      pid:this.props.match.params.pid || 0
    }
  }
  componentDidMount(){
    //调用handlegetUser,发送ajax请求
    this.props.handlegetPage(1)
  }
  componentDidUpdate(prevProps, prevState){

    let oldpath = prevProps.location.pathname;
    let newpath = this.props.location.pathname;
    if(oldpath != newpath){
      let newPid = this.props.match.params.pid || 0;
      this.setState({
        pid:newPid
      })
    }
  }
	render(){
    const pid = this.state.pid;
    const data=this.props.list.map((category)=>{
      console.log('kkk',category)//
      return {
        key:category.get('_id'),
        id:category.get('_id'),
        name:category.get('name'),
        order:category.get('order'),
        action:category.get('action')
      }
    }).toJS();//转化immutable对象
		return(
			<MyLayout>
				<div className="list">
          <Breadcrumb>
            <Breadcrumb.Item>Category</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">分类列表</a></Breadcrumb.Item>
          </Breadcrumb>
          <div>父级分类:{ pid }</div>
          <Button type="primary" className="button">
						<Link to="/category/add">新增分类</Link>
					</Button>
					<div>
						<Table 
						 	dataSource={data} 
						 	columns={columns}
              pagination = {
                {
                defaultCurrent:this.props.defaultCurrent,
                total:this.props.total,
                pageSize:this.props.pageSize
                }
              }
              onChange={(pagination)=>{
                console.log('pagination...',pagination)
                this.props.handlegetPage(pagination.current)
              }}
              loading={
                {
                  spinning:this.props.isFeting,
                  tip:'正在加载'
                }
              }
						/>
					</div>
				</div>
			</MyLayout>
			)
	}
}

//映射store的state方法到组件的props上
const mapStateToProps = (state)=>{
  console.log('123..',state)
  return {
/*    [
    username:state.get('user').get('username'),
    isAdmin:false
    ]*/
/*    dataSource:state.get('User').get('dataSource'),
    columns:state.get('User').get('columns'),
    pagination:state.get('User').get('pagination')*/
      isFeting:state.get('user').get('isFeting'),
      current:state.get('user').get('defaultCurrent'),
      total:state.get('user').get('total'),
      pageSize:state.get('user').get('pageSize'),
      list:state.get('user').get('list')
  }
}
//
//映射handlegetcount方法到组件的props上
//组件加载完之后调用handlegetcount方法,通过派发action发送ajax请求
//请求成功之后再次派发一个action去更新store.state数据
const mapDispatchToProps = (dispatch)=>{
  return{
    handlegetPage:(page)=>{
      const action = actionCreators.getPageAction(page);
      dispatch(action)
    }
  }
}

//

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);
