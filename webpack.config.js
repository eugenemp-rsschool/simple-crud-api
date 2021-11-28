const path = require('path');

const config = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/i,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  target: 'node',
  mode: 'production',
};

module.exports = () => config;
