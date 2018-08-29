const fs = require('fs');

const p1 = new Promise((resolve, reject) => {
  fs.readFile('data/1.txt', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

p1
  .then(
    (data) => {
      console.log(data.toString());
    },
    (err) => {
      console.log(err);
    },
  );
