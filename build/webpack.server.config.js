//服务端代码打包
const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    server: "./ts/server/index.ts"
  },
  output: {
    path: path.resolve(__dirname, '../dist/server/'),
    filename: '[name].js',
    publicPath: ''
  },
  devtool: "source-map",
  resolve: {
    modules: ['node_modules', 'src'],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  target: 'node',
  externals: [
    nodeExternals()
  ]
}