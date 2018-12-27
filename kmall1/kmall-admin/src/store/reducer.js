
//合并reducers
// import { combineReducers } from 'redux';
//redux-immutable里面的combineReducers方法生成的store中的state方法是immutable对象
import { combineReducers } from 'redux-immutable';
import { reducer as todolistReducer } from '../pages/todolist/store'
//合并引入的reducer,state下面新建了todolist属性,它存储着对应reducer的数据
//再由store把state返回给组件
export default combineReducers({
	todolist:todolistReducer
})