const fs      = require('fs');
const path    = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  setVariable: (key, value) => {
    const env = {};
    env[key] = JSON.stringify(value);

    [new webpack.DefinePlugin(env)];
  },
  loadJavascript: env => ({
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader?cacheDirectory',
          include: path.join(__dirname, 'client'),
          exclude: /node_modules/,
        },
      ],
    },
  }),
  devServer: env => ({
    output: {
      publicPath: 'http://localhost:8080' + '/bundle',
      filename: 'dev.js',
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      stats: 'errors-only',
      port: 8080,
      host: '127.0.0.1',
    },
    plugins: [new webpack.HotModuleReplacementPlugin({ mutiStep: true })],
  }),
  loadStylesheet: options => ({
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: [
            'style-loader?sourceMap=true',
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoader: 2,
                localIdentName: process.env.NODE_ENV === 'production'
                  ? '[hash:base64:5]'
                  : '[name]-[local]_[hash:base64:5]',

              }
            },
            'postcss-loader?sourceMap=true',
            'sass-loader?sourceMap=true',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: './client/styles/resources.scss',
              },
            },

          ],
        },
      ],
    },
  }),
  extractStylesheet: env => ({
    module: {
      rules: [
        {
          test: /\.(sass|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  modules: true,
                  importLoader: 2,
                  localIdentName: process.env.NODE_ENV === 'production'
                    ? '[hash:base64:5]'
                    : '[name]-[local]_[hash:base64:5]',
  
                }
              },
              'postcss-loader',
              'sass-loader',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: './client/styles/resources.scss',
                },
              },
            ],
          }),
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'bundle/bundle.scss',
        allChunks: true,
      }),

    ],
  }),
};
