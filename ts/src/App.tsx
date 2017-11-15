interface ITProps { }
interface ITState { }

class App extends React.Component<ITProps, ITState> {
  public render(): JSX.Element {
    const {
      api,
      page,
      tools
    } = initialState.menu
    const routeList: any[] = [...api, ...page, ... tools]
    return (
      <div style={{fontSize: 12}}>
        <Menu />
        {
          routeList.map( ({link, cmp}, index: number): JSX.Element => <Route key={index} exact={link === '/'} path={link} component={ components[cmp] as any} /> )
        }
      </div>
    )
  }
}

export default App