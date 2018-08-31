
//封装actions的函数
import * as types from './actionType.js';
import axios from 'axios';
import { message } from 'antd';
import { proajax } from 'util';
import { GET_CATEGORY,CAHNGE_CATEGORY,UPDATA_ORDER,ADD_PRODUCT } from 'api';

const getSaveRequst = ()=>{
	return{
		type:types.SAVE_REQUST
	}
}
//
const getSaveDone = ()=>{
	return{
		type:types.SAVE_DONE
	}
}

//获取分类分页
const GetCategoriesPage = (payload)=>{
  return{
    type:types.GET_PAGE_CATEGORIES,
    payload
  }
}
//


//
export const GetSetCategoryAction = (parentCategoryId,categoryId)=>{
  return{
    type:types.GET_SET_CATEGORY,
    payload:{
      parentCategoryId,
      categoryId
    }
  }
}

//
export const GetSetImagesAction = (fileList)=>{
  return{
    type:types.GET_SET_IMAGES,
    payload:fileList
  }
}

//GetSetDetailAction

export const GetSetDetailAction = (payload)=>{
  return{
    type:types.GET_SET_DETAIL,
    payload
  }
}
//
export const categoryErr = ()=>{
  return{
    type:types.CATEGORY_ERR
  }
}

//GetCategoryPageAction
//商品提交
export const getSaveAction = (err,values)=>{
	//返回一个函数
	//函数接收dispatch参数
	//发送ajax请求到服务端
  //发送商品数据信息到服务器
	return (dispatch,getState)=>{
	    // dispatch(getAddRequst());
        //getState方法返回的是整个store的数据
        //获取product组件的数据信息
        dispatch(getSaveRequst());
        const state = getState().get('product');
        const categoryId = state.get('categoryId')
        //如果没有选择所属分类
        if(!categoryId){
          dispatch(categoryErr());
          return;
        }
        if(err){
          return;
        }
        console.log('123',state)
        proajax({
          method: 'post',
          url: ADD_PRODUCT,
          data:{
            //
            ...values,
            category:categoryId,
            images:state.get('images'),
            detail:state.get('value')
          }
        })
        .then((result)=>{
          console.log('666',result)
          if(result.code == 0){
            if(result.data){//如果添加的是一级分类,从新更新一级分类
              dispatch(GetoneCategories(result.data));// 
            }
            message.success('提交商品管理成功')
            dispatch(getSaveDone());
          }else{
            message.error('获取失败')
          }
          
        })
        .catch((e)=>{
          message.error('网络错误')
          dispatch(getSaveDone());
        })      
     }
}


//更新order
export const updataOrderAction = (id,pid,newOrder)=>{
  return (dispatch)=>{//获取category上的state
        proajax({
          method: 'put',
          url: UPDATA_ORDER,
          data:{
            id:id,
            pid:pid,
            order:newOrder
          }
        })
        .then((result)=>{
          if(result.code == 0){
            console.log('order...',result.data)
            dispatch(GetCategoriesPage(result.data));//
          }else{
            message.error('获取失败')
          }
        })
        .catch((e)=>{
          message.error('网络错误')
        })      
     }
}

