import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as multer from 'multer'

import { ITLayout, layout } from './layout'
import { apiList } from '../src/store/apis'
import route from '../route/route'

import { checkIsProxy } from './comment'

const clientPort: number = 8989
const app = express()
const upload = multer()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./dist'))
app.use(express.static('./public'))

// 获取所有代理接口地址

app.get('*', async (req, res) => {
  // 判断是否代理接口地址，如果是，则返回代理数据，如果不是，则返回空
  let ProxyApiData = await checkIsProxy(req.path)

  if (ProxyApiData) {
    res.send(JSON.parse(ProxyApiData))
  } else {
    const clientProp: ITLayout = {
      title: 'server',
      content: '',
      __INITSTATE__: {}
    }

    res.send(layout(clientProp))
  }
})

app.post('*', async (req, res) => {
  let ProxyApiData = await checkIsProxy(req.path)
  if (ProxyApiData) {
    res.send(JSON.parse(ProxyApiData))
  } else {
    if (apiList.indexOf(req.path) >= 0) {
      route(req, res)
    } else {
      res.sendStatus(404)
    }
  }
})

app.listen(clientPort, () =>
  console.log(`start client: http://localhost:${clientPort}`)
)
