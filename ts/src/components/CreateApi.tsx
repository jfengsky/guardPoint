import * as React from 'react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

import { ITInitialState, ITApiListInfo, ITApiFetch } from '../interface'
import { add_api } from '../action'
import { FETCH_API } from '../store/request'
import { GetQueryString } from '../util'

interface ITFormData {
  label: string
  name: string
  required: boolean
  placeholder?: string
  value?: string
}

interface UserFormProps extends FormComponentProps { }
interface ITState {
  _id: string
  apiFormList: Array<ITFormData>
}

const FormItem = Form.Item
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8 },
}
const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
}

let hasGetapiList = false

class CreateApi extends React.Component<UserFormProps, ITState> {

  constructor(props: UserFormProps) {
    super(props)
    this.state = {
      _id: null,
      apiFormList: [{
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
    }
  }

  componentDidMount() {
    let _id = GetQueryString('id')
    this.setState({
      _id
    })
  }

  componentWillReceiveProps(nextProps: any) {
    let {
      _id,
      apiFormList
    } = this.state
    let { apiList } = nextProps
    if (!hasGetapiList && apiList.length) {
      let apiInfo: ITApiListInfo = null
      apiList.some((item: ITApiListInfo) => {
        if (item._id === _id) {
          apiInfo = item
          return true
        }
      })
      apiFormList.map((item: ITFormData) => {
        switch (item.name) {
          case 'apiAddress':
            this.props.form.setFieldsValue({
              apiAddress: apiInfo.name
            })
            break
          case 'apiDesc':
            this.props.form.setFieldsValue({
              apiDesc: apiInfo.desc
            })
            break
        }
      })
      hasGetapiList = true
    }

  }

  public render(): JSX.Element {
    const { getFieldDecorator } = this.props.form
    let {
      _id,
      apiFormList
    } = this.state
    return (
      <div style={{ paddingTop: 20 }}>
        {
          apiFormList.map(({ label, name, required, placeholder, value }, index: number) => {
            return (
              <FormItem {...formItemLayout} label={label} key={index}>
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
    let { _id } = this.state
    this.props.form.validateFields(async (err) => {
      if (!err) {
        let value: any = this.props.form.getFieldsValue()
        let param: ITApiFetch = {
          type: 'add',
          name: value.apiAddress,
          desc: value.apiDesc
        }
        if (_id) {
          param.type = 'modify'
          param._id = _id
        }
        let result = await FETCH_API(param)
        if (!result.state) {
          location.reload()
        }
      }
    })
  }
}

const CreateApiForm = Form.create()(CreateApi)

interface ITWrapProps {
  apiList: Array<any>
  addAPI: (value: ITApiListInfo) => {}
}
interface ITWrapState { }

class WrappedCreateApi extends React.Component<ITWrapProps, ITWrapState>{
  public render(): any {
    return <div><CreateApiForm {...this.props} /></div>
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

const mapDispatchToProps = (dispatch: any) => ({
  addAPI: (value: ITApiListInfo): void => { dispatch(add_api(value)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedCreateApi)