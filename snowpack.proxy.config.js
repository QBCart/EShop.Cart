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
  plugins: [
    ['@snowpack/plugin-sass', { compilerOptions: { loadPath: 'node_modules' } }]
  ],
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
