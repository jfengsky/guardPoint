import { ITTodo, ITApiListInfo } from '../interface'

export const ADD_TODO: string = 'ADD_TODO'
export const add_todo = (value: ITTodo) => ({
  type: ADD_TODO,
  value
})

export const UPDATA_TODO: string = 'UPDATA_TODO'
export const updata_todo = (value: Array<ITTodo>) => ({
  type: UPDATA_TODO,
  value
})

export const MODIFY_TODO: string = 'MODIFY_TODO'
export const modify_todo = (value: any) => ({
  type: MODIFY_TODO,
  value
})

export const ADD_API: string = 'ADD_API'
export const add_api= (value: ITApiListInfo) => ({
  type: ADD_API,
  value
})

export const UPAPI_APILIST: string = 'UPAPI_APILIST'
export const updata_apilist = (value: Array<ITApiListInfo>) =>({
  type: UPAPI_APILIST,
  value
})