const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: path.join(paths.src, './entry.tsx'),
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
        include: paths.src,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  node: {
    global: true,
  },
  stats: 'errors-only',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './html/index.html.ejs'),
    }),
  ],
  devtool: 'eval-source-map',
  serve: {
    logLevel: 'warn',
    host: '0.0.0.0',
  },
}
