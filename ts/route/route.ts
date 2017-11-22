import { todo } from '../src/store/apis'
import todoRoute from './todoRoute'

let successDate: any = {
  state: 0,
  data: null
}

export default async (req: any, res: any) => {
  switch (req.path) {
    case todo:
      let sendData = await todoRoute(req)
      return res.send(Object.assign({}, successDate, sendData))
  }
}