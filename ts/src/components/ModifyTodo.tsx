import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Icon, Checkbox, Button, DatePicker } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { ITInitialState, ITTodo, ITTodoTagOption } from '../interface'
import { add_todo } from '../action'

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
  placeholder: string
  Cmp: any
}

function onChange(checkedValues: any) {
  console.log('checked = ', checkedValues);
}
const formList: Array<ITfromList> = [{
  name: 'todoTitle',
  label: '任务',
  required: true,
  message: '请输入任务标题',
  placeholder: '任务标题',
  Cmp: Input
}, {
  name: 'todoDesc',
  label: '描述',
  required: false,
  message: '',
  placeholder: '',
  Cmp: TextArea
}
  // , {
  //   name: 'todoDate',
  //   label: '任务时间',
  //   required: false,
  //   message: '',
  //   placeholder: '',
  //   Cmp: RangePicker
  // }, {
  //   name: 'todoTag',
  //   label: '任务标签',
  //   required: false,
  //   message: '',
  //   placeholder: '',
  //   Cmp: CheckboxGroup
  // }
]

interface ITState { }

interface UserFormProps extends FormComponentProps {
  addTodo: (value: ITTodo) => {}
  todoTags: Array<ITTodoTagOption>
}

class TodoEdit extends React.Component<UserFormProps, ITState> {

  constructor(props: any) {
    super(props)

    this.state = {
      title: '',
      desc: '',
      date: [],
      tag: []
    }
  }

  public render(): JSX.Element {

    const { getFieldDecorator } = this.props.form

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }

    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 },
    }

    return (
      <Form layout='horizontal' style={{ paddingTop: 10 }}>
        {
          formList.map(({ name, label, required, message, placeholder, Cmp }: ITfromList, index: number): JSX.Element => {
            return (
              <FormItem key={index} label={label} {...formItemLayout} >
                {getFieldDecorator(name, {
                  rules: [{ required, message }],
                })(
                  <Cmp placeholder={placeholder} />
                  )}
              </FormItem>
            )
          })
        }

        <FormItem label={'任务时间'} {...formItemLayout} >
          {getFieldDecorator('todoDate', {
            rules: [{ required: false }],
          })(
            <RangePicker onChange={this.dateChange} />
            )}
        </FormItem>

        <FormItem label={'任务类型'} {...formItemLayout} >
          {getFieldDecorator('todoTag', {
            rules: [{ required: false }],
          })(
            <CheckboxGroup options={this.props.todoTags} onChange={onChange} />
            )}
        </FormItem>

        <FormItem {...formTailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.check}
          >提交</Button>
        </FormItem>
      </Form>
    )
  }

  dateChange = (date: any, dateString: any) => {
    console.log(dateString)
  }

  check = () => {
    this.props.form.validateFields(
      (err) => {
        if (!err) {
          let values: any = this.props.form.getFieldsValue()
          let {
            todoTitle: title,
            todoDesc: desc,
            todoDate,
            todoTag: tag
          } = values
          let date = todoDate.map((item: any) => {
            let dateArray = item.toArray()
            return `${dateArray[0]}-${dateArray[1] + 1}-${dateArray[2]}`
          })
          FETCH_TODO({
            type: 'add',
            title,
            desc,
            date,
            tag,
            done: false
          })
          // this.props.addTodo({
          //   ...this.state
          // })
        }
      }
    )
  }

}

const WrappedTodoEdit = Form.create()(TodoEdit)

interface ITTodoProps {
  todoList: Array<ITTodo>
  todoTags: Array<ITTodoTagOption>
  addTodo: (value: ITTodo) => {}
}

interface ITTodoState { }

class TodoEditCmp extends React.Component<ITTodoProps, ITTodoState>{
  public render(): any {
    return <div><WrappedTodoEdit {...this.props} /></div>
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  todoList: state.todoList,
  todoTags: state.todoTags
})

const mapDispatchToProps = (dispatch: any) => ({
  addTodo: (value: ITTodo): void => { dispatch(add_todo(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoEditCmp)