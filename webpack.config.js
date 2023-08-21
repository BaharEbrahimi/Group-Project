const path = require('path');

module.exports = {
  mode: 'development', // Set to 'development' or 'production'
  entry: './src/index.js', // Your main entry file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './src/'), // Output directory
  },
};
