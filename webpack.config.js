var merge = require('webpack-merge');
var webpack = require('webpack');

const target = process.env.npm_lifecycle_event;

var custom;
const common = {
  entry: [
    './src/index.jsx'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    },
    {
      loader: "eslint-loader", exclude: /node_modules/
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};

if(target === 'start') {
  custom = {
    devtool: 'eval-source-map',
  }
} else if(target === 'build') {
  custom = {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env': {
          //this affects react lib size (make smaller)
          'NODE_ENV': JSON.stringify('production') //weird hack
        }
      })
    ]
  }
}

module.exports = merge(common, custom);
