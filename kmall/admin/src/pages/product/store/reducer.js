

// state=defaultState,action
import * as types from './actionType.js';
const { fromJS } = require('immutable');
const defaultState=fromJS({//包装为一个immutable对象Map
	isAddFeting:false,
	isPageFeting:false,
    current:0,
    total:0,
    pageSize:0,
    list:[],
	oneCategories:[],
	updataName:'',
	updataId:'',
	updataVisible:false,

//
	parentCategoryId:'',
	categoryId:'',
	images:'',
	value:'',
	categoryIdvalidataStatus:'',
	categoryIdhelp:''
})
//
export default (state=defaultState,action)=>{

	if(action.type == types.SAVE_REQUST){
		return state.set('isAddFeting',true)
	}
	if(action.type == types.SAVE_DONE){
		return state.set('isAddFeting',false)
	}
	if(action.type == types.GET_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}

	if(action.type == types.UPDATA_MODAL){
		//immutable对象的set方法
		return state.merge({
			updataVisible:true,
			updataName:action.payload.updataName,
			updataId:action.payload.updataId
		})
	}

	if(action.type == types.CANCEL_OUT){
		//immutable对象的set方法
		return state.set('updataVisible',false)
	}
	
	//
	/*
	if(action.type == types.GET_PAGE_CATEGORIES){
		//immutable对象的set方法
		return state.set('oneCategories',fromJS(action.payload))
	}	
	*/
	if(action.type == types.GET_PAGE_CATEGORIES){

		return state.merge({
			defaultCurrent:action.payload.defaultCurrent,
			total:action.payload.total,
			pageSize:action.payload.pageSize,
			list:fromJS(action.payload.list)//
		})

	}
	
	if(action.type == types.CHANGE_NAME){
		//immutable对象的set方法
		return state.set('updataName',action.payload)
	}
	
	if(action.type == types.UPDATA_CATEGORY){

		return state.merge({
			updataVisible:false
		})

	}


//分类
	if(action.type == types.GET_SET_CATEGORY){
		return state.merge({
			parentCategoryId:action.payload.parentCategoryId,
			categoryId:action.payload.categoryId,

			categoryIdvalidataStatus:'',
			categoryIdhelp:''
		})
	}
//图片
	if(action.type == types.GET_SET_IMAGES){
		return state.set('images',action.payload)
	}
//GET_SET_DETAIL
	if(action.type == types.GET_SET_DETAIL){
		return state.set('value',action.payload)
	}

	if(action.type == types.CATEGORY_ERR){
		return state.merge({
			categoryIdvalidataStatus:'error',
			categoryIdhelp:'请输入所属分类'
		})
	}


	return state;
}