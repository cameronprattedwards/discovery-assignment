const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: "./index.jsx",
  output: {
    filename: "built.js",
    path: __dirname + '/dist',
  },

  // Enable sourcemaps for debugging webpack's output.
  // devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".jsx", ".scss"],
    modules: [__dirname, 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015,plugins[]=transform-class-properties'],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?modules,localIdentName=[name]__[local]--[hash:base64:5]',
        }),
        include: /flexboxgrid/,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader?modules,localIdentName=[name]__[local]--[hash:base64:5]!sass-loader',
        }),
      },
    ]
  },

  plugins: [
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
  ],
};
