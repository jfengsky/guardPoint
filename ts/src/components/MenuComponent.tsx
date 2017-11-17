import * as React from 'react'
import { connect } from 'react-redux'
import { Menu, Icon } from 'antd'
// import Menu from './components/Menu'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup
interface ITProps {
  route: any
}
interface ITState {
  current: string
}

class MenuComponent extends React.Component<ITProps, ITState> {
  constructor(props: ITProps){
    super(props)
    this.state = {
      current: 'mail'
    }
  }
  public render(): JSX.Element {
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
      >
        <Menu.Item key="mail">
          <Icon type="mail" />Navigation One
        </Menu.Item>
        <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
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

const mapStateToProps = (state: any) => ({
  route: state.route
})

export default connect(mapStateToProps)(MenuComponent)