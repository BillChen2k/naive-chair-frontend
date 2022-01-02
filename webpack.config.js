// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const {DefinePlugin} = require('webpack');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const ProgressHook = new webpack.ProgressPlugin(function(percentage, msg) {
  if (percentage==0) {
    console.log('Building...');
  } else if (percentage==1) {
    console.log('Checkout http://localhost:3000');
  }
});

const clientConfig = {
  entry: './src/index.dev.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  devtool: 'inline-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.API': JSON.stringify(process.env.API || 'https://412505r54f.imdo.co/naivechair'),
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: './',
        },
      ],
    }),
    ProgressHook,
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: 'ts-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
};

module.exports = () => {
  if (isProduction) {
    clientConfig.mode = 'production';
    clientConfig.entry = './src/index.prod.tsx';
    clientConfig.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    clientConfig.mode = 'development';
  }
  return clientConfig;
};
