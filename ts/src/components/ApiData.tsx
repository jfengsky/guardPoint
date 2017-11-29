import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Select } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { ITInitialState, ITApiListInfo, ITApiDataFetch } from '../interface'
import { FETCH_APIDATA } from '../store/request'
import { GetQueryString } from '../util'

interface UserFormProps extends FormComponentProps {
  apiList: Array<ITApiListInfo>
}
interface ITState { }

const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12, offset: 4 },
}
class ApiData extends React.Component<UserFormProps, ITState> {
  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form
    let { apiList } = this.props
    return (
      <div style={{ paddingTop: 20 }}>
        <FormItem {...formItemLayout} label={'接口类型'}>
          {getFieldDecorator('apiType', {
            rules: [{
              required: true,
              message: '请选择接口类型'
            }],
          })(
            <Select style={{ width: '100%' }} onChange={this.handleChange}>
              {
                apiList.map(({ name, desc, _id }: ITApiListInfo, index: number) => {
                  return <Option key={index} value={_id}>{desc + ' | ' + name}</Option>
                })
              }
            </Select>
            )}
        </FormItem>
        <FormItem {...formItemLayout} label={'接口描述'}>
          {getFieldDecorator('apiDesc', {
            rules: [{
              required: true,
              message: '请输入接口描述'
            }],
          })(
            <Input placeholder={'请输入接口描述'} />
            )}
        </FormItem>
        <FormItem {...formItemLayout} label={'接口数据'}>
          {getFieldDecorator('apiCode', {
            rules: [{
              required: true,
              message: '请输入接口数据'
            }],
          })(
            <TextArea placeholder={'请输入接口数据'} />
            )}
        </FormItem>
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
    this.props.form.validateFields(async (err) => {
      if (!err) {
        let { apiCode, apiDesc, apiType }: any = this.props.form.getFieldsValue()
        let param: ITApiDataFetch = {
          type: 'add',
          apiId: apiType,
          desc: apiDesc,
          code: apiCode
        }
        let result = await FETCH_APIDATA(param)
        if(!result.state){
          location.reload()
        }
      }
    })
  }
  handleChange = () => {

  }
}

const ApiDataForm = Form.create()(ApiData)

// export default ApiDataForm

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

const mapDispatchToProps = (dispatch: any) => ({
  // addAPI: (value: ITApiListInfo): void => { dispatch(add_api(value)) }
})
export default connect(mapStateToProps, mapDispatchToProps)(ApiDataForm)