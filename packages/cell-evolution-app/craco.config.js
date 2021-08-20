const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#66b3ff' },
            javascriptEnabled: true,
          },
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[path][name]--[hash:base64:5]',
          },
        },
      },
    },
  ],
};
