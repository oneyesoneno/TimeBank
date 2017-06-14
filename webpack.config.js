module.exports = {
  entry: './browser/index.jsx',
  output: {
    path: __dirname,
    filename: './bundle.js' // assumes your bundle.js will be in the root of your project folder
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015'] // if you aren't using 'babel-preset-es2015', then omit the 'es2015'
        }
      }
    ]
  },
};