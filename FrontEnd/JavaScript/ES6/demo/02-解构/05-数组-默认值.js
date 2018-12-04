const [num = 0] = [];

console.log(num); // 0


const [x, y = 20] = [10];

console.log(x); // 10
console.log(y); // 20


const [m, n = 200] = [100, undefined];

console.log(m); // 100
console.log(n); // 200