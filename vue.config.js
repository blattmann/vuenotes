/* eslint-disable global-require */
/* webpack is maintened by vue-cli-service therefore not listed
in projects dependencies */

// const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: '@import "@/sass/main.scss";',
      },
    },
  },

  pwa: {
    name: 'vuenotes',
  },
};
