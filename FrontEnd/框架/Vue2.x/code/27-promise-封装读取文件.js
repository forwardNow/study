const fs = require('fs');
const path = require('path');

// 传统读取文件的方式（回调）
// fs.readFile(path.join(__dirname, './03-text.html'), 'utf-8', (err, data) => {
//   if (err) {
//     throw err;
//   }

//   console.log(data.toString());
// });

let promise = new Promise((resolve, reject) => {
  fs.readFile('./03-text.html', 'utf-8', (err, data) => {
    if (err) {
      // throw err;
      return reject(err);
    }

    return reject(data.toString());
  });
});

promise.then(
  content => console.log(content),
  err => console.log(err),
);

