/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

const httpProxy = require('http-proxy');
const proxy = httpProxy.createServer({ target: 'http://localhost:7080' });

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/src', resolve: true, static: false },
    dev: { url: '/', resolve: true, static: false }
  },
  packageOptions: {
    source: 'local'
  },
  devOptions: {},
  buildOptions: {},
  plugins: [],
  // prettier-ignore
  alias: {
    'react': 'https://qbcdemo.z13.web.core.windows.net/deps/react.js',
    'react-dom': 'https://qbcdemo.z13.web.core.windows.net/deps/react-dom.js',
    'styled-components': 'https://qbcdemo.z13.web.core.windows.net/deps/styled-components.js',
    '@qbcart/eshop-local-db': 'https://qbcdemo.z13.web.core.windows.net/eshop/localdb/index.js',
    '@qbcart/utils': 'https://qbcdemo.z13.web.core.windows.net/utils/index.js',
    '@qbcart/toast': 'https://qbcdemo.z13.web.core.windows.net/toast/index.js',
    'cart': './src/index'
  },
  routes: [
    {
      src: '/data/.*',
      dest: (req, res) => {
        // remove /data prefix
        req.url = req.url.replace(/^\/data/, '');

        proxy.web(req, res);
      }
    }
  ]
};
