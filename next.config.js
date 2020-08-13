require('dotenv').config();
// const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // dxlab-virtuoso is proxied to dxlab.sl.nsw.gov.au/virtuoso, so we need to add a prefix for _next JS files
  ...(process.env.NODE_ENV === 'production'
    ? {
        assetPrefix: '/virtuoso',
      }
    : {}),
  webpack: (config, { dev }) => {
    const customConfig = {
      ...config,
    };

    customConfig.plugins = config.plugins.filter(
      (plugin) => plugin.constructor.name !== 'UglifyJsPlugin',
    );

    // Environment variables
    // customConfig.plugins.push(new webpack.EnvironmentPlugin(process.env));

    // Next 9 introduced some pretty strict type checking
    // that breaks dev builds. It is now more relaxed,
    // however we may want to introduce again once all types
    // issues fixed
    // https://github.com/zeit/next.js/issues/7687#issuecomment-506440999
    customConfig.plugins = config.plugins.filter((plugin) => {
      if (plugin.constructor.name === 'ForkTsCheckerWebpackPlugin')
        return false;
      return true;
    });

    if (dev) {
      customConfig.plugins.push(
        new StyleLintPlugin({
          configFile: './.stylelintrc.js',
          files: ['**/*.css'],
          emitErrors: false,
        }),
      );

      customConfig.module.rules.push({
        enforce: 'pre',
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      });
    }

    return customConfig;
  },
  // EnvironmentPlugin stopped working for some reason
  env: {
    DXLAB_WEBSITE_BASE_URL: process.env.DXLAB_WEBSITE_BASE_URL,
    DXLAB_WEBSITE_GRAPHQL_URL: process.env.DXLAB_WEBSITE_GRAPHQL_URL,
    DXLAB_WEBSITE_FB_APP_ID: process.env.DXLAB_WEBSITE_FB_APP_ID,
    DXLAB_WEBSITE_GTM_ID: process.env.DXLAB_WEBSITE_GTM_ID,
  },
};
