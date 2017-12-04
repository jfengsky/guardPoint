import { todo, apis, apiDatas, selectApiData } from '../src/store/apis'
import todoRoute from './todoRoute'
import apiRoute from './apiRoute'
import apiDataRoute from './apiDataRoute'
import selectApiDataRoute from './selectApiDataRoute'

let successDate: any = {
  state: 0,
  data: null
}

export default async (req: any, res: any) => {
  let sendData = {}
  switch (req.path) {
    case todo:
      sendData = await todoRoute(req)
      return res.send(Object.assign({}, successDate, sendData))
    case apis:
      sendData = await apiRoute(req)
      return res.send(Object.assign({}, successDate, sendData))
    case apiDatas:
      sendData = await apiDataRoute(req)
      return res.send(Object.assign({}, successDate, sendData))
    case selectApiData:
      sendData = await selectApiDataRoute(req)
      return res.send(Object.assign({}, successDate, sendData))
  }
}
