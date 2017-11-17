import * as React from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import MenuComponent from './components/MenuComponent'

import initialState from './reducer/initialState'
import { ITRoute, ITInitialState } from './interface'

import * as Cmp from './components'

interface ITProps { }
interface ITState { }

const Cmps: any = {...Cmp}

class App extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div className="layout-demo-basic">
        <MenuComponent />
        {
          initialState.route.map( ({path, component, route}: ITRoute, index: number) => {
            if(route) {
              return route.map( (item: ITRoute, routeIndex: number) => <Route key={routeIndex} exact={item.path === '/'} path={item.path} component={Cmps[item.component]} />)
            }
            return <Route key={index} exact={path === '/'} path={path} component={Cmps[component]} />
          })
        }
      </div>
    )
  }
}

export default App