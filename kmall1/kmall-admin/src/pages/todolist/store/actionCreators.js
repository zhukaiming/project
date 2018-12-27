
//封装actions的函数
import * as types from './actionTypes.js';
import axios from 'axios';
export const getChangeValue = (payload)=>{
	return {
		type:types.CHANGE_VALUE,
		payload
	}
}
export const addItem = ()=>{
	return {
		type:types.ADD_ITEM
	}
}
export const deleteItem = (payload)=>{
	return {
		type:types.DELETE_ITEM,
		payload
	}
}
export const loadInit = (payload)=>{
	return {
		type:types.LOAD_INIT,
		payload
	}
}

export const getDataAction = ()=>{
	//返回一个函数
	//函数接收dispatch参数
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000/')
		.then((data)=>{//发送ajax请求成功获取到data
			const action = loadInit(data.data)
			//console.log(data)
			//console.log(data.data)
			dispatch(action)			
		})
	}
}

