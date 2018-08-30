const path = require('path');

console.log(path.basename('/a/b/c.txt'));
// c.txt

console.log(path.basename('/a/b/c.txt', '.txt'));
// c

console.log(path.dirname('/a/b/c'));
// /a/b

console.log(path.dirname('/a/b/c.txt'));
// /a/b


path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''
