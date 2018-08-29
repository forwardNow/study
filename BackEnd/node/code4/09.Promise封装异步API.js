const fs = require('fs');

function pReadFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

pReadFile('data/1.txt')
  .then((data) => {
    console.log(data.toString());
    return pReadFile('data/2.txt');
  })
  .then((data) => {
    console.log(data.toString());
    return pReadFile('data/3.txt');
  })
  .then((data) => {
    console.log(data.toString());
  });
