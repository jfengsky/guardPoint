import { MongoClient, URL, ObjectID } from './dbConfig'

import { ITTodo } from '../src/interface'

const colName: string = 'todoList'

export default {
  save<T>(data: ITTodo) {
    let {
      title,
      desc,
      date,
      tag,
      done
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        collection.insert({ title, desc, date, tag, done, time: new Date().getTime() }, (inerr: any, docs: any) => {
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

  updata<T>(data:ITTodo) {
    let {
      title,
      desc,
      date,
      tag,
      done,
      _id
    } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          _id: new ObjectID(_id)
        }
        collection.update(where,{$set:{title, desc, date, tag, done}}, (inerr:any , docs: any) => {
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
            resolve({data: result})
            // resolve({ data: result.map(({ _id }) => ({ _id })) })
          }
          db.close()
        })
      })
    })
  }
} 