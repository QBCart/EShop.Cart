/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    dev: { url: '/', resolve: true, static: false },
    src: { url: '/src', resolve: true, static: false }
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
    'react': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react.js`,
    'react-dom': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react-dom.js`,
    'styled-components': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/styled-components.js`,
    '@qbcart/eshop-inventory-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/inventory-hooks/index.js`,
    '@qbcart/eshop-cart-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/cart-hooks/index.js`,
    '@qbcart/utils': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/utils/index.js`
  }
};
