var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}


module.exports = function(entry) {
  console.log('Entry is ', entry);
  var entryObj = {};
  entryObj[entry] ='./src/app/' + entry + '.js';
  return {
    entry: entryObj,
    output: {
      path: config.build.assetsRoot,
      filename: '[name].[hash].js',
      publicPath: process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        // {
        //  test: /\.(js|vue)$/,
        //  loader: 'eslint-loader',
        //  enforce: 'pre',
        //  include: [resolve('src'), resolve('test')],
        //  options: {
        //    formatter: require('eslint-friendly-formatter')
        //  }
        // },
        // {
        //   test: /\.less$/,
        //   // 将样式抽取出来为独立的文件
        //   loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader"),
        //   exclude: /node_modules/
        // },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
  }
}
