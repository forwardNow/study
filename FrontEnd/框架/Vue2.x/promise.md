# Promise

## 1. 介绍

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

## 2. 解决回调地狱

```javascript
const fs = require('fs');

function readFile(filePath) {
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        // throw err;
        return reject(err);
      }

      return reject(data.toString());
    });
  });
}

readFile('./1.txt')
  .then((content) => {
    console.log(content);

    return readFile('./2.txt');
  })
  .then((content) => {
    console.log(content);

    return readFile('./3.txt');
  })
  .then((content) => {
    console.log(content);
  })
;
```

在上一个 `.then()` 的 `resolve()` 中返回一个新的 Promise 实例，可以将多个异步操作进行串联。

## 3. 捕获异常

>`then(resolve, reject)` 中的 `reject` 回调只捕获并处理当前 Promise 的错误，`catch(reject)` 捕获并处理前面所有的 Promise 的错误；前者应用于没有依赖关系的一组 Promise，后者应用于有依赖关系的一组回调。

### 3.1. 失败回调

>应用于：各个 Promise 没有依赖关系；当前 Promise 失败，不会影响后续 Promise 的继续执行。

若前面的 Promise 执行失败，则后续的 Promise 都不会被执行；除非前面的 Promise 指定了失败的回调。

```javascript
// 如果读取 “1.txt” 失败，是不会对后续的 Promise 产生影响的。
readFile('./1.txt')
  .then(
    (content) => {
      console.log(content);

      return readFile('./2.txt');
    },
    (err) => {
      console.log(err);

      return readFile('./2.txt');
    }
  )
  .then((content) => {
    console.log(content);

    return readFile('./3.txt');
  })
  .then((content) => {
    console.log(content);
  })
;
```

前一个 Promise 的 `then(resolve, reject)` 的 `resolve`、`reject` 的返回值都会被后一个 Promise 的 `then(resolve)` 的 `resolve` 接收。

### 3.2. `catch(reject)`

>应用于：各个 Promise 有依赖关系：当前 Promise 失败，就终止后续所有 Promise。

```javascript
readFile('./1.txt')
  .then((content) => {
    console.log(content);

    return readFile('./2.txt');
  })
  .then((content) => {
    console.log(content);

    return readFile('./3.txt');
  })
  .then((content) => {
    console.log(content);
  })
  .catch(err => console.log(err.message));
;
```

## 4. jQuery 中 Promise

>无兼容性

```javascript
jQuery.ajax({
  url: './1.json',
  type: 'GET'
}).then(data => console.log(data));
```