import { ITApiDataFetch } from '../src/interface'
import apiDataDB from '../db/apiDataDB'

import file from '../db/apiDataFile'

export default async (req: any) => {
  let param: ITApiDataFetch = req.body
  let { type, _id, code, desc, apiId, name } = param
  switch (type) {
    case 'add':
      // todo 保存文件
      let fileName: string = await file.write(name, code)
      return apiDataDB.save({ fileName, desc, apiId })
    case 'search':
      if (apiId) {
        return apiDataDB.search({ apiId })
      } else if (_id) {
        let idSearchResult: any = await apiDataDB.search({ _id })

        // 再根据文件名去读取文件内容
        let code = await file.read(idSearchResult.data[0].fileName)
        return {
          data: {
            ...idSearchResult.data[0],
            code
          }
        }
      }
    case 'modify':
      let modifyfileName: string = await file.write(name, code)
      return apiDataDB.updated({ _id, desc, apiId })
    case 'delete':
      let deletefileName: string = await file.delete(name)
      return apiDataDB.delete({ _id })
    // return apiDataDB.delete({_id})
  }
}
