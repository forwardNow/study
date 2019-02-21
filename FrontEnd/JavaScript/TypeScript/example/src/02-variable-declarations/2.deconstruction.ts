// 解构数组
let nums = [1, 2];

let [first, second] = nums;

console.log(first);  // 1
console.log(second); // 2

// swap variables
[first, second] = [second, first];
console.log(first);  // 2
console.log(second); // 1

// 解构对象
let persion = {
  name: "zhangsan",
  age: 18,
  gender: "男",
};

let { name: uname, ...rest } = persion;
console.log(uname); // zhangsan
console.log(rest); // { age: 18, gender: '男' }

// 展开：展开操作符正与解构相反。 它允许你将一个数组展开为另一个数组，或将一个对象展开为另一个对象。
let arr1 = [1, 2];
let arr2 = [3, 4];
let all = [0, arr2, arr2, 5];
console.log(all); // [ 0, [ 3, 4 ], [ 3, 4 ], 5 ]

let defaults = { fontSize: 100, color: "red" };
let custom = { color: "white" };
let options = { ...defaults, ...custom };
console.log(options); // { fontSize: 100, color: 'white' }
