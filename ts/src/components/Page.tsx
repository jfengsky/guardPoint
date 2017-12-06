import * as React from 'react'

interface ITProps {}
interface ITState {}

export default class Page extends React.Component<ITProps, ITState> {
  public render (): JSX.Element {
    return (
      <div>
        <ul>
          <li>
            <a href='/page/comment.html' target='_blank'>
              点评页
            </a>
          </li>
        </ul>
      </div>
    )
  }
}
