import * as React from 'react'

import { Progress, Slider, Row, Col } from 'antd'

interface ITProps {}
interface ITState {
  inputValue: number
  percent: number
}

export default class Time extends React.Component<ITProps, ITState> {
  constructor(props: ITProps){
    super(props)
    this.state = {
      inputValue: 0,
      percent: 100
    }
  }
  public render(): JSX.Element{
    let {
      inputValue,
      percent
    } = this.state
    return (
      <div style={{padding: 10}}>
        <Row>
          <Col span={16}>
            <Slider min={1} max={45} marks={this.getMarks(5, 45)} onChange={this.onChange} value={inputValue} />
          </Col>
        </Row>
        <Row style={{paddingTop: 30}}>
          <Col span={16} >
            <Progress type="circle" onClick={this.startCountDown} percent={percent} status="active" format={percent => `${inputValue}:00`} />
          </Col>
        </Row>
      </div>
      // <div>
      //   <Progress type="circle" percent={75} format={percent => `${percent} Days`} />
      //   <Progress type="circle" percent={100} format={() => 'Done'} />
      // </div>
    )
  }

  startCountDown = () => {
    console.log(1111)
  }

  getMarks = (step: number, max: number) => {
    let marks: any = {}
    for(let i = 0; i <= max;){
      marks[String(i)] = i
      i = i + 5
    }
    return marks
  }

  onChange = (value: number) => {
    this.setState({
      inputValue: value,
    });
  }

}