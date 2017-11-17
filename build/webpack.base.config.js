// 业务代码打包
const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    index: "./ts/src/index.tsx"
  },
  output: {
    path: path.resolve(__dirname, '../dist/static/'),
    filename: '[name].js',
    publicPath: ''
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor']
    })
  ]
}