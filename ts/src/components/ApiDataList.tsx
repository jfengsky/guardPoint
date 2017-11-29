import * as React from 'react'
import { connect } from 'react-redux'
import { FETCH_APIDATA } from '../store/request'
import { GetQueryString } from '../util'
interface ITProps {}
interface ITState {

  // 接口id
  apiId: string
}

export default class ApiDataList extends React.Component<ITProps, ITState> {
  constructor(props: ITProps){
    super(props)
    this.state = {
      apiId: null
    }
  }
  componentDidMount() {
    let apiId = GetQueryString('id')
    
    // 根据接口id去获取代理数据

    this.setState({
      apiId
    })
  }
  public render(): JSX.Element{
    return (
      <div style={{padding: 20}}>ApiDataList</div>
    )
  }
}