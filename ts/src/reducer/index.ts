import initialState from './initialState'

import { ITAction, ITInitialState } from '../interface'

export default (state: ITInitialState = initialState, action: ITAction) => {
  switch (action.value) {
    default:
      return state
  }
}