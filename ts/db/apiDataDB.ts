import { MongoClient, URL, ObjectID } from './dbConfig'

import { ITApiListInfo } from '../src/interface'

const colName: string = 'apiData'

export default {
  save<T>(data: any) {
    let {
      fileName,
      desc,
      apiId
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        collection.insert({ fileName, desc, apiId, time: new Date().getTime() }, (inerr: any, docs: any) => {
          let {
            _id
          } = docs.ops[0]
          resolve({ data: { _id } })
          db.close()
        })
      })
    })
  }
}