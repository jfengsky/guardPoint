import { MongoClient, URL, ObjectID } from './dbConfig'

// import { ITApiListInfo } from '../src/interface'

const colName: string = 'selectedApiData'

export default {
  search<T> (data: any) {
    let { apiId, apiDataId } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          apiId
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
  updata<T> (data: any) {
    let { apiId, apiDataId } = data
    return new Promise((resolve, reject) => {
      MongoClient.connect(URL, (err: any, db: any) => {
        const collection = db.collection(colName)
        let where = {
          apiId
        }

        collection.find(where).toArray((searchErr: any, result: any) => {
          if (!result.length) {
            collection.insert(
              { apiId, apiDataId, time: new Date().getTime() },
              (inerr: any, docs: any) => {
                let { _id } = docs.ops[0]
                resolve({ data: { _id } })
                db.close()
              }
            )
          } else {
            collection.update(
              where,
              { $set: { apiId, apiDataId } },
              (inerr: any, docs: any) => {
                resolve({})
                db.close()
              }
            )
          }
        })
      })
    })
  }
}
