import { ITApiDataFetch } from '../src/interface'
import apiDataDB from '../db/apiDataDB'

import file from '../db/apiDataFile'

export default async (req: any) => {
  let param: ITApiDataFetch = req.body
  let {
    type,
    _id,
    code,
    desc,
    apiId,
    name
  } = param
  switch(type) {
    case 'add':
      // todo 保存文件
      let fileName: string = await file.write(name, code)
      return apiDataDB.save({fileName, desc, apiId})
      // return apiDataDB.save({name, desc})
    // case 'search':
    //   return apiDataDB.search({_id})
    // case 'modify':
    //   return apiDataDB.updata({_id, name, desc})
    // case 'delete':
    //   return apiDataDB.delete({_id})
  }
}