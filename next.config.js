require('dotenv').config();
const webpack = require('webpack');
const fs = require('fs');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config, { dev }) => {
    const customConfig = {
      ...config,
    };

    customConfig.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'UglifyJsPlugin',
    );

    // Environment variables
    customConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));

    if (dev) {
      config.plugins.push(
        new StyleLintPlugin({
          configFile: './.stylelintrc.js',
          files: ['**/*.css'],
          emitErrors: false,
        }),
      );
    }

    customConfig.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
    });

    // config.module.rules.push(
    //   {
    //     test: /\.css$/,
    //     use: [
    //       {
    //         loader: 'emit-file-loader',
    //         options: {
    //           name: 'dist/[path][name].[ext]',
    //         },
    //       },
    //     ],
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ['babel-loader', 'raw-loader', 'postcss-loader'],
    //   },
    //   {
    //     enforce: 'pre',
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader',
    //   },
    // );

    return customConfig;
  },
});
