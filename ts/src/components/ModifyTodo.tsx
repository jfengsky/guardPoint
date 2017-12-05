import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Icon, Checkbox, Button, DatePicker, Switch } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import * as moment from 'moment'

import {
  ITInitialState,
  ITTodo,
  ITTodoApi,
  ITTodoTagOption
} from '../interface'
import { add_todo } from '../action'
import { GetQueryString } from '../util'
import { FETCH_TODO } from '../store/request'

const FormItem = Form.Item
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group
const { MonthPicker, RangePicker } = DatePicker

interface ITfromList {
  name: string
  label: string
  required: boolean
  message: string
  // placeholder: string
  type: string
  option: any
}

interface ITState {
  _id: string
  todoItem: ITTodo
  formList: Array<ITfromList>
  dateList: Array<any>
}

interface UserFormProps extends FormComponentProps {
  addTodo: (value: ITTodo) => {}
  todoTags: Array<ITTodoTagOption>
}

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 }
}

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 }
}

let hasChange: boolean = false

let submitDate: Array<string> = []
const formatDate = 'YYYY-MM-DD'
class TodoEdit extends React.Component<UserFormProps, ITState> {
  constructor (props: any) {
    super(props)

    this.state = {
      _id: null,
      todoItem: null,
      formList: null,
      dateList: []
    }
  }

  componentWillMount () {
    let { todoTags } = this.props

    this.setState({
      formList: [
        {
          name: 'todoTitle',
          label: '任务',
          required: true,
          message: '请输入任务标题',
          type: 'Input',
          option: {
            placeholder: '任务标题'
          }
        },
        {
          name: 'todoDesc',
          label: '描述',
          required: false,
          message: '',
          type: 'TextArea',
          option: {
            placeholder: ''
          }
        },
        {
          name: 'todoTag',
          label: '任务类型',
          required: false,
          message: '',
          type: 'CheckboxGroup',
          option: {
            options: todoTags,
            onChange: this.tagChange
          }
        }
      ]
    })
  }

  componentDidMount () {
    let _id = GetQueryString('id')
    this.setState({
      _id
    })
  }

  componentWillReceiveProps (nextProps: any) {
    let { todoList } = nextProps
    let { formList } = this.state
    if (todoList.length && this.state._id) {
      let todoItem: ITTodo
      todoList.some((item: ITTodo) => {
        if (item._id === this.state._id) {
          todoItem = item
          return true
        }
      })
      submitDate = todoItem.date
      this.setState({
        todoItem,
        dateList: [
          moment(todoItem.date[0], formatDate),
          moment(todoItem.date[1], formatDate)
        ]
      })
    }
  }

  componentDidUpdate () {
    let { todoItem } = this.state
    if (todoItem && !hasChange) {
      for (let key in todoItem) {
        switch (key) {
          case 'title':
            this.props.form.setFieldsValue({
              todoTitle: todoItem[key]
            })
            break
          case 'desc':
            this.props.form.setFieldsValue({
              todoDesc: todoItem[key]
            })
            break
          case 'tag':
            this.props.form.setFieldsValue({
              todoTag: todoItem[key]
            })
            break
          // case 'done':
          //   this.props.form.setFieldsValue({
          //     todoDone: { checked: todoItem[key] }
          //   })
          //   break
        }
      }
      hasChange = true
    }
  }

  public render (): JSX.Element {
    const { getFieldDecorator } = this.props.form

    let { formList, todoItem, dateList } = this.state

    let dateValue: any = dateList

    return (
      <Form layout='horizontal' style={{ paddingTop: 10 }}>
        {formList.map(
          (
            { name, label, required, message, option, type }: ITfromList,
            index: number
          ): JSX.Element => {
            let FormCmp: any
            switch (type) {
              case 'TextArea':
                FormCmp = TextArea
                break
              case 'RangePicker':
                FormCmp = RangePicker
                break
              case 'CheckboxGroup':
                FormCmp = CheckboxGroup
                break
              default:
                FormCmp = Input
                break
            }

            return (
              <FormItem key={index} label={label} {...formItemLayout}>
                {getFieldDecorator(name, {
                  rules: [{ required, message }]
                })(<FormCmp {...option} />)}
              </FormItem>
            )
          }
        )}

        <div className='ant-row ant-form-item'>
          <div className='ant-col-4 ant-form-item-label'>
            <label>任务时间</label>
          </div>
          <div className='ant-col-14 ant-form-item-control-wrapper'>
            <div className='ant-form-item-control '>
              <RangePicker
                value={dateValue}
                onChange={this.dateChange.bind(this)}
                format={formatDate}
              />
            </div>
          </div>
        </div>

        <div className='ant-row ant-form-item'>
          <div className='ant-col-4 ant-form-item-label'>
            <label>是否完成</label>
          </div>
          <div className='ant-col-14 ant-form-item-control-wrapper'>
            <div className='ant-form-item-control '>
              <Switch
                checkedChildren='是'
                unCheckedChildren='否'
                onChange={this.doneChange}
                checked={todoItem ? todoItem.done : false}
              />
            </div>
          </div>
        </div>

        <FormItem {...formTailLayout}>
          <Button type='primary' htmlType='submit' onClick={this.check}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }

  dateChange = (date: any, dateString: any) => {
    submitDate = dateString
    this.setState({
      dateList: [
        moment(dateString[0], formatDate),
        moment(dateString[1], formatDate)
      ]
    })
  }

  tagChange = (value: Array<number>) => {
    console.log(value)
  }

  doneChange = (value: boolean) => {
    let { todoItem } = this.state
    this.setState({
      todoItem: Object.assign({}, todoItem, {
        done: value
      })
    })
  }

  check = () => {
    let { todoItem, _id } = this.state
    this.props.form.validateFields(async err => {
      if (!err) {
        let values: any = this.props.form.getFieldsValue()
        let {
          todoTitle: title,
          todoDesc: desc,
          todoTag: tag
          // todoDone: done
        } = values

        let param: ITTodoApi = {
          type: 'add',
          title,
          desc,
          date: submitDate,
          tag,
          done: todoItem ? todoItem.done : false
        }

        if (_id) {
          param.type = 'modify'
          param._id = _id
        }

        let result = await FETCH_TODO(param)
        if (!result.state) {
          location.href = `/time?id=${result.data._id}`
        }
      }
    })
  }
}

const WrappedTodoEdit = Form.create()(TodoEdit)

interface ITTodoProps {
  todoList: Array<ITTodo>
  todoTags: Array<ITTodoTagOption>
  addTodo: (value: ITTodo) => {}
}

interface ITTodoState {}

class TodoEditCmp extends React.Component<ITTodoProps, ITTodoState> {
  public render (): any {
    return (
      <div>
        <WrappedTodoEdit {...this.props} />
      </div>
    )
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoTags: state.todoTags
})

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (value: ITTodo): void => {
    dispatch(add_todo(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditCmp)
