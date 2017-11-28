import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { ITInitialState } from '../interface'

interface UserFormProps extends FormComponentProps {

}
interface ITState { }

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}

const apiFormList = [{
  label: '代理接口地址',
  name: 'apiAddress',
  required: true,
  placeholder: '请输入代理接口地址'
}, {
  label: '代理接口描述',
  name: 'apiDesc',
  required: false,
  placeholder: '请输入代理接口地址'
}]

class CreateApi extends React.Component<UserFormProps, ITState> {
  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form
    return (
      <div style={{ paddingTop: 20 }}>
        {
          apiFormList.map(({ label, name, required, placeholder }, index) => {
            return (
              <FormItem {...formItemLayout} label={label}>
                {getFieldDecorator(name, {
                  rules: [{
                    required,
                    message: placeholder
                  }],
                })(
                  <Input placeholder={placeholder} />
                  )}
              </FormItem>
            )
          })
        }
        <FormItem {...formTailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            onClick={this.check}
          >提交</Button>
        </FormItem>
      </div>
    )
  }
  check = () => {

  }
}

const CreateApiForm = Form.create()(CreateApi)

interface ITWrapProps {
  apiList: Array<any>
}
interface ITWrapState {

}

class WrappedCreateApi extends React.Component<ITWrapProps, ITWrapState>{
  public render(): any {
    return <div><CreateApiForm {...this.props} /></div>
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

const mapDispatchToProps = (dispatch: any) => ({
  // addAPI: (value: ITTodo): void => { dispatch(add_todo(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateApi)