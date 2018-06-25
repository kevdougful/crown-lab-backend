module.exports = {
  entry: './server/server.ts',
  output: {
    path: __dirname + '/dist',
    filename: 'server.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  target: 'node',
  externals: {}
}
