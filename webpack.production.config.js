const path = require('path');
const webpack = require('webpack');
const FileManagerPlugin = require('filemanager-webpack-plugin'); //配置压缩js
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //复制html文件到生成目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageName = 'tree-select-demo';
module.exports = {
  entry: {
    bundle: './app/main.jsx',
    vendor: ['react', 'react-dom', 'react-router-dom', 'antd']
  },
  output: {
    path: path.join(__dirname, packageName),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|static\lib)/,
        use: 'babel-loader'
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader?minimize',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new uglifyJsPlugin({
      beautify: false, // 最紧凑的输出
      comments: false, // 删除所有的注释
      compress: {
        warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        drop_console: true, // 删除所有的 `console` 语句
        collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
      }
    }),
    new CopyWebpackPlugin([{
      from: './app/index.html',
      to: 'index.html'
    }]),
    new FileManagerPlugin({
      onEnd: {
        mkdir: ['./'],
        archive: [{
          source: packageName,
          destination: `${packageName}.tar.gz`,
          format: 'tar',
          options: {
            gzip: true,
            gzipOptions: {
              level: 1,
            },
            globOptions: {
              nomount: true,
            }
          }
        }]
      }
    })
  ]
};
