const path = require('path');
const webpack = require('webpack');
const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin; //复制html文件到生成目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
const packageName = 'tree-select-demo';
module.exports = {
  entry: {
    bundle: './app/main.jsx',
    vendor: ['react', 'react-dom', 'antd']
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
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      }
    }),
    new CopyWebpackPlugin([{
      from: './app/index.html',
      to: 'index.html'
    }]),
  ]
};
