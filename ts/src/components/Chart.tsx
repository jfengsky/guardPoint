import * as React from 'react'
import { Row, Col } from 'antd'
import * as echarts from 'echarts'

interface ITProps {}

interface ITState {}

class Chart extends React.Component<ITProps, ITState> {
  componentDidMount () {
    this.taskfinished()
    this.taskType()
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
            <div id='taskFinished' style={fullStyle} />
          </Col>
          <Col span={12}>
            <div id='taskType' style={fullStyle} />
          </Col>
        </Row>
      </div>
    )
  }

  /**
   * 已完成，未完成任务
   */
  taskfinished = () => {
    const main: any = document.getElementById('taskFinished')
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
          radius: ['40%', '60%'],
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

  /**
   * 任务类型
   */
  taskType = () => {
    const taskType: any = document.getElementById('taskType')
    let myChart = echarts.init(taskType)
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['项目', 'CR', 'bug', '事件', '紧急']
      },
      series: [
        {
          name: '任务类型',
          type: 'pie',
          radius: ['10%', '60%'],
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
}

export default Chart
