// import { ITApiFetch } from '../src/interface'
import selectedApiDataDB from '../db/selectedApiDataDB'

export default (req: any) => {
  let param: any = req.body
  let { apiId, apiDataId, type } = param
  switch (type) {
    // case 'add':
    //   return selectedApiDataDB.save({ apiId, apiDataId })
    case 'search':
      return selectedApiDataDB.search({ apiId })
    case 'modify':
      return selectedApiDataDB.updata({ apiId, apiDataId })
    // case 'delete':
    //   return apiDB.delete({ _id })
    // case 'modify'
  }
}
