export interface ITAction {
  type: string
  value?: any
}

export interface ITRoute {

  // 路径
  path: string

  // 容器名
  component: string

  // 标题名
  name: string

  // 图标，标记
  icon?: string

  // 子路由
  route?: Array<ITRoute>

  // 是否在导航栏显示
  show: boolean
}

export interface ITTodo {

  _id?: string

  // 任务标题
  title: string

  // 任务描述
  desc: string,

  // 任务开始，结束时间
  date: Array<string>,

  // 任务标签
  tag: Array<number>

  // 是否完成
  done: boolean
}

export interface ITTodoApi {
  type: 'add' | 'search' | 'modify' | 'delete'
  _id?: string
  title?: string
  desc?: string
  date?: Array<string>
  tag?: Array<number>
  done?: boolean
}

export interface ITApiFetch {
  type: 'add' | 'search' | 'modify' | 'delete'
  _id?: string
  name?: string
  desc?: string
}

export interface ITApiDataFetch {
  type: 'add' | 'search' | 'modify' | 'delete'
  name?: string
  apiId?: string
  _id?: string
  code?: string
  desc?: string
}

// export interface ITTodoApi extends ITTodo {
//   type: 'add' | 'search' | 'modify' | 'delete'
// }

export interface ITTodoTagOption {

  // 标签名
  label: string

  // 标签值
  value: number

  // 颜色
  color: string
}

export interface ITApiListInfo {
  _id?: string

  // 接口名 路径
  name: string

  // 接口描述
  desc: string
}

export interface ITInitialState {

  // 接口列表
  apiList: Array<ITApiListInfo>

  // 任务标签
  todoTags: Array<ITTodoTagOption>

  // todo默认过滤 all active completed
  todoFilter: string

  // 路由列表
  route: Array<ITRoute>

  // todo列表
  todoList: Array<ITTodo>
  
}