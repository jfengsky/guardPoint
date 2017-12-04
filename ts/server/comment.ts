import apiDB from '../db/apiDB'
import apiDataDB from '../db/apiDataDB'
import selectedApiDataDB from '../db/selectedApiDataDB'
import file from '../db/apiDataFile'

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
    let apiDataResult: any = await apiDataDB.search({
      apiId: apiId.toString()
    })

    let selectedDataResult: any = await selectedApiDataDB.search({
      apiId: apiId.toString()
    })

    let setlectedApiData: any = {}
    apiDataResult.data.some((item: any) => {
      if (item._id.toString() === selectedDataResult.data[0].apiDataId) {
        setlectedApiData = item
        return true
      }
    })

    let readResult = await file.read(setlectedApiData.fileName)
    return readResult
  } else {
    return ''
  }
}
