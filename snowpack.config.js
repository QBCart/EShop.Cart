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
    entrypoints: ['index.js'],
    target: 'es2020',
    minify: true,
    bundle: true,
    sourcemap: false
  },
  // prettier-ignore
  alias: {
    'react': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react.js`,
    'react-dom': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react-dom.js`,
    'styled-components': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/styled-components.js`,
    '@qbcart/eshop-inventory-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/inventory-hooks/index.js`,
    '@qbcart/eshop-cart-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/cart-hooks/index.js`,
    '@qbcart/utils': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/utils/index.js`
  },
  // prettier-ignore
  plugins: [
    [
      'snowpack-plugin-import-map',
      {
        // map of packages to imports (required)
        imports: {
          // specify the exact URL to load the dependency from
          'react': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react.js`,
          'react-dom': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/react-dom.js`,
          'styled-components': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/deps/styled-components.js`,
          '@qbcart/eshop-inventory-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/inventory-hooks/index.js`,
          '@qbcart/eshop-cart-hooks': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/eshop/cart-hooks/index.js`,
          '@qbcart/utils': `${process.env.SNOWPACK_PUBLIC_STREAMING_URL}/utils/index.js`
        },
        // if true, import-map transforms imports in development mode too. default: false.
        dev: false
      }
    ],
  ]
};
