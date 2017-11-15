export interface ITLayout {
  title: string
  content: string
  __INITSTATE__: any
}

export const layout = (props:ITLayout): string => `
  <html>
    <head>
      <meta name="viewport" content="width=1000, initial-scale=1.0, maximum-scale=1.0">
      <title>${props.title}</title>
    </head>
    <body>
      <div id="root">${props.content || ''}</div>
      <script src="/static/vendor.js"></script>
      <script src="/static/index.js"></script>
      <script>
        window.__INITSTATE__ = ${JSON.stringify(props.__INITSTATE__ || {})}
      </script>
    </body>
  </html>
`