const fs = require('fs');

// 1. 创建一个 Promise 容器
// 给别人一个承诺 I promise you.
// Promise 容器一旦创建，就立即执行里面的代码

const p1 = new Promise((resolve, reject) => {
  // 异步任务
  fs.readFile('data/1.txt', (err, data) => {
    if (err) {
      // Promise 容器中的任务失败
      // 把 Promise 容器的 Pending 状态变为 Rejected
      reject(err);
      // reject 函数是 then 方法通过第二个参数传递进来的
    } else {
      // Promise 容器中的任务成功
      // 把 Promise 容器的 Pending 状态变为 Resolved
      resolve(data);
      // resolve 函数是 then 方法通过第一个参数传递进来的
    }
  });
});


// 2.
// p1 就是那个 Promise 容器
// then(fn1, fn2)
//  fn1：就是 Promise 容器中的 resolve 函数
//  fn2：就是 Promise 容器中的 reject 函数

p1
  .then((data) => {
    console.log(data.toString());
  }, (err) => {
    console.log(err);
  });
