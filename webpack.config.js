// Variables
const outputPath = './dist'
const assetPath = './src'
const dev = process.env.NODE_ENV !== 'production'

// Dependencies
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ImageminPlugin = require('imagemin-webpack-plugin').default
const ManifestPlugin = require('webpack-manifest-plugin')
const imageminMozjpeg = require('imagemin-mozjpeg')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebpackPlugin = require('html-webpack-plugin')
// Load configuration from a .env
// require('dotenv').config({path: path.resolve(process.cwd(), '.env')})

// The brain
const config = {
  entry: {
    main: [`${assetPath}/index.html`, `${assetPath}/css/main.scss`, `${assetPath}/js/main.js`]
  },
  mode: dev ? 'development' : 'production',
  devtool: dev ? 'cheap-module-eval-source-map' : false,
  externals: {
    // jquery: 'jQuery'
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
    overlay: true,
    clientLogLevel: 'warning'
    // host: 0.0.0.0
  },
  output: {
    path: path.resolve(__dirname, outputPath),
    filename: '[name].js',
    publicPath: dev ? `http://localhost:8080/` : './'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.ts', '.tsx'],
    alias: {
      '~': path.resolve('node_modules')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
       test: /\.(jsx|js)$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: !dev
          }
        }]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: dev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: dev,
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie > 7']
                }),
                require('css-mqpacker')({
                  sort: true
                }),
                require('cssnano')(),
                require('postcss-preset-env')({
                  browsers: 'last 2 versions'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: dev
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|wav)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: `[name]${dev ? '' : '.[hash]'}.[ext]`,
            useRelativePath: !dev
          }
        }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: `[name]${dev ? '' : '.[hash]'}.[ext]`
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ inject: true, template: 'src/index.html' }),
    new MiniCssExtractPlugin({
      filename: `[name]${!dev ? '' : '.[hash]'}.css`,
      chunkFilename: '[id].css'
    }),
    new ImageminPlugin({
      disable: dev,
      pngquant: {
        quality: '95-100'
      },
      jpegtran: false,
      plugins: [
        imageminMozjpeg({
          quality: 90,
          progressive: true
        })
      ]
    }),
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, './'),
      verbose: true,
      dry: false
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

// Env specific plugins
if (dev) {
  config.plugins.push(new BundleAnalyzerPlugin({ openAnalyzer: false }))// default port 8888
  config.entry.main.push('react-hot-loader/patch')
} else {
  config.plugins.push(new ManifestPlugin())
}

module.exports = config
