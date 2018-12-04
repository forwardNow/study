const config = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'main.js',
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'style-loader' },
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
};

const {
  entry,
  output: { filename },
  module: {
    rules: [cssRule, jsRule],
  },
} = config;

console.log(entry); // ./src/main.js
console.log(filename); // main.js
console.log(cssRule); // { test: /\.css$/, use: 'style-loader' }
console.log(jsRule); // { test: /\.js$/, use: 'babel-loader' }
