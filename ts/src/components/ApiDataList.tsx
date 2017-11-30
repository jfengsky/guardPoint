import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd'
import { FETCH_APIDATA } from '../store/request'
import { GetQueryString } from '../util'
import { ITInitialState, ITApiListInfo, ITApiFetch } from '../interface'

interface ITApiDataListInfo {
  _id: string
  desc: string
  name: string
  time?: number
}

interface ITProps {
  apiList: Array<ITApiListInfo>
}
interface ITState {
  // 接口id
  apiId: string

  apiDataList: Array<ITApiDataListInfo>
}

class ApiDataList extends React.Component<ITProps, ITState> {
  constructor (props: ITProps) {
    super(props)
    this.state = {
      apiId: null,
      apiDataList: []
    }
  }
  async componentDidMount () {
    let apiId = GetQueryString('id')
    if (!apiId) {
      return
    }
    let apiDataList = []
    // 根据接口id去获取代理数据
    let result = await FETCH_APIDATA({
      type: 'search',
      apiId
    })
    if (!result.state) {
      apiDataList = result.data
    }
    this.setState({
      apiId,
      apiDataList
    })
  }
  public render (): JSX.Element {
    let { apiId, apiDataList } = this.state
    let { apiList } = this.props

    let apiInfo: ITApiListInfo = null
    if (apiId && apiList.length) {
      apiList.some((item: ITApiListInfo) => {
        if (item._id === apiId) {
          apiInfo = item
          return true
        }
      })
    }
    return (
      <div style={{ padding: 20 }}>
        {apiInfo && <h3>接口路径:{apiInfo.name}</h3>}
        {apiInfo && <h4>接口描述:{apiInfo.desc}</h4>}
        <div style={{ marginTop: 20 }}>
          <Row gutter={16}>
            {!!apiDataList &&
              !!apiDataList.length &&
              apiDataList.map((item: ITApiDataListInfo, index: number) => {
                let href: string = `/api/apiData?id=${item._id}`
                return (
                  <Col span={4} key={index}>
                    <Card
                      title={item.name}
                      data-id={item._id}
                      onClick={this.cardClick}
                      style={{ background: '#ecf6fd', color: 'green' }}
                    >
                      <a href={href}>{item.desc}</a>
                    </Card>
                  </Col>
                )
              })}
          </Row>
        </div>
      </div>
    )
  }
  cardClick = () => {}
}

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

export default connect(mapStateToProps)(ApiDataList)
