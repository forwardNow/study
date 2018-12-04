const [num1, [num2, num3]] = [1, [2, 3]];

console.log(num1); // 1
console.log(num2); // 2
console.log(num3); // 3


const [, , third] = ['first', 'second', 'third'];

console.log(third); // third


const [x, , z] = [10, 20, 30];

console.log(x); // 10
console.log(z); // 30


const [head, ...rest] = [1, 2, 3, 4];

console.log(head); // 1
console.log(rest); // [ 2, 3, 4 ]


const [one, ...others] = [1];

console.log(one); // 1
console.log(others); // []