import { todo, apis, apiDatas, selectApiData, trace } from './apis'

import { ITTodoApi, ITApiFetch, ITApiDataFetch } from '../interface'
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

// 待办事项
export const FETCH_TODO = async (data: ITTodoApi) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(todo, option).then((Response: any) => Response.json())
}

// 代理接口
export const FETCH_API = async (data: ITApiFetch) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(apis, option).then((Response: any) => Response.json())
}

// 代理接口数据
export const FETCH_APIDATA = async (data: ITApiDataFetch) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(apiDatas, option).then((Response: any) => Response.json())
}

// 选择的代理数据接口
export const FETCH_SELECT_APIDATA = async (data: any) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(selectApiData, option).then((Response: any) =>
    Response.json()
  )
}

export const FETCH_TRACELOG = async (data: any) => {
  let option: any = {
    method: 'post',
    headers,
    body: JSON.stringify(data)
  }
  return await fetch(trace, option).then((Response: any) => Response.json())
}
