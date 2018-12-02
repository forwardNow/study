(function f1() {
  var num1 = 1;
  var num1 = 2;

  console.log('f1:', num1); // f1: 2
}());

(function f2() {
  let num2 = 3;
  var num2 = 4; // SyntaxError: Identifier 'num2' has already been declared

  console.log('f2:', num2);
}());

(function f3() {
  let num3 = 5;
  let num3 = 6; // SyntaxError: Identifier 'num3' has already been declared

  console.log('f3:', num3);
}());
