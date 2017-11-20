import * as React from 'react'
import { Form, Input, Icon, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

const FormItem = Form.Item
const { TextArea } = Input
const CheckboxGroup = Checkbox.Group

interface ITfromList {
  name: string
  label: string
  required: boolean
  message: string
  placeholder: string
  Cmp: any
}

const options = [
  { label: 'CR', value: 'Apple' },
  { label: '事件', value: 'Pear' },
  { label: '紧急', value: 'Orange' },
]
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
},{
  name: 'todoDesc',
  label: '描述',
  required: false,
  message: '',
  placeholder: '',
  Cmp: TextArea
}]


interface ITState { }
interface UserFormProps extends FormComponentProps {

}

class ModifyTodo extends React.Component<UserFormProps, ITState> {
  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }
    return (
      <div>
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
          <FormItem label={'任务类型'} {...formItemLayout} >
            <CheckboxGroup options={options} defaultValue={['Pear']} onChange={onChange} />
          </FormItem>
          
        </Form>
      </div>
    )
  }
}

const WrappedModifyTodo = Form.create()(ModifyTodo)

export default WrappedModifyTodo