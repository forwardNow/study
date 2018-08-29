const fs = require('fs');

fs.readFile('data/1.txt', (err, data) => {
  if (err) { throw err; }
  console.log(data.toString());
  fs.readFile('data/2.txt', (err2, data2) => {
    if (err2) { throw err2; }
    console.log(data2.toString());
    fs.readFile('data/3.txt', (err3, data3) => {
      if (err3) { throw err3; }
      console.log(data3.toString());
    });
  });
});
