# RxJS

## 1. 索引

1. [介绍](./介绍.md)
2. [认识RxJS](./认识RxJS.md)
3. [Functional Programming 基本概念](./函数式编程.md)
4. [Functional Programming 通用函数](./函数式编程中的通用函数.md)
5. [什么是 Observable？](./什么是Observable.md)
6. [建立 Observable(一)](./建立Observable(一).md)
7. [建立 Observable(二)](./建立Observable(二).md)
8. [操作符Operator1和图解](./操作符Operator1和图解.md)
9. [操作符Operator2和简单拖拉](./操作符Operator2和简单拖拉.md)
10. [操作符Operator3](./操作符Operator3.md)
11. [操作符Operator4](./操作符Operator4.md)

## 2. 安装

```bash
$ npm i rxjs -S
+ rxjs@6.2.2
added 2 packages from 7 contributors in 5.627s

$ npm install rxjs-compat -S
+ rxjs-compat@6.2.2
added 1 package in 5.004s
```

## 3. 使用

### 3.1. node

```javascript
const Rx = require('rxjs/Observable');

// 在 Observable 类上打补丁
require('rxjs/add/observable/of');
require('rxjs/add/observable/interval');

// 在 Observable 实例上打补丁
require('rxjs/add/operator/map');
require('rxjs/add/operator/take');

const observable = Rx.Observable.of(1, 2, 3).map(x => `${x} !!!`);

observable.subscribe({
  next: value => console.log(value),
});
```

### 3.2. 浏览器

```html
<div style="height: 100px; background: pink;"></div>
<script src="https://unpkg.com/@reactivex/rxjs@5.0.0/dist/global/Rx.js"></script>
<script>
var source = Rx.Observable.interval(1000);
var click = Rx.Observable.fromEvent(document.body, 'click');
var example = source.takeUntil(click);     
   
example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});
// 0
// 1
// 2
// 3
// complete (点击body了
</script>
```

## 4. 参考

* [30 天精通 RxJS 系列](https://ithelp.ithome.com.tw/users/20103367/ironman/1199)
