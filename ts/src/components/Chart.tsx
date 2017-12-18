import * as React from 'react'
import { Row, Col } from 'antd'
import * as echarts from 'echarts'

interface ITProps {}

interface ITState {}

class Chart extends React.Component<ITProps, ITState> {
  componentDidMount () {
    const main: any = document.getElementById('main')
    let myChart = echarts.init(main)
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['已完成', '未完成']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [{ value: 335, name: '已完成' }, { value: 310, name: '未完成' }]
        }
      ]
    })
  }
  public render (): JSX.Element {
    const fullStyle = {
      width: '100%',
      height: '100%'
    }
    return (
      <div>
        <Row>
          <Col span={12}>
            <div id='main' style={fullStyle} />
          </Col>
          <Col span={12}>222</Col>
        </Row>
      </div>
    )
  }
}

export default Chart
