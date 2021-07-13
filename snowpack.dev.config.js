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
    },
    {
      src: '/sync/user',
      dest: '/sync/user.json'
    },
    {
      src: '/sync/cart',
      dest: '/sync/cart.html'
    },
    {
      src: '/Accessories',
      dest: '/index.html'
    },
    {
      src: '/Blades',
      dest: '/index.html'
    },
    {
      src: '/accessories',
      dest: '/index.html'
    },
    {
      src: '/blades',
      dest: '/index.html'
    },
    {
      src: '/Accessories/Adaptors',
      dest: '/index.html'
    },
    {
      src: '/accessories/adaptors',
      dest: '/index.html'
    }
  ],
  // prettier-ignore
  alias: {
    'react': 'https://qbcdemo.z13.web.core.windows.net/deps/react.js',
    'react-dom': 'https://qbcdemo.z13.web.core.windows.net/deps/react-dom.js',
    'styled-components': 'https://qbcdemo.z13.web.core.windows.net/deps/styled-components.js',
    '@qbcart/utils': 'https://qbcdemo.z13.web.core.windows.net/utils/index.js',
    '@qbcart/eshop-inventory-hooks': 'https://qbcdemo.z13.web.core.windows.net/eshop/inventory-hooks/index.js',
    '@qbcart/eshop-cart-hooks': 'https://qbcdemo.z13.web.core.windows.net/eshop/cart-hooks/index.js'
  }
};
