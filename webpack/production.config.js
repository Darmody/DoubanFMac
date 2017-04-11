/* eslint-disable  import/no-dynamic-require */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '..', 'src')
const assetsPath = path.join(__dirname, '../app/dist')

const plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve(srcPath, 'index.html'),
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.NamedModulesPlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      unused: true,
      dead_code: true,
      screw_ie8: true,
      warnings: false,
    }
  }),
]

module.exports = {
  devtool: 'source-map',
  entry: path.join(srcPath, 'index.js'),
  output: {
    filename: '[name].js',
    publicPath: './',
    pathinfo: true,
    path: assetsPath,
  },
  plugins,
  module: {
    rules: [{
      test: /\.js$/,
      use: [
        {
          loader: 'babel-loader',
        },
      ],
      include: srcPath,
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
      loader: 'url-loader',
      options: { limit: 10000 },
    }, {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      loader: 'url-loader',
      options: { limit: 10240 },
    }]
  },
  resolve: {
    modules: [
      'node_modules',
      srcPath,
    ],
  },
  target: 'electron-renderer',
}
