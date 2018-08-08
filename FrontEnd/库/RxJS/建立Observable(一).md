 # 建立 Observable(一)

>Observable 是 RxJS 的核心，今天让我们从如何建立 Observable 开始！

前几天我们把所有重要的观念及前置的知识都讲完了，今天要正式进入 RxJS 的应用，整个 RxJS 说白了就是 **一个核心三个重点**。

**一个核心** 是 Observable 再加上相关的 Operators(map, filter...)，这个部份是最重要的，其他三个重点本质上也是围绕着这个核心在转

**三个重点**分别是

* Observer
* Subject
* Schedulers

Observer 是这三个当中一定会用到却是最简单的。

Subject 一般应用到的频率就相对低很多，但如果想要看懂 RxJS 相关的 Library 或 Framework，Subject 就是一定要会的重点。

Schedulers 则是要解决 RxJS 衍伸出的最后一道问题

## 1. 建立 Observable: `create`

建立 Observable 的方法有非常多种，其中 `create` 是最基本的方法。`create` 方法在 `Rx.Observable` 对象中，要传入一个 callback function ，这个 callback function 会接收一个 observer 参数，如下

```javascript
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
    })
```

这个 callback function 会定义 observable 将会如何发送值。

>虽然 Observable 可以被 `create`，但实际上我们通常都使用 creation operator 像是 from, of, fromEvent, fromPromise 等。这里只是为了从基本的开始讲解所以才用 `create`

我们可以订阅这个 observable，来接收他送出的值，代码如下

```javascript
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
    })
    
// 订阅这个 observable	
observable.subscribe(function(value) {
    console.log(value);
})
```

当我们订阅这个 observable，他就会依序送出 `'Jerry'` `'Anna'` 两个字符串。

>订阅 Observable 跟 addEventListener 在实现上其实有非常大的不同。虽然在行为上很像，但实际上 Observable 根本没有管理一个订阅的清单，这个部份的细节我们留到最后说明！

这里有一个重点，很多人认为 RxJS 是在做非同步处理，所以所有行为都是非同步的。但其实这个观念是错的，RxJS 确实主要在处理非同步行为没错，但也同时能处理同步行为，像是上面的程式码就是同步执行的。

证明如下

```javascript
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
    })
    
console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');
```

上面这段代码会打印出
```
start
Jerry
Anna
end
```

所以很明显的这段代码是同步执行的，当然我们可以拿它来处理非同步的行为！

```javascript
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Anna');
        
        setTimeout(() => {
            observer.next('RxJS 30 days!');
        }, 30)
    })
    
console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');
```

这时就会打印出

```
start
Jerry
Anna
end
RxJS 30 days!
```

从上述的代码能看得出来

**Observable 同时可以处理同步与非同步的行为！**


## 2. 观察者 Observer

Observable 可以被订阅(subscribe)，或说可以被观察，而订阅 Observable 的对象又称为 **观察者(Observer)**。观察者是一个具有三个方法(method)的对象，每当 Observable 发生事件时，便会调用观察者相对应的方法。

>注意这里的观察者(Observer)跟上一篇讲的观察者模式(Observer Pattern)无关，观察者模式是一种设计模式，是思考问题的解决过程，而这里讲的观察者是一个被定义的对象。

观察者的三个方法(method)：

* next：每当 Observable 发送出新的值，next 方法就会被调用。
* complete：在 Observable 没有其他的数据可以取得时，complete 方法就会被调用，在 complete 被调用之后，next 方法就不会再起作用。
* error：每当 Observable 内发生错误时，error 方法就会被调用。

说了这么多，我们还是直接来建立一个观察者吧！

```javascript
var observable = Rx.Observable
    .create(function(observer) {
            observer.next('Jerry');
            observer.next('Anna');
            observer.complete();
            observer.next('not work');
    })
    
// 宣告一个观察者，具备 next, error, complete 三个方法
var observer = {
    next: function(value) {
        console.log(value);
    },
    error: function(error) {
        console.log(error)
    },
    complete: function() {
        console.log('complete')
    }
}

// 用我们定义好的观察者，来订阅这个 observable	
observable.subscribe(observer)
```

上面这段代码会打印出

```
Jerry
Anna
complete
```

上面的示例可以看得出来在 complete 执行后，next 就会自动失效，所以没有打印出 `not work`。

下面则是产生错误的示例

```javascript
var observable = Rx.Observable
    .create(function(observer) {
        try {
        observer.next('Jerry');
        observer.next('Anna');
        throw 'some exception';
        } catch(e) {
        observer.error(e)
        }
    });
    
// 宣告一个观察者，具备 next, error, complete 三个方法
var observer = {
    next: function(value) {
        console.log(value);
    },
    error: function(error) {
        console.log('Error: ', error)
    },
    complete: function() {
        console.log('complete')
    }
}

// 用我们定义好的观察者，来订阅这个 observable	
observable.subscribe(observer)
```

这里就会执行 error 的 function 打印出 `Error: some exception`。

另外观察者可以是不完整的，他可以只具有一个 next 方法，如下

```javascript
var observer = {
    next: function(value) {
        //...
    }
}
```

>有时候 Observable 会是一个无限的序列，例如 click 事件，这时 complete 方法就有可能永远不会被调用！

我们也可以直接把 next, error, complete 三个 function 依序传入 `observable.subscribe`，如下：

```javascript
observable.subscribe(
    value => { console.log(value); },
    error => { console.log('Error: ', error); },
    () => { console.log('complete') }
)
```

`observable.subscribe` 会在内部自动组成 observer 对象来操作。


## 3. 实现细节

我们前面提到了，其实 Observable 的订阅跟 addEventListener 在实作上有蛮大的差异，虽然他们的行为很像！

addEventListener 本质上就是 Observer Pattern 的实现，在内部会有一份订阅清单，像是我们昨天实现的 Producer

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

我们在内部储存了一份所有的监听者清单(`this.listeners`)，在要发布通知时会对逐一的调用这份清单的监听者。

但在 Observable 不是这样实现的，在其内部并没有一份订阅者的清单。订阅 Observable 的行为比较像是执行一个对象的方法，并把数据传进这个方法中。

我们以下面的代码做说明

```javascript
var observable = Rx.Observable
    .create(function (observer) {
            observer.next('Jerry');
            observer.next('Anna');
    })
    
observable.subscribe({
    next: function(value) {
        console.log(value);
    },
    error: function(error) {
        console.log(error)
    },
    complete: function() {
        console.log('complete')
    }
})
```

像上面这段代码，他的行为比较像这样

```javascript
function subscribe(observer) {
        observer.next('Jerry');
        observer.next('Anna');
}

subscribe({
    next: function(value) {
        console.log(value);
    },
    error: function(error) {
        console.log(error)
    },
    complete: function() {
        console.log('complete')
    }
});
```

这里可以看到 subscribe 是一个 function，这个 function 执行时会传入观察者，而我们在这个 function 内部去执行观察者的方法。

订阅一个 Observable 就像是执行一个 function

## 4. 今日小结

今天在讲关于建立 Observable 的实例，用到了 `create` 的方法，但大部分的内容还是在讲 Observable 几个重要的观念，如下

* Observable 可以同时处理同步跟非同步行为
* Observer 是一个对象，这个对象具有三个方法，分别是 next, error, complete
* 订阅一个 Observable 就像在执行一个 function


