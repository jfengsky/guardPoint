/**
 * TODO LIST
 * 事情标签 CR 事件 紧急 今天
 * 1.任务名 描述， 结束/提测日期
 */

import * as React from 'react'
import { connect } from 'react-redux'
import { Table, Radio, Tag } from 'antd'

import { ITInitialState, ITTodo, ITTodoTagOption } from '../interface'

import { modify_todo } from '../action'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group

interface ITProps {

  todoFilter: string

  todoList: Array<ITTodo>

  todoTags: Array<ITTodoTagOption>

  modifyTodo: (value: any) => {}
}
interface ITState { }

const upTodoInfo = (id: string) => {

}

// const rowSelection = {
//   onChange: (selectedRowKeys: any, selectedRows: any) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record: any) => ({
//     disabled: record.done
//   }),
// }

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
          // rowSelection={this.rowSelection}
          columns={this.columns()}
          dataSource={this.props.todoList}
          expandedRowRender={(record: any) => <div><p>{record.desc}</p><p>{record.date}</p></div>}
        />
      </div>
    )
  }

  // rowSelection = {
  //   onChange: (selectedRowKeys: any, selectedRows: any) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  //   getCheckboxProps: (record: any) => ({
  //     disabled: false
  //   })
  // }

  columns = () => {

    return [{
      title: '任务',
      dataIndex: 'title',
      render: (text: string, record: any) => {
        let href = `/time?id=${record._id}`
        return <a href={href}>{text}</a>
      },
    }, {
      title: '标签',
      dataIndex: 'tag',
      render: (tag: Array<number>) => {
        let tagName: Array<any> = []
        this.props.todoTags.map(({ label, value, color }: ITTodoTagOption) => {
          tag && tag.length && tag.map((tagItem: number) => {
            if (tagItem === value) {
              tagName.push(<Tag key={value} color={color}>{label}</Tag>)
            }
          })
        })
        return tagName
      }
    }]
  }

  onChange = () => {

  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoFilter: state.todoFilter,
  todoTags: state.todoTags
})

const mapDispatchToProps = (dispatch: any) => ({

  modifyTodo: (value: any) =>{dispatch(modify_todo(value))}
  // addTodo: (value: ITTodo): void => { dispatch(add_todo(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)