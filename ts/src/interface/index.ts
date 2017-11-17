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

  icon?: string

  route?: Array<ITRoute>
}

export interface ITInitialState {
  route: Array<ITRoute>
}