import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'
import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as multer from 'multer'

import { ITLayout, layout } from './layout'
import { apiList } from '../src/store/apis'
import route from '../route/route'

const clientPort: number = 3600
const app = express()
const upload = multer()
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./dist'))
app.use(express.static('./public'))

app.get('*', (req, res) => {

  const clientProp: ITLayout = {
    title: 'server',
    content: '',
    __INITSTATE__: {}
  }

  res.send(layout(clientProp))
})

app.post('*', async (req, res) => {
  if (apiList.indexOf(req.path) >= 0) {
    route(req, res)
  } else {
    res.sendStatus(404)
  }
})

app.listen(clientPort, () => console.log(`start client: http://localhost:${clientPort}`))