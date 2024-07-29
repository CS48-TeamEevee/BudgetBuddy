const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

module.exports = {
  // Entry point that indicates where
  // should the webpack starts bundling
  entry: './client/src/index.js',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/public/index.html',
      filename: 'index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // checks for .js or .jsx files
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            ['@babel/preset-react', { runtime: 'automatic' }],
          ],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/, //checks for .css files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/, // checks for .html files
        use: ['html-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // checks for image files
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash][ext]',
        },
      },
    ],
  },

  // Options for resolving module requests
  // extensions that are used
  resolve: { extensions: ['.*', '.js', '.jsx'] },

  // Output point is where webpack should
  // output the bundles and assets
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api'],
        target: ['http://localhost:3000'],
      },
    ],
  },
};
