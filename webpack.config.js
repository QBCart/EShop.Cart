/* eslint-disable */
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['./publish_esm/index.js'],
  output: {
    path: 'build',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: []
  }
};
