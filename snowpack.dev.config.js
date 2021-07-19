/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    dev: { url: '/', resolve: true, static: false },
    publish_esm: { url: '/publish_esm', resolve: true, static: false }
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
  ]
};
