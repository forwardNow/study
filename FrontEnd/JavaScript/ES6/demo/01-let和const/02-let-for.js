for (var i = 0; i < 10; i++) {
  // do nothings
}

for (let j = 0; j < 10; j++) {
  // do nothings
}

console.log('var:', i); // var: 10
console.log('let:', j); // ReferenceError: j is not defined