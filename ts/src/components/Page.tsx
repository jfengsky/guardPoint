import * as React from 'react'

interface ITProps {}
interface ITState {}

export default class Page extends React.Component<ITProps, ITState> {
  public render(): JSX.Element{
    return (
      <div>Page</div>
    )
  }
}