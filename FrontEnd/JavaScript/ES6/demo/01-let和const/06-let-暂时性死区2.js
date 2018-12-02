var num = 123;

{
  // <--- TDZ 开始
  console.log(num); // ReferenceError: num is not defined
  let num;
  // TDZ 结束 --->

  console.log(num); // undefined;
}