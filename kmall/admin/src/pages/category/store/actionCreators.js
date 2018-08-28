
//封装actions的函数
import * as types from './actionType.js';
import axios from 'axios';
import { message } from 'antd';
import { proajax,setUsername } from 'util';
import { ADD_CATEGORY,GET_CATEGORY } from 'api';

const getAddRequst = ()=>{
	return{
		type:types.ADD_REQUST
	}
}
//
const getAddDone = ()=>{
	return{
		type:types.ADD_DONE
	}
}

const GetCategoriesAction = (payload)=>{
  return{
    type:types.GET_CATEGORIES,
    payload
  }
}
const GetCategoriesAction = (payload)=>{
  return{
    type:types.GET_CATEGORIES,
    payload
  }
}
//
const GetCategoriesPageAction = (payload)=>{
  return{
    type:types.GET_PAGE_CATEGORIES,
    payload
  }
}


//GetCategoryPageAction
//添加
export const getAddAction = (values)=>{
	//返回一个函数
	//函数接收dispatch参数
	//发送ajax请求到服务端
	return (dispatch)=>{
	    dispatch(getAddRequst());
        proajax({
          method: 'post',
          url: ADD_CATEGORY,
          data:values
        })
        .then((result)=>{
          console.log('666',result)
          if(result.code == 0){
            console.log(result)
          }else{
            message.error('获取失败')
          }
          
        })
        .catch((e)=>{
          message.error('网络错误')
          dispatch(getAddDone());
        })      
     }
}

//获取
export const GetCategoryOneAction = ()=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data: {
            pid:0//获取根分类的所有一级分类
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('set...',result)
            console.log('set...',result.data)
            dispatch(GetCategoriesAction(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}
//

export const GetCategoryPageAction = ()=>{
  //返回一个函数
  //函数接收dispatch参数
  //发送ajax请求到服务端
  return (dispatch)=>{
        proajax({
          method: 'get',
          url: GET_CATEGORY,
          data: {
            pid:0//获取根分类的所有一级分类
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('get...',result)
            dispatch(GetCategoriesPageAction(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}