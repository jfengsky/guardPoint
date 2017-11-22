import initialState from './initialState'

import { ITAction, ITInitialState } from '../interface'

import { UPDATA_TODO } from '../action'

export default (state: ITInitialState = initialState, action: ITAction) => {
  switch (action.type) {
    case UPDATA_TODO:
      return Object.assign({}, state, {
        todoList: action.value
      })
    default:
      return state
  }
}