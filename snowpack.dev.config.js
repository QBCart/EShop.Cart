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
  routes: [
    {
      src: '/sync/inventory',
      dest: '/sync/inventory.json'
    }
  ],
  // prettier-ignore
  alias: {
    'react': 'https://qbcdemo.z13.web.core.windows.net/deps/react.js',
    'react-dom': 'https://qbcdemo.z13.web.core.windows.net/deps/react-dom.js',
    'styled-components': 'https://qbcdemo.z13.web.core.windows.net/deps/styled-components.js',
    '@qbcart/utils': 'https://qbcdemo.z13.web.core.windows.net/utils/index.js',
    '@qbcart/eshop-inventory-hooks': 'https://qbcdemo.z13.web.core.windows.net/eshop/inventory-hooks/index.js',
    '@qbcart/eshop-cart-hooks': 'https://qbcdemo.z13.web.core.windows.net/eshop/cart-hooks/index.js',
    '@qbcart/eshop-user-data-hooks': 'https://qbcdemo.z13.web.core.windows.net/eshop/user-data-hooks/index.js',
    '@qbcart/eshop-toast': 'https://qbcdemo.z13.web.core.windows.net/eshop/toast/index.js',
    '@qbcart/eshop-alert-modal': 'https://qbcdemo.z13.web.core.windows.net/eshop/alert-modal/index.js',
    'cart': './src/index'
  }
};
