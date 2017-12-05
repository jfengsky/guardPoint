import * as React from 'react'
import { connect } from 'react-redux'
import { GetQueryString } from '../util'
import {
  Progress,
  Slider,
  Row,
  Col,
  Tag,
  Button,
  Collapse,
  Calendar,
  Alert
} from 'antd'
import * as moment from 'moment'

import {
  ITInitialState,
  ITTodo,
  ITTodoApi,
  ITTodoTagOption
} from '../interface'

import { modify_todo } from '../action'
import { FETCH_TODO } from '../store/request'

const Panel = Collapse.Panel

interface ITProps {
  todoList: Array<ITTodo>
  todoTags: Array<ITTodoTagOption>
  modifyTodo: (value: any) => {}
}
interface ITState {
  inputValue: number
  percent: number
  _id: string
  todoItem: ITTodo
  disSlide: boolean
  countTime: string

  // 是否开始计时
  countDowning: boolean
}

let timeInterval: any = null

let isStoping: boolean = false
let totalSecond: number = 0

class Time extends React.Component<ITProps, ITState> {
  constructor (props: ITProps) {
    super(props)
    this.state = {
      disSlide: false,
      inputValue: 0,
      percent: 0,
      _id: null,
      todoItem: null,
      countDowning: false,
      countTime: '00:00'
    }
  }

  componentDidMount () {
    let _id = GetQueryString('id')
    this.setState({
      _id
    })
    window.onbeforeunload = function (e) {
      return '关闭提示'
    }
  }

  componentWillReceiveProps (nextProps: any) {
    let { todoList } = nextProps
    if (todoList.length) {
      let todoItem: ITTodo
      todoList.some((item: ITTodo) => {
        if (item._id === this.state._id) {
          todoItem = item
          return true
        }
      })
      this.setState({
        todoItem
      })
    }
  }

  componentWillUnmount () {
    clearInterval(timeInterval)
    alert(1111)
  }

  public render (): JSX.Element {
    let {
      inputValue,
      percent,
      _id,
      todoItem,
      disSlide,
      countTime,
      countDowning
    } = this.state

    let isDone: boolean = false

    if (todoItem) {
      isDone = todoItem.done
    }

    if (isDone) {
      disSlide = true
    }

    if (percent === 0) {
      percent = 100
    }

    return (
      <div style={{ padding: 10 }}>
        {isDone && (
          <Alert
            message='任务已完成！'
            description='该任务用时xx分xx秒'
            type='success'
            showIcon
          />
        )}
        <Row>
          <Col span={16}>
            <Slider
              min={1}
              max={45}
              marks={this.getMarks(5, 45)}
              onChange={this.onChange}
              value={inputValue}
              disabled={disSlide}
            />
          </Col>
        </Row>
        <Row style={{ paddingTop: 30 }}>
          <Col span={10}>
            {todoItem && (
              <Collapse defaultActiveKey={['1', '2', '3', '4']}>
                <Panel header='任务' key='1'>
                  <p>
                    <strong>{todoItem.title}</strong>
                  </p>
                </Panel>
                <Panel header='描述' key='2'>
                  <p>{todoItem.desc}</p>
                </Panel>
                <Panel header='时间' key='3'>
                  <Calendar
                    fullscreen={false}
                    value={moment(todoItem.date[1])}
                    onSelect={this.dateSelect}
                  />
                  <p>{todoItem.date.join('~')}</p>
                </Panel>
                <Panel header='标签' key='4'>
                  {todoItem.tag.map((item: number) => {
                    return this.props.todoTags.map(
                      ({ value, color, label }: ITTodoTagOption) => {
                        if (value === item) {
                          return (
                            <Tag key={value} color={color}>
                              {label}
                            </Tag>
                          )
                        }
                      }
                    )
                  })}
                </Panel>
                <Panel header='编辑' key='5'>
                  <div>
                    <a href={`/modify/todo?id=${todoItem._id}`}>修改</a>
                  </div>
                </Panel>
              </Collapse>
            )}
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Progress
              type='circle'
              onClick={this.startCountDown}
              percent={percent}
              status='active'
              format={percent => {
                if (isDone) {
                  return 'Done'
                }
                if (countDowning) {
                  return countTime
                }
                return `${inputValue}:00`
              }}
            />
            <div style={{ paddingTop: 50 }}>
              <Button
                type='primary'
                onClick={this.changTodo}
                icon={isDone ? 'check' : 'clock-circle-o'}
              >
                {isDone ? '完成' : '未完成'}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }

  startCountDown = () => {
    let { inputValue, percent, todoItem, disSlide } = this.state

    if (timeInterval && !isStoping) {
      clearInterval(timeInterval)
      isStoping = true
      return
    }

    if (!todoItem.done && inputValue) {
      if (!totalSecond) {
        totalSecond = inputValue * 60
      }

      if (isStoping) {
        timeInterval = setInterval(() => {
          totalSecond--
          let tempDate = new Date(totalSecond * 1000)
          let percent = Math.ceil(100 - totalSecond / (inputValue * 60) * 100)
          if (percent >= 100) {
            clearInterval(percent)
            totalSecond = 0
            this.setState({
              percent: 100,
              countTime: '00:00'
            })
            return false
          }
          this.setState({
            percent,
            countTime: tempDate.getMinutes() + ':' + tempDate.getSeconds()
          })
        }, 1000)
        isStoping = false
      } else {
        this.setState(
          {
            disSlide: !disSlide,
            countDowning: true
          },
          () => {
            timeInterval = setInterval(() => {
              totalSecond--
              let tempDate = new Date(totalSecond * 1000)
              let percent = Math.ceil(
                100 - totalSecond / (inputValue * 60) * 100
              )
              if (percent >= 100) {
                clearInterval(percent)
                totalSecond = 0
                this.setState({
                  percent: 100,
                  countTime: '00:00'
                })
                return false
              }
              this.setState({
                percent,
                countTime: tempDate.getMinutes() + ':' + tempDate.getSeconds()
              })
            }, 1000)
          }
        )
      }
    }
  }

  getMarks = (step: number, max: number) => {
    let marks: any = {}
    for (let i = 0; i <= max;) {
      marks[String(i)] = i
      i = i + 5
    }
    return marks
  }

  onChange = (value: number) => {
    this.setState({
      inputValue: value,
      countTime: value + ':00'
    })
  }

  dateSelect = (value: any) => {
    // console.log(value)
  }

  changTodo = async (e: any) => {
    let tempTodoItem: any = Object.assign({}, this.state.todoItem, {
      done: !this.state.todoItem.done,
      type: 'modify'
    })
    let data = await FETCH_TODO(tempTodoItem)
    if (!data.state) {
      this.props.modifyTodo(
        Object.assign({}, this.state.todoItem, {
          done: !this.state.todoItem.done
        })
      )
    }
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoTags: state.todoTags
})

const mapDispatchToProps = (dispatch: any) => ({
  modifyTodo: (value: any) => {
    dispatch(modify_todo(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Time)
