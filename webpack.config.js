const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.tsx',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: '4200'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ]
};
