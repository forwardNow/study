 # 什么是Observable.md

>整个 RxJS 的基础就是 Observable，只要弄懂 Observable 就算是学会一半的 RxJS 了，剩下的就只是一些方法的练习跟熟悉；但到底什么是 Observable 呢？

要理解 Observable 之前，我们必须先谈谈两个设计模式(Design Pattern)， Iterator Pattern 跟 Observer Pattern。今天这篇文章会带大家快速的了解这两个设计模式，并解释这两个 Pattern 跟 Observable 之间的关系！

## 1. Observer Pattern

Observer Pattern 其实很常遇到，在许多 API 的设计上都用了 Observer Pattern 实现，最简单的例子就是 DOM 对象的事件监听，代码如下

```javascript
function clickHandler(event) {
    console.log('user click!');
}

document.body.addEventListener('click', clickHandler)
```

在上面的程式码，我们先声明了一个 `clickHandler` 函数，再用 DOM 对象 (范例是 body) 的 `addEventListener` 来监听点击(click)事件，每次使用者在 body 点击鼠标就会执行一次 `clickHandler`，并把相关的数据(event)带进来！这就是观察者模式，我们可以对某件事注册监听，并在事件发生时，自动执行我们注册的监听者(listener)。

Observer 的观念其实就这么的简单，但笔者希望能通过代码带大家了解，如何实现这样的 Pattern！

首先我们需要一个构造器，这个构造器 new 出来的实例可以被监听。

```javascript
class Producer {
    constructor() {
        this.listeners = [];
    }
    addListener(listener) {
        if(typeof listener === 'function') {
            this.listeners.push(listener)
        } else {
            throw new Error('listener 必须是 function')
        }
    }
    removeListener(listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1)
    }
    notify(message) {
        this.listeners.forEach(listener => {
            listener(message);
        })
    }
}
```

有了上面的代码后，我们就可以来建立对象实例了

```javascript
var egghead = new Producer(); 
// new 出一个 Producer 实例叫 egghead

function listener1(message) {
    console.log(message + 'from listener1');
}

function listener2(message) {
    console.log(message + 'from listener2');
}

egghead.addListener(listener1); // 注册监听
egghead.addListener(listener2);

egghead.notify('A new course!!') // 当某件事情方法时，执行
```

当我们执行到这里时，会打印：

```
a new course!! from listener1
a new course!! from listener2
```

每当 `egghead.notify` 执行一次，`listener1` 跟 `listener2` 就会被通知，而这些 listener 可以额外被添加，也可以被移除！

虽然我们的实现很简单，但它很好的说明了 Observer Pattern 如何在事件(event)跟监听者(listener)的互动中做到解耦合(decoupling)。

## 2. Iterator Pattern

Iterator 是一个对象，它的就像是一个指针(pointer)，指向一个数据结构并产生一个序列(sequence)，这个序列会有数据结构中的所有元素(element)。

先让我们来看看原生的 JS 要怎么建立 iterator

```javascript
var arr = [1, 2, 3];

var iterator = arr[Symbol.iterator]();

iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: 2, done: false }
iterator.next();
// { value: 3, done: false }
iterator.next();
// { value: undefined, done: true }
```