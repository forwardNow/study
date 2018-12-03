function f1() {
  let num = 1;
  if (true) {
    let num = 5;
  }

  return num;
}

console.log(f1()); // 1