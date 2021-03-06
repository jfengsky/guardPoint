import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { ITRoute, ITInitialState, ITTodo, ITApiListInfo } from '../interface'

import { FETCH_TODO, FETCH_API } from '../store/request'
import { UPDATA_TODO, updata_todo, updata_apilist } from '../action'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface ITProps {
  route: Array<ITRoute>
  upDataTodo: (data: Array<ITTodo>) => {}
  upApiList: (data: Array<ITApiListInfo>) => {}
}
interface ITState {
  current: string
}

const MenuItemList = (data: ITRoute): JSX.Element => {
  let {
    name,
    path,
    route,
    icon,
    show
  } = data
  if (show) {
    if (data.route) {
      return (
        <SubMenu key={icon} title={<span><Icon type={icon} />{name}</span>}>
          {
            route.map((item: ITRoute): JSX.Element => (
              <Menu.Item key={item.icon}>
                <Link to={item.path}>
                  <Icon type={item.icon} />{item.name}
                </Link>
              </Menu.Item>
            ))
          }
        </SubMenu>
      )
    }
    return (
      <Menu.Item key={icon}>
        <Link to={path}>
          <Icon type={icon} />{name}
        </Link>
      </Menu.Item>
    )
  }
}

class MenuComponent extends React.Component<ITProps, ITState> {
  constructor(props: ITProps) {
    super(props)
    this.state = {
      current: 'appstore'
    }
  }

  async componentDidMount() {
    let { current } = this.state
    this.props.route.some((item: ITRoute) => {
      if (location.pathname === item.path) {
        current = item.icon
        return true
      }
      if (item.route) {
        item.route.map((secItem: ITRoute) => {
          if (secItem.path === location.pathname) {
            current = secItem.icon
            return true
          }
        })
      }
    })
    this.setState({
      current
    })

    // 获取一些基本数据
    let todoData = await FETCH_TODO({ type: 'search' })
    if (!todoData.state) {
      this.props.upDataTodo(todoData.data)
    }
    let apiData = await FETCH_API({ type: 'search' })
    if (!apiData.state) {
      this.props.upApiList(apiData.data)
    }
  }

  public render(): JSX.Element {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        {
          this.props.route.map(MenuItemList)
        }
      </Menu>
    )
  }
  // handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  handleClick = (e: any) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  route: state.route
})

const mapDispatchToProps = (dispatch: any) => ({
  upDataTodo: (value: Array<ITTodo>): void => {
    dispatch(updata_todo(value))
  },
  upApiList: (value: Array<ITApiListInfo>): void => {
    dispatch(updata_apilist(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuComponent)