var path = require('path')
var fs = require('fs')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var TransferWebpackPlugin = require('transfer-webpack-plugin')
var autoprefixer = require('autoprefixer')
var rucksack = require('rucksack-css')
var postcssSprites = require('postcss-sprites')
var sprites = postcssSprites.default
var precss = require('precss')
var assets = require('postcss-assets')

var outputDir = 'dist/local'

if (process.env.NODE_ENV === 'production') {
  outputDir = 'dist/prod'
} else if (process.env.NODE_ENV === 'development') {
  outputDir = 'dist/dev'
}

var distPath = path.resolve(__dirname, outputDir)

const extractStylePlugin = new ExtractTextPlugin('app-[hash].css')

module.exports = {
	noParse: /es6-promise\.js$/,

  entry: {
    main: [
      './src/main.js'
    ],
    vendor: ['vue', 'vue-router', 'vuex']
  },

  output: {
    path: distPath,
    filename: 'app-[hash].js',
    hash: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.vue'],
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      'framework': path.resolve(__dirname, './src/framework.js'),
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },

  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /vue-scroller.src.*?js$/,
        loader: 'babel'
      },
      {
        test: /\.(css|scss)$/,
        loader: extractStylePlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      },
    ]
  },

  vue: {
    loaders: {
      scss: extractStylePlugin.extract('style', 'css!postcss!sass')
    }
  },

  postcss: [
    rucksack(),
    autoprefixer({
     browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    precss,
    assets({
      basePath: __dirname + '/assets',
      relative: false
    })
   ],

   plugins: [

     extractStylePlugin,

     new webpack.optimize.CommonsChunkPlugin({
       name: "vendor",
       filename:"vendor-[hash].js",
       minChunks: Infinity
     }),

     new HtmlWebpackPlugin({
       template: 'index.html',
       inject: 'body'
     }),

     new TransferWebpackPlugin([
       {from: 'assets', to: 'assets'},
     ]),
   ],
}

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        PACK_ENV: '"production"'
      }
    })
  )

  module.exports.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin()
  )

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )

} else if (process.env.NODE_ENV === 'development') {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        PACK_ENV: '"development"'
      },
      DEVELOPMENT: true,
      DEBUG: true,
    })
  )

  module.exports.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin()
  )

  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )

} else {

  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
        PACK_ENV: '"local"'
      }
    })
  )

  module.exports.plugins.push(
    new webpack.NoErrorsPlugin()
  )

  module.exports.devtool = '#source-map'

}
