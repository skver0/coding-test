const path = require("path"),
  webpack = require("webpack"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  target: "web",
  entry: path.resolve(__dirname, "src/index.jsx"),
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Coding test",
      description: "Coding test",
      template: path.resolve(__dirname, "src/index.html"),
    }),
    new MiniCssExtractPlugin({filename: "bundle.css"}),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(mjs|js|jsx)$/,
        include: [path.resolve(__dirname, "src")],
        use: ["babel-loader"],
      },
      {
        test: /\.(css)$/,
        include: [path.resolve(__dirname, "src")],
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx"],
  },
};
