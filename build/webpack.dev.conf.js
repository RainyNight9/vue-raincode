var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')(global._program.app);
// console.log(baseWebpackConfig);
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  // devtool: '#source-map',
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      LOCAL_ROOT: 'http://115.28.110.211:3001/'
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin

    new HtmlWebpackPlugin({

      title: global._program.title? global._program.title: 'Rain9测试平台',
      statics: {
        base: "//ozg3srfo0.bkt.clouddn.com/cs",
        icon : [
          '//images.01zhuanche.com/statics/touch/app5/images/favicon.jpg',
        ],
        ico:global._program.ico ? global._program.ico : 0,
      },
      filename: 'index.html',
      template: './static/html/'+ global._program.html +'.html',
      inject: true,
      files: {
        "js": [ "./src/js/jquery.gesture.password.min.js"],
      }
    }),
    new FriendlyErrorsPlugin()
  ]
})
