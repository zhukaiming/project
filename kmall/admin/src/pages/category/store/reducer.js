

// state=defaultState,action
import * as types from './actionType.js';
const { fromJS } = require('immutable');
const defaultState=fromJS({//包装为一个immutable对象Map
	isFeting:false,
    defaultCurrent:1,
    total:200,
    pageSize:10,
    list:[],
	oneCategories:[]
})
//
export default (state=defaultState,action)=>{

	if(action.type == types.ADD_REQUST){
		return state.set('isAddFeting',true)
	}
	if(action.type == types.ADD_DONE){
		return state.set('isAddFeting',false)
	}
	if(action.type == types.GET_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}
	//
	if(action.type == types.GET_PAGE_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}	
	return state;
}