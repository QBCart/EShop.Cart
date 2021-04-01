/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/src', resolve: true, static: false },
    dev: { url: '/', resolve: true, static: false }
  },
  plugins: [],
  packageOptions: {
    source: 'local'
  },
  devOptions: {},
  buildOptions: {},
  // prettier-ignore
  alias: {
    'react': 'https://qbcdemo.z13.web.core.windows.net/deps/react.js',
    'react-dom': 'https://qbcdemo.z13.web.core.windows.net/deps/react-dom.js',
    'styled-components': 'https://qbcdemo.z13.web.core.windows.net/deps/styled-components.js',
    '@qbcart/eshop-local-db': 'https://qbcdemo.z13.web.core.windows.net/eshop/localdb/index.js',
    '@qbcart/utils': 'https://qbcdemo.z13.web.core.windows.net/utils/index.js',
    '@qbcart/toast': 'https://qbcdemo.z13.web.core.windows.net/toast/index.js',
    '@qbcart/alert-modal': 'https://qbcdemo.z13.web.core.windows.net/alert-modal/index.js',
    '@qbcart/eshop-product-modal': 'https://qbcdemo.z13.web.core.windows.net/eshop/product-modal/index.js',
    'cart': './src/index'
  }
};
