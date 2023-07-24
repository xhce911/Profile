const webpack = require('webpack');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json', '.ts'],
    mainFields: ['module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts)?$/,
        exclude: new RegExp(
          `(node_modules|bower_components|\\.(test|spec)\\.?)`,
        ),
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            cacheDirectory: true,
            presets: [
              [
                require.resolve('@babel/preset-env'),
                { targets: { node: '16.6.0' } },
              ],
            ],
          },
        },
      },
    ],
  },
  context: './src/functions',
  entry: {},
  target: 'node',
  plugins: [new webpack.IgnorePlugin(/vertx/)],
  output: {
    path: '../netlify/functions',
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  optimization: {
    nodeEnv: process.env.NODE_ENV || 'production',
  },
  bail: true,
  devtool: false,
  stats: {
    colors: true,
  },
};