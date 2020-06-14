import * as webpack from 'webpack'

export default {
  entry: './demo/index',
  output: {
    path: __dirname,
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  }
} as webpack.Configuration
