/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: { url: '/src', resolve: true, static: false },
    dev: { url: '/', resolve: true, static: false }
  },
  packageOptions: {
    source: 'remote'
  },
  devOptions: {},
  buildOptions: {},
  plugins: [['@snowpack/plugin-sass']]
};
