/**
 * TODO LIST
 * 事情标签 CR 事件 紧急 今天
 * 1.任务名 描述， 结束/提测日期
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { Table, Radio } from 'antd'

import { ITInitialState, ITTodo } from '../interface'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface ITProps {

  todoFilter: string

  todoList: Array<ITTodo>
}
interface ITState { }

const upTodoInfo = (id: string) => {

}

const columns = [{
  title: '任务',
  dataIndex: 'title',
  render: (text: string, record: any) => {
    let href = `/time?id=${record._id}`
    return <a href={href}>{text}</a>
  },
}, {
  title: '标签',
  dataIndex: 'tag',
}]

const rowSelection = {
  onChange: (selectedRowKeys: any, selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === 'Disabled User',
  }),
}

class Home extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div style={{ padding: 10 }}>

        <RadioGroup onChange={this.onChange} defaultValue="active">
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="active">未完成</RadioButton>
          <RadioButton value="completed">结束</RadioButton>
        </RadioGroup>

        <Table
          rowKey="_id"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.props.todoList}
          expandedRowRender={(record: any) => <div><p>{record.desc}</p><p>{record.date}</p></div>}
        />

      </div>
    )
  }

  onChange = () => {

  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoFilter: state.todoFilter
})

export default connect(mapStateToProps)(Home)