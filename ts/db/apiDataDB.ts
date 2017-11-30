import { MongoClient, URL, ObjectID } from './dbConfig'

import { ITApiListInfo } from '../src/interface'

const colName: string = 'apiData'

export default {
  save<T> (data: any) {
    let { fileName, desc, apiId } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        collection.insert(
          { fileName, desc, apiId, time: new Date().getTime() },
          (inerr: any, docs: any) => {
            let { _id } = docs.ops[0]
            resolve({ data: { _id } })
            db.close()
          }
        )
      })
    })
  },
  search<T> (data: any) {
    let { _id, apiId } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {}
        if (_id) {
          where = {
            _id: new ObjectID(_id)
          }
        }
        if (apiId) {
          where = { apiId }
        }
        collection.find(where).toArray((searchErr: any, result: any) => {
          if (searchErr) {
            reject(`search error`)
          } else {
            resolve({ data: result })
          }
          db.close()
        })
      })
    })
  },
  updated<T> (data: any) {
    let { _id, desc, apiId } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          _id: new ObjectID(_id)
        }
        collection.update(
          where,
          { $set: { apiId, desc } },
          (inerr: any, docs: any) => {
            resolve({})
            db.close()
          }
        )
      })
    })
  },
  delete<T> (data: any) {
    let { _id } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          _id: new ObjectID(_id)
        }
        collection.remove(where, (inerr: any, docs: any) => {
          resolve({})
          db.close()
        })
      })
    })
  }
}
