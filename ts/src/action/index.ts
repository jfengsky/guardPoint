import { ITTodo } from '../interface'

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