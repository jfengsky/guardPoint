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
}

export interface ITTodoApi {
  type: 'add' | 'search' | 'modify' | 'delete'
  _id?: string
  title?: string
  desc?: string
  date?: Array<string>
  tag?: Array<number>
}

// export interface ITTodoApi extends ITTodo {
//   type: 'add' | 'search' | 'modify' | 'delete'
// }

export interface ITInitialState {

  // todo默认过滤 all active completed
  todoFilter: string

  // 路由列表
  route: Array<ITRoute>

  // todo列表
  todoList: Array<ITTodo>
}