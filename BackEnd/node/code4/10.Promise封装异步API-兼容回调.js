const fs = require('fs');

function pReadFile(path, callback = () => {}) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
        return callback(err);
      }
      resolve(data);
      return callback(null, data);
    });
  });
}

pReadFile('data/1.txt', (err1, data1) => {
  if (err1) {
    throw err1;
  }
  console.log(data1.toString());

  pReadFile('data/2.txt', (err2, data2) => {
    if (err2) {
      throw err2;
    }
    console.log(data2.toString());
  });
});
