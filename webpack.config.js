const path = require('path');

const config = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
  module: {
    rules: [],
  },
  target: 'node',
  mode: 'production',
};

module.exports = () => config;
