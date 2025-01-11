const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash].css',
        chunkFilename: 'static/css/[name].[contenthash].chunk.css',
      }));
    }
    return config;
  },
}; 