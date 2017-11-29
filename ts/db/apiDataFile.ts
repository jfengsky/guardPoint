import * as fs from 'fs'
import * as path from 'path'

const filePath = (name:string): string => path.join(__dirname, '/../data/') + name + '.json'

export default {
  async write(name: string, code: string): Promise<any>{
    return new Promise((resolve, reject) => {
      if(!name){
        name = 'p' + new Date().getTime()
      }
      let savePath = filePath(name)
      fs.writeFile(savePath, code, 'utf-8', err => {
        resolve(name)
      })
    })
  },
  async read(name: string): Promise<any>{
    return new Promise((resolve, reject)=> {
      fs.readFile(filePath(name), 'utf-8', (err, data) => {
        resolve(data)
      })
    })
  },
  async delete(name: string): Promise<any>{
    return new Promise( (resolve, reject) => {
      fs.unlink(filePath(name), (err) => {
        resolve()
      })
    })
  }
}