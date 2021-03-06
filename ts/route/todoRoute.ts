import { ITTodoApi } from '../src/interface'
import todoDB from '../db/todoDB'

export default (req: any) => {
  let param: ITTodoApi = req.body
  let { type, _id, title, desc, date, tag, branch, done } = param
  switch (type) {
    case 'add':
      return todoDB.save({ _id, title, branch, desc, date, tag, done })
    case 'search':
      return todoDB.search({ _id })
    case 'modify':
      return todoDB.updata({ _id, title, desc, date, tag, done, branch })
    // case 'delete':
    // case 'modify'
  }
}
