import * as React from 'react'
import { connect } from 'react-redux'
import { Calendar, Alert, Badge } from 'antd'
// import * as moment from 'moment'
import { ITInitialState, ITTodo } from '../interface'

import { checkDateIsBetween } from '../util'

interface ITProps {
  todoList: Array<ITTodo>
}
interface ITState {}

class CalendarTask extends React.Component<ITProps, ITState> {
  public render (): JSX.Element {
    return (
      <div style={{ padding: 10 }}>
        {/* <Alert message='Info Text' type='info' showIcon /> */}
        {/* <Alert message='Warning' type='warning' showIcon /> */}
        <Calendar dateCellRender={this.dateCellRender} />
      </div>
    )
  }

  getListData = (value: any): Array<any> => {
    let listData: Array<any> = []
    let { todoList } = this.props
    let currentDate = value.toArray()
    let minSeconds = new Date(
      currentDate[0],
      currentDate[1],
      currentDate[2]
    ).getTime()
    if (todoList.length) {
      todoList.map(({ date, _id, title, done, tag }: ITTodo) => {
        let isBetween = checkDateIsBetween(minSeconds, date)
        if (isBetween) {
          let type = done ? 'success' : 'warning'
          listData.push({
            type,
            title,
            _id
          })
        }
      })
    }
    // switch(value.date()) {

    // }

    return listData
  }

  dateCellRender = (value: any) => {
    const listData: Array<any> = this.getListData(value)
    return (
      <ul>
        {listData.map(({ type, title, _id }: any) => {
          return (
            <li key={_id} data-id={_id} onClick={this.taskInfo}>
              <Badge status={type} text={title} />
            </li>
          )
        })}
      </ul>
    )
  }

  taskInfo = (e: any) => {
    let taskId: any = e.currentTarget.getAttribute('data-id')
    location.href = `/time?id=${taskId}`
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList
})

export default connect(mapStateToProps)(CalendarTask)
