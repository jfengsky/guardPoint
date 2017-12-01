import apiDB from '../db/apiDB'
import apiDataDB from '../db/apiDataDB'

import { ITInitialState, ITApiListInfo, ITApiDataFetch } from '../src/interface'

export const checkIsProxy = async (path: string) => {
  let result: any = await apiDB.search({})
  let apiId: object = null
  result.data.some(({ _id, name }: any): boolean => {
    if (name === path) {
      apiId = _id
      return true
    }
  })
  if (apiId) {
    let apiDataResult = await apiDataDB.search({
      apiId: apiId.toString()
    })

    return 'aaaa'
  } else {
    return ''
  }
}
