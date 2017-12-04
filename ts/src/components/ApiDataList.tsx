import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Card } from 'antd'
import { FETCH_APIDATA, FETCH_SELECT_APIDATA } from '../store/request'
import { GetQueryString } from '../util'
import { ITInitialState, ITApiListInfo, ITApiFetch } from '../interface'
// import { select_apidata } from '../action'

interface ITApiDataListInfo {
  _id: string
  desc: string
  name: string
  time?: number
}

interface ITProps {
  apiList: Array<ITApiListInfo>
  // selectApiData: (value: any) => {}
}
interface ITState {
  // 接口id
  apiId: string

  apiDataList: Array<ITApiDataListInfo>

  // 当前api选择的数据id
  selectedapiDataId: string
}

class ApiDataList extends React.Component<ITProps, ITState> {
  constructor (props: ITProps) {
    super(props)
    this.state = {
      apiId: null,
      apiDataList: [],
      selectedapiDataId: null
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

    // 去接口获取当前选择的代理数据
    let selectedResult = await FETCH_SELECT_APIDATA({
      type: 'search',
      apiId
    })

    let selectedapiDataId = null
    if (selectedResult.data.length) {
      selectedapiDataId = selectedResult.data[0].apiDataId
    }

    this.setState({
      apiId,
      apiDataList,
      selectedapiDataId
    })
  }
  public render (): JSX.Element {
    let { apiId, apiDataList, selectedapiDataId } = this.state
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
                let style = {}
                if (selectedapiDataId === item._id) {
                  style = {
                    background: '#ecf6fd'
                  }
                }
                return (
                  <Col span={4} key={index}>
                    <Card
                      title={item.name}
                      data-id={item._id}
                      onClick={this.cardClick}
                      style={style}
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
  cardClick = async (e: any) => {
    let apiDataId: any = e.currentTarget.getAttribute('data-id')
    let data = await FETCH_SELECT_APIDATA({
      type: 'modify',
      apiId: this.state.apiId,
      apiDataId
    })
    if (!data.state) {
      this.setState({
        selectedapiDataId: apiDataId
      })
    }
    // this.props.selectApiData()
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

const mapDispatchToProps = (dispatch: any) => ({
  // selectApiData: (value: any) => { dispatch(select_apidata(value)) }
})

export default connect(mapStateToProps)(ApiDataList)
