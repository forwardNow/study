var num = 1;

function f1() {
  console.log(num);
  if (false) {
    var num = 100;
  }
}

function f2() {
  var num;
  console.log(num);
  if (false) {
    num = 100;
  }
}

f1();  // undefined