let { toString } = 123;

console.log(toString === Number.prototype.toString); // true


({ toString } = true);

console.log(toString === Boolean.prototype.toString); // true