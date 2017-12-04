import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button, Select, Popconfirm } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { ITInitialState, ITApiListInfo, ITApiDataFetch } from '../interface'
import { FETCH_APIDATA } from '../store/request'
import { GetQueryString } from '../util'

interface UserFormProps extends FormComponentProps {
  apiList: Array<ITApiListInfo>
}
interface ITState {
  // 接口数据id
  _id: string

  // code存储的文件名
  fileName: string
}

const { TextArea } = Input
const Option = Select.Option
const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12, offset: 4 }
}
class ApiData extends React.Component<UserFormProps, ITState> {
  constructor (props: UserFormProps) {
    super(props)
    this.state = {
      _id: null,
      fileName: null
    }
  }
  async componentDidMount () {
    let _id = GetQueryString('id')
    if (!_id) {
      return
    }
    let result = await FETCH_APIDATA({
      type: 'search',
      _id
    })
    if (!result.state) {
      let { apiId, desc, code, fileName } = result.data

      this.props.form.setFieldsValue({
        apiType: apiId
      })
      this.props.form.setFieldsValue({
        apiDesc: desc
      })
      this.props.form.setFieldsValue({
        apiCode: code
      })
      this.setState({
        _id,
        fileName
      })
    }

    //  根据id去读取文件获取接口数据
  }

  public render (): JSX.Element {
    const { getFieldDecorator } = this.props.form
    let { apiList } = this.props
    return (
      <div style={{ paddingTop: 20 }}>
        <FormItem {...formItemLayout} label={'接口类型'}>
          {getFieldDecorator('apiType', {
            rules: [
              {
                required: true,
                message: '请选择接口类型'
              }
            ]
          })(
            <Select style={{ width: '100%' }} onChange={this.handleChange}>
              {apiList.map(
                ({ name, desc, _id }: ITApiListInfo, index: number) => {
                  return (
                    <Option key={index} value={_id}>
                      {desc + ' | ' + name}
                    </Option>
                  )
                }
              )}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={'接口描述'}>
          {getFieldDecorator('apiDesc', {
            rules: [
              {
                required: true,
                message: '请输入接口描述'
              }
            ]
          })(<Input placeholder={'请输入接口描述'} />)}
        </FormItem>
        <FormItem {...formItemLayout} label={'接口数据'}>
          {getFieldDecorator('apiCode', {
            rules: [
              {
                required: true,
                message: '请输入接口数据'
              }
            ]
          })(<TextArea placeholder={'请输入接口数据'} />)}
        </FormItem>
        <FormItem {...formTailLayout}>
          <Button type='primary' htmlType='submit' onClick={this.check}>
            提交
          </Button>{' '}
          <Popconfirm
            title='Are you sure delete this task?'
            onConfirm={this.confirm}
            onCancel={this.cancel}
            okText='Yes'
            cancelText='No'
          >
            <Button type='danger' htmlType='button'>
              删除
            </Button>
          </Popconfirm>
        </FormItem>
      </div>
    )
  }
  cancel = async () => {}
  confirm = async () => {
    let { fileName, _id } = this.state
    let result = await FETCH_APIDATA({
      type: 'delete',
      _id: _id,
      name: fileName
    })
    if (!result.state) {
      location.href = '/api/apilist'
    }
  }

  check = () => {
    let { _id, fileName } = this.state
    this.props.form.validateFields(async err => {
      if (!err) {
        let {
          apiCode,
          apiDesc,
          apiType
        }: any = this.props.form.getFieldsValue()
        let param: ITApiDataFetch = {
          type: 'add',
          apiId: apiType,
          desc: apiDesc,
          code: apiCode
        }
        if (_id) {
          param = {
            ...param,
            type: 'modify',
            _id,
            name: fileName
          }
        }
        let result = await FETCH_APIDATA(param)
        if (!result.state) {
          location.href = '/api/apiDataList?id=' + apiType
        }
      }
    })
  }
  handleChange = () => {}
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
