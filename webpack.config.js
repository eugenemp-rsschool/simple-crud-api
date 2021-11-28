const path = require('path');

const config = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  plugins: [],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        options: {
          plugins: ['@babel/syntax-dynamic-import'],
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  target: 'node',
  mode: 'production',
};

module.exports = () => config;
