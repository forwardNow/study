const [num = 0] = [undefined];

console.log(num); // 0


const [x = 0] = [null];

console.log(x); // null
