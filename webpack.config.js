const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

/**
 * Configure webpack
 * @param {"production" | "development" | undefined} env
 */
const configure = env => {
  return {
    mode: env,
    entry: path.join(__dirname, "src", "_assets", "main.js"),
    output: {
      filename: "[name].[contenthash].js",
      path: path.join(__dirname, "src", "static"),
      publicPath: "/static/",
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          exclude: "/node_modules/",
        },
        {
          test: /\.css?$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            "css-loader",
          ],
        },
      ],
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new ManifestPlugin({
        fileName: path.join(__dirname, "src", "_data", "manifest.json"),
      }),
    ],
    optimization: {
      minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      runtimeChunk: true,
      splitChunks: {
        chunks: "all",
      },
    },
  };
};

module.exports = configure;
