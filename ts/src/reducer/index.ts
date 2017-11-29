import initialState from './initialState'

import { ITAction, ITInitialState } from '../interface'

import { UPDATA_TODO, MODIFY_TODO, UPAPI_APILIST } from '../action'

export default (state: ITInitialState = initialState, action: ITAction) => {
  switch (action.type) {
    case UPDATA_TODO:
      return Object.assign({}, state, {
        todoList: action.value
      })
    case MODIFY_TODO:
      let {
        todoList
      } = state
      let replaceIndex = null
      todoList.some((item: any, index: number) => {
        if (item._id === action.value._id) {
          replaceIndex = index
          return true
        }
      })
      let tempTodoList = [...todoList]
      tempTodoList.splice(replaceIndex, 1, action.value)
      return Object.assign({}, state, {
        todoList: tempTodoList
      })
    case UPAPI_APILIST:
      return Object.assign({}, state, {
        apiList: action.value
      })
    default:
      return state
  }
}