function f() {
  console.log('hello world');
  return 0;
}

const [x = f()] = [1];

console.log(x); // 1