const path = require('path');

module.exports = {
  entry: './src/app.js',
  cache: false,
  output: {
    filename: 'main.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};