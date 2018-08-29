const fs = require('fs');

fs.readFile('data/1.txt', (err, data) => {
  if (err) { throw err; }
  console.log(data.toString());
});

fs.readFile('data/2.txt', (err, data) => {
  if (err) { throw err; }
  console.log(data.toString());
});

fs.readFile('data/3.txt', (err, data) => {
  if (err) { throw err; }
  console.log(data.toString());
});
