import { todo } from './apis'

import { ITTodoApi } from '../interface'
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
}

export const FETCH_TODO = async (data: ITTodoApi) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(todo, option).then( (Response: any) => Response.json())
}