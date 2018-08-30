const fs = require('fs');

fs.readFile('../data/1.txt', (err, data) => {
  if (err) {
    return console.log(err);
  }
  return console.log(data.toString());
});
