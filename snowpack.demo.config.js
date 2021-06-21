/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    'dev/demo': { url: '/', resolve: true, static: false },
    'dev/sync': { url: '/', resolve: true, static: false }
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
      dest: '/inventory.json'
    },
    {
      src: '/sync/user',
      dest: '/user.json'
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
  alias: {}
};
