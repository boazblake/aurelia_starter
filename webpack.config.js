  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  const AureliaWebpackPlugin = require('aurelia-webpack-plugin'); 
  const project = require('./package.json');

  const ENV = process.env.NODE_ENV && process.env.NODE_ENV.toLowerCase() || 'development';
  const DEBUG = ENV !== 'production';
  const title = 'Aurelia Navigation Skeleton';
  const baseUrl = '/';
  const rootDir = path.resolve();
  const srcDir = path.resolve('src');
  const outDir = path.resolve('dist');

  const aureliaBootstrap = [
      'aurelia-bootstrapper-webpack',
      'aurelia-polyfills',
      'aurelia-pal-browser',
      'regenerator-runtime'
  ];

  const aureliaModules = Object.keys(project.dependencies).filter(dep => dep.startsWith('aurelia-'));
  const metadata = {
      port: process.env.WEBPACK_PORT || 9000,
      host: process.env.WEBPACK_HOST || 'localhost',
      ENV: ENV,
      HMR: process.argv.join('').indexOf('hot') >= 0 || !!process.env.WEBPACK_HMR
  };

  module.exports = {
      entry: {
          'app': [], // <-- this array will be filled by the aurelia-webpack-plugin
          'aurelia-bootstrap': aureliaBootstrap,
          'aurelia': aureliaModules.filter(pkg => aureliaBootstrap.indexOf(pkg) === -1)
      },
      output: {
          path: outDir,
          filename: DEBUG ? '[name].bundle.js' : '[name].[chunkhash].bundle.js',
          sourceMapFilename: DEBUG ? '[name].bundle.map' : '[name].[chunkhash].bundle.map',

          /** The filename of non-entry chunks as relative path
          * inside the output.path directory.
          *
          * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
          */
          chunkFilename: DEBUG ? '[id].chunk.js' : '[id].[chunkhash].chunk.js'
      },
      resolve: {
          modules: [
              srcDir, // This enables simple import path for our module in deep tree
              'node_modules', 
              // 'bower_components' // <--- Uncomment this line to enable simpler import path for bower components
          ]
      },
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/, // include: path.resolve('src'),
                  use: {
                      loader: 'babel-loader',
                      query: {
                          presets: [
                              [ 'es2015', {
                                  loose: true, // this helps simplify ESnext transformation
                                  module: false // this helps enable tree shaking for webpack 2
                              }],
                              'stage-1'
                          ],
                          plugins: ['transform-decorators-legacy']
                      }
                  }
              },
              {
                  test: /\.html$/,
                  exclude: /index\.html$/, // index.html will be taken care by HtmlWebpackPlugin
                  use: 'html-loader'
              },
              {
                  test: /\.css$/, 
                  use: [
                      {
                          loader: 'style-loader',
                          options: {
                              singleton: true
                          }
                      },
                      'css-loader'
                  ]
              },
              {
                  test: /\.(png|jpe?g|gif|svg|eot|woff|woff2|ttf)$/,
                  use: {
                      loader: 'url-loader',
                      query: {
                          limit: 10000,
                          name: '[name].[ext]'
                      }
                  }
              }
          ]
      },
      devServer: {
          port: metadata.port,
          host: metadata.host,
          historyApiFallback: true,
          watchOptions: {
              aggregateTimeout: 300,
              poll: 1000
          },
          progress: true,
          outputPath: outDir
      },
      plugins: [
          new webpack.ProvidePlugin({
              regeneratorRuntime: 'regenerator-runtime', // to support await/async syntax
              Promise: 'bluebird', // because Edge browser has slow native Promise object
              $: 'jquery', // because 'bootstrap' by Twitter depends on this
              jQuery: 'jquery', // just an alias
              'window.jQuery': 'jquery' // this doesn't expose jQuery property for window, but exposes it to every module
          }),
          new HtmlWebpackPlugin({
              inject: 'head', // this helps put all scripts into document head to avoid flash of unstyled content (FOUC) when app starts 
              title: title,
              template: 'index.html',
              chunksSortMode: 'dependency'
          }),
          new AureliaWebpackPlugin({
              root: rootDir,
              src: srcDir,
              title: title,
              baseUrl: baseUrl
          }),
          new CopyWebpackPlugin([{
              from: 'favicon.ico',
              to: 'favicon.ico'
          }]),
          new webpack.optimize.CommonsChunkPlugin({
              name: ['aurelia', 'aurelia-bootstrap']
          }),
          new webpack.DefinePlugin({
            '__DEV__': true,
            'ENV': JSON.stringify(metadata.ENV),
            'HMR': metadata.HMR,
            'process.env': {
                'ENV': JSON.stringify(metadata.ENV),
                'NODE_ENV': JSON.stringify(metadata.ENV),
                'HMR': metadata.HMR,
                'WEBPACK_HOST': JSON.stringify(metadata.host),
                'WEBPACK_PORT': JSON.stringify(metadata.port)
            }
          })
      ].concat(DEBUG ? [

      ] : [
          /**
          * Plugin: DedupePlugin
          * Description: Prevents the inclusion of duplicate code into your bundle
          * and instead applies a copy of the function at runtime.
          *
          * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
          * See: https://github.com/webpack/docs/wiki/optimization#deduplication
          */
          new webpack.optimize.DedupePlugin(),
          /**
          * Plugin: Uglifyjs
          */
          new webpack.optimize.UglifyJsPlugin({
              mangle: { screw_ie8: true, keep_fnames: true},
              dead_code: true,
              unused: true,
              comments: true,
              compress: {
                  screw_ie8: true,
                  keep_fnames: true,
                  drop_debugger: false,
                  dead_code: false,
                  unused: false,
                  warnings: false
              }
          })
      ])
  };