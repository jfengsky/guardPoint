import * as React from 'react'
import { connect } from 'react-redux'

interface ITProps { }
interface ITState { }

class App extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div>
        App
      </div>
    )
  }
}

export default App