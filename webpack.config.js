const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed,
    envKeys = Object.keys(env).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(env[next]);
      return prev;
    }, {});

  return {
    entry: "./app/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index_bundle.js",
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: "babel-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
      ],
    },
    mode: "development",
    node: {
      fs: "empty",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "app/index.html",
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
