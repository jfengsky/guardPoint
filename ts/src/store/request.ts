import { todo, apis, apiDatas } from './apis'

import { ITTodoApi, ITApiFetch, ITApiDataFetch } from '../interface'
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
  return await fetch(todo, option).then((Response: any) => Response.json())
}

export const FETCH_API = async (data: ITApiFetch) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(apis, option).then((Response: any) => Response.json())
}

export const FETCH_APIDATA = async (data: ITApiDataFetch) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(apiDatas, option).then((Response: any) => Response.json())
}