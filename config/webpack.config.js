const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: path.join(paths.src, './entry.ts'),
  output: {
    filename: '[name].[hash:6].js',
    path: paths.dist,
    publicPath: '/',
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'babel-loader',
        include: paths.src,
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  node: false,
  stats: 'errors-only',
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'eval-source-map',
  serve: {
    logLevel: 'warn',
    host: '0.0.0.0',
  },
}
