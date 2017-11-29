import { ITApiFetch } from '../src/interface'
import apiDB from '../db/apiDB'

export default (req: any) => {
  let param: ITApiFetch = req.body
  let {
    type,
    _id,
    name,
    desc
  } = param
  switch (type) {
    case 'add':
      return apiDB.save({ name, desc })
    case 'search':
      return apiDB.search({ _id })
    case 'modify':
      return apiDB.updata({ _id, name, desc })
    case 'delete':
      return apiDB.delete({ _id })
    // case 'modify'
  }
}