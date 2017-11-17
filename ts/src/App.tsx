import * as React from 'react'
import { connect } from 'react-redux'
import MenuComponent from './components/MenuComponent'

interface ITProps { }
interface ITState { }

class App extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div className="layout-demo-basic">
        <MenuComponent />
        
      </div>
    )
  }
}

export default App