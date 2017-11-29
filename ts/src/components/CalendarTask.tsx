import * as React from 'react'
import { Calendar, Alert } from 'antd'


interface ITProps { }
interface ITState { }

export default class CalendarTask extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    return (
      <div style={{ padding: 　10 }}>
        <Alert message="Info Text" type="info" showIcon />
        <Alert message="Warning" type="warning" showIcon />
        <Calendar />
      </div>

    )
  }
}