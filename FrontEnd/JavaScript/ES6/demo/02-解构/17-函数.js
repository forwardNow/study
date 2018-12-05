/**
 * @param {Array} nums
 */
function add([num1, num2]) {
  return num1 + num2;
}

console.log(add([1, 2])); // 3


function move({ x = 0, y = 0 } = {}) {
  return [x, y];
}

console.log(move({ x: 1, y: 2 })); // [ 1, 2 ]
console.log(move({})); // [ 0, 0 ]
console.log(move()); // [ 0, 0 ]