/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
      src: {url: '/', resolve: true, static: false},
    },
    devOptions: {
      open: "none"
    },
    packageOptions: {
      source: 'remote'
    },
    buildOptions: {
      clean: true,
      metaUrlPath: ".",
    },
    plugins: [
      ['@snowpack/plugin-sass', { compilerOptions: { loadPath: 'node_modules'}}]
    ]
  };