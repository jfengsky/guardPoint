import { MongoClient, URL, ObjectID } from './dbConfig'

import { ITApiListInfo } from '../src/interface'

const colName: string = 'apiList'

export default {
  save<T>(data: ITApiListInfo) {
    let {
      name,
      desc
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        collection.insert({ name, desc, time: new Date().getTime() }, (inerr: any, docs: any) => {
          let {
            title,
            _id
          } = docs.ops[0]
          resolve({ data: { _id } })
          db.close()
        })
      })
    })
  },

  updata<T>(data:ITApiListInfo) {
    let {
      name,
      desc,
      _id
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          _id: new ObjectID(_id)
        }
        collection.update(where,{$set:{name, desc}}, (inerr:any , docs: any) => {
          resolve({})
          db.close()
        })
      })
    })
  },

  search<T>(data: any) {
    let {
      _id
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {}
        if (_id) {
          where = { _id }
        }
        collection.find(where).toArray((searchErr: any, result: any) => {
          if (searchErr) {
            reject(`search error`)
          } else {
            resolve({ data: result })
            // resolve({ data: result.map(({ _id }) => ({ _id })) })
          }
          db.close()
        })
      })
    })
  },
  delete<T>(data: any) {
    let {
      _id
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        collection.remove({ _id: new ObjectID(_id) }, (delErr: any, result: any) => {
          if (delErr) {
            reject(`delete pageType error`)
          } else {
            // console.log(result.result)
            resolve({})
          }
          db.close()
        })
      })
    })
  }
} 