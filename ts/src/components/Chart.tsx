import * as React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import * as echarts from 'echarts'

import { ITInitialState, ITTodo, ITTodoTagOption } from '../interface'

interface ITProps {
  todoList: Array<ITTodo>
  todoTags: Array<ITTodoTagOption>
}

interface ITState {}

class Chart extends React.Component<ITProps, ITState> {
  componentDidMount () {
    // let taskNumber = this.formatTask(this.props.todoList)
    // this.taskfinished()
    // this.taskType()
  }

  componentWillReceiveProps (nextProps: any) {
    let { todoList, todoTags } = nextProps

    let { completedNumber, actionNumber } = this.formatTask(todoList)

    this.taskfinished({
      completedNumber,
      actionNumber
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
            <div id='taskFinished' style={fullStyle} />
          </Col>
          <Col span={12}>
            <div id='taskType' style={fullStyle} />
          </Col>
        </Row>
      </div>
    )
  }

  formatTask = (data: any) => {
    let completedNumber: number = 0
    let actionNumber: number = 0
    if (data.length) {
      data.map((item: ITTodo) => {
        if (item.done) {
          completedNumber++
        } else {
          actionNumber++
        }
      })
    }
    return {
      completedNumber,
      actionNumber
    }
  }

  /**
   * 已完成，未完成任务
   */
  taskfinished = ({ completedNumber, actionNumber }: any) => {
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
          name: '待办任务',
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
          data: [
            { value: completedNumber, name: '已完成' },
            { value: actionNumber, name: '未完成' }
          ]
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

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoTags: state.todoTags
})

export default connect(mapStateToProps)(Chart)
