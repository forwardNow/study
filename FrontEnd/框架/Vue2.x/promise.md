# Promise

## 介绍

Promise 的就是为了解决回调地狱问题的，并不能帮我们减少代码量。

**Promise 是一个构造函数**：

```text
console.dir(Promise);

ƒ Promise()
  all: ƒ all()
  arguments: (...)
  caller: (...)
  length: 1
  name: "Promise"
  prototype: Promise
    catch: ƒ catch()
    constructor: ƒ Promise()
    finally: ƒ finally()
    then: ƒ then()
    Symbol(Symbol.toStringTag): "Promise"
    __proto__: Object
  race: ƒ race()
  reject: ƒ reject()
  resolve: ƒ resolve()
  Symbol(Symbol.species): (...)
  get Symbol(Symbol.species): ƒ [Symbol.species]()
  __proto__: ƒ ()
  [[Scopes]]: Scopes[0]
```

**每个 Promise 实例都表示一个异步操作的容器，实例化时需要传入执行器函数（`executor`）**：

* Promsie 实例一创建，就立即执行 `executor(resolve, reject)`
* 通过实例的 `then(resolve, reject)` 方法指定 `executor` 的两个函数参数
* 执行器函数的两个参数（`resolve` 和 `reject`），用于
  * 改变容器的状态（成功或失败）
  * 执行相应的状态的回调

```javascript
const fs = require('fs');

let promise = new Promise((resolve, reject) => {
  fs.readFile('./1.txt', 'utf-8', (err, data) => {
    if (err) {
      // throw err;
      return reject(err);
    }

    return reject(data.toString());
  });
});

promise.then(
  content => console.log(content),
  err => console.log(err),
);
```