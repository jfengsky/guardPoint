import * as React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Modal } from 'antd'


import { ITInitialState, ITApiListInfo, ITApiFetch } from '../interface'
import { FETCH_API } from '../store/request'

const confirm = Modal.confirm

interface ITProps {
  apiList: Array<ITApiListInfo>
}
interface ITState { }

const deleteApi = (e: any) => {
  let { id } = e.target.dataset
  confirm({
    title: '确定要删除这条api吗',
    content: '',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    async onOk() {
      let result = await FETCH_API({ type: 'delete',_id: id })
      if(!result.state){
        location.reload()
      }
    },
    onCancel() {

    },
  })
}

const columns = [{
  title: '接口路径',
  dataIndex: 'name',
  key: 'name',
  render: (name: string, item: any) => {
    let modifyHref = `/api/apiDataList?id=${item._id}`
    return <a href={modifyHref}>{name}</a>
  }
}, {
  title: '接口描述',
  dataIndex: 'desc',
  key: 'desc',
}, {
  title: '操作',
  dataIndex: '_id',
  key: '_id',
  render: (_id: string) => {
    let modifyHref = `/api/createApi?id=${_id}`
    return (<span>
      <a href={modifyHref}><Icon type="edit" />修改</a>
      {' '}
      <span onClick={deleteApi} data-id={_id}><Icon type="delete" />删除</span>
    </span>)
  }
}]

class ApiList extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div style={{ padding: 20 }}>
        <Table rowKey="_id" dataSource={this.props.apiList} columns={columns} />
      </div>
    )
  }
}

const mapStateToProps = (state: ITInitialState) => ({
  apiList: state.apiList
})

export default connect(mapStateToProps)(ApiList)