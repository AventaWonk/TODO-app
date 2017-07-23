const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const jsOutputPath = 'js/';
const cssOutputPath = 'css/';

const extractor = new ExtractTextPlugin({
  filename: cssOutputPath + "[name].css",
  disable: process.env.NODE_ENV === "development"
});

const config = {
  devtool: 'eval-source-map',
  entry:  __dirname + '/src/js/main.js',
  output: {
    path: __dirname + '/public',
    filename: jsOutputPath + 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
  			  presets: ['es2015']
  		  }
      },
      {
        test: /\.scss$/,
        use: extractor.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader'
            }
          ],
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    extractor
  ],
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true
  },
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
