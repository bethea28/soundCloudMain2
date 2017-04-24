
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./components/entry.js",
  output: {
    path: path.join(__dirname, './public'),
    filename: "bundle.js"
  },
  module: {
    loaders: [

      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', `react`]
        }
      },
      {
      test: [/\.scss$/,/\.css$/],
      loaders: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
};
