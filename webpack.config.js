const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = 3000;

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    vendor: ['react', 'react-dom', 'antd'],
    bundle: path.join(__dirname, './app/main.jsx')
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|static\lib)/,
        use: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.(less|css)$/,
        use: [
          'style-loader',
          'css-loader?#sourceMap',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp|svg|eot|ttf|woff)$/i,
        use: 'url-loader?limit=5000',
      }
    ],
  },
  devServer: {
    compress: false,
    contentBase: path.join(__dirname, 'app'),
    port: port,
    inline: true,
    hot: true,
    historyApiFallback: true,
  },
};
