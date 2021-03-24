/* eslint-disable */
/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/', resolve: true, static: false }
  },
  packageOptions: {
    source: 'local'
  },
  devOptions: {},
  buildOptions: {
    out: 'dist'
  },
  optimize: {
    target: 'es2020'
  },
  plugins: [
    ['@snowpack/plugin-sass', { compilerOptions: { loadPath: 'node_modules' } }]
  ]
};
