export interface ITAction {
  type: string
  value?: any
}

interface ITRoute {

  // 路径
  path: string

  // 容器名
  component: string

  // 标题名
  name: string
}

export interface ITInitialState {
  route: Array<ITRoute>
}