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

const p2 = new Promise((resolve, reject) => {
  fs.readFile('data/2.txt', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

const p3 = new Promise((resolve, reject) => {
  fs.readFile('data/3.txt', (err, data) => {
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
      console.log('p1 success data: ', data);
      return p2;
    },
  )
  .then(
    (data) => {
      console.log('p2 success data: ', data);
      return p3;
    },
  )
  .then(
    (data) => {
      console.log('p3 success data: ', data);
    },
  );
