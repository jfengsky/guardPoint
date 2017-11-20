import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
// import Menu from './components/Menu'
import { ITRoute, ITInitialState } from '../interface'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface ITProps {
  route: Array<ITRoute>
}
interface ITState {
  current: string
}

const MenuItemList = (data: ITRoute): JSX.Element => {
  let {
    name,
    path,
    route,
    icon
  } = data
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

class MenuComponent extends React.Component<ITProps, ITState> {
  constructor(props: ITProps) {
    super(props)
    this.state = {
      current: 'appstore'
    }
  }

  componentDidMount(){
    let { current } = this.state
    this.props.route.some( (item: ITRoute) => {
      if(location.pathname === item.path){
        current = item.icon
        return true
      }
      if(item.route){
        item.route.map( (secItem: ITRoute) => {
          if(secItem.path === location.pathname ){
            current = secItem.icon
            return true
          }
        })
      }
    })
    this.setState({
      current
    })
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

export default connect(mapStateToProps)(MenuComponent)