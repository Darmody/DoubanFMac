/* eslint-disable  import/no-dynamic-require */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const srcPath = path.join(__dirname, '..', 'src')
const assetsPath = path.join(__dirname, '..', 'public')

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    template: path.resolve(srcPath, 'index.development.html'),
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new webpack.NamedModulesPlugin(),
]

if (process.env.DASHBOARD === '1') {
  const DashboardPlugin = require('webpack-dashboard/plugin')
  const Dashboard = require('webpack-dashboard')

  const dashboard = new Dashboard()

  plugins.push(new DashboardPlugin(dashboard.setData))
}

module.exports = {
  devtool: 'inline-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.join(srcPath, 'index.js'),
  ],
  output: {
    filename: '[name].js',
    publicPath: '/',
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
          options: { cacheDirectory: true },
        },
        {
          loader: 'eslint-loader',
        }
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
  devServer: {
    inline: false,
    hot: true,
    quiet: false,
    noInfo: false,
    contentBase: assetsPath,
    publicPath: '/',
    historyApiFallback: true
  },
  resolve: {
    modules: [
      'node_modules',
      srcPath,
    ],
  },
  target: 'electron-renderer',
}
