const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {DEV, outputFolderName} = require('./util.js');

let config = {
  devtool: DEV ? 'cheap-module-inline-source-map' : 'source-map',
  entry: {
    main: [
      './js/theme.js',
      './css/theme.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, `../../${outputFolderName}/`),
    filename: 'theme.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !DEV,
                sourceMap : DEV
              }
            },
              {
                  loader: 'postcss-loader',
                  options: {
                      sourceMap: DEV
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      sourceMap: DEV
                  }
              }
          ]
        })
      },
      {
        test: /.(png|woff(2)?|eot|ttf|svg|jp(e)?g)(\?[a-z0-9=\.]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '../css/[hash].[ext]'
            }
          }
        ]
      },
      {
        test : /\.css$/,
        use: ['style-loader', {
            loader: 'css-loader',
            options: {
                sourceMap: true,
                importLoaders: 1
            }
        }, 'postcss-loader']
      }
    ]
  },
  externals: {
    prestashop: 'prestashop',
    $: '$',
    jquery: 'jQuery'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: path.join('..', 'css', 'theme.css'),
      allChunks: true,
      disable: DEV
    })
  ]
};

module.exports = config;
