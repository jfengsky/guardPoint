import { ITTodoApi } from '../src/interface'
import todoDB from '../db/todoDB'

export default (req: any) => {
  let param: ITTodoApi = req.body
  let {
    type,
    _id,
    title,
    desc,
    date,
    tag
  } = param
  switch(type) {
    case 'add':
      return todoDB.save({_id, title, desc, date, tag})
    case 'search':
    return todoDB.search({_id})
    // case 'delete':
    // case 'modify'
  }
}