/* eslint-disable */
// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/', resolve: false, static: false }
  },
  packageOptions: {
    source: 'local'
  },
  devOptions: {},
  buildOptions: {
    out: 'publish_esm',
    sourcemap: false,
    clean: true,
    metaUrlPath: '.'
  },
  optimize: {
    target: 'es2020',
    minify: true,
    sourcemap: false
  },
  // prettier-ignore
  alias: {
    'react': '/deps/react.js',
    'react-dom': '/deps/react-dom.js',
    'styled-components': '/deps/styled-components.js',
    '@qbcart/eshop-inventory-hooks': '/eshop/inventory-hooks/index.js',
    '@qbcart/eshop-cart-hooks': '/eshop/cart-hooks/index.js',
    '@qbcart/utils': '/utils/index.js'
  },
  // prettier-ignore
  plugins: [
    [
      'snowpack-plugin-import-map',
      {
        // map of packages to imports (required)
        imports: {
          // specify the exact URL to load the dependency from
          'react': '/deps/react.js',
          'react-dom': '/deps/react-dom.js',
          'styled-components': '/deps/styled-components.js',
          '@qbcart/eshop-inventory-hooks': '/eshop/inventory-hooks/index.js',
          '@qbcart/eshop-cart-hooks': '/eshop/cart-hooks/index.js',
          '@qbcart/utils': '/utils/index.js'
        },
        // if true, import-map transforms imports in development mode too. default: false.
        dev: false
      }
    ],
  ]
};
