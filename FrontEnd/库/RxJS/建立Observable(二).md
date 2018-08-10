 # 建立 Observable(二)

>通常我们会通过 creation operator 来建立 Observable 实例，这篇文章会讲解几个较为常用的 operator！

## 1. Creation Operator

Observable 有许多创建实例的方法，称为 creation operator。下面我们列出 RxJS 常用的 creation operator

* create
* of
* from
* fromEvent
* fromPromise
* never
* empty
* throw
* interval
* timer

### 1.1. of

还记得我们昨天用 create 来建立一个同步处理的 observable 吗？

```javascript
var source = Rx.Observable
    .create(function(observer) {
        observer.next('Jerry');
        observer.next('Anna');
        observer.complete();
    });
	
source.subscribe({
    next: function(value) {
    	console.log(value)
    },
    complete: function() {
    	console.log('complete!');
    },
    error: function(error) {
    console.log(error)
    }
});

// Jerry
// Anna
// complete!
```

先后传递了 `'Jerry'`, `'Anna'` 然后结束(complete)，这是一个十分常见模式。当我们想要 **同步** 的传递几个值时，就可以用 `of` 这个 operator 来简洁的表达!

下面的代码行为同上

```javascript
var source = Rx.Observable.of('Jerry', 'Anna');

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});

// Jerry
// Anna
// complete!
```

是不是相较于原本的代码简洁许多呢？

### 1.2. from

其实 `of` operator 的一个一个参数其实就是一个 list，而 list 在 JavaScript 中最常见的形式是数组(array)，那我们有没有办法把一个已存在的数组当作参数呢？

有的，我们可以用 `from` 来接收任何可枚举的参数！

```javascript
var arr = ['Jerry', 'Anna', 2016, 2017, '30 days'] 
var source = Rx.Observable.from(arr);

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});

// Jerry
// Anna
// 2016
// 2017
// 30 days
// complete!
```

任何可枚举的参数都可以用，也就是说像 Set, WeakSet, Iterator 等都可以当作参数！

>因为 ES6 出现后可枚举(iterable)的类型变多了，所以 `fromArray` 就被移除了。

另外 `from` 还能接收字串(string)，如下

```javascript
var source = Rx.Observable.from('吴钦飞');

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});
// 吴
// 钦
// 飞
// complete!
```

上面的代码会把字串里的每个字符一一打印出来。

我们也可以传入 Promise 对象，如下

```javascript
var source = Rx.Observable
  .from(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello RxJS!');
    },3000)
  }))
  
source.subscribe({
    next: function(value) {
    	console.log(value)
    },
    complete: function() {
    	console.log('complete!');
    },
    error: function(error) {
      console.log(error)
    }
});

// Hello RxJS!
// complete!
```

如果我们传入 Promise 对象实例，当正常返回时，就会被送到 next，并立即发送完成通知，如果有错误则会执行 error。

>这里也可以用 `fromPromise` ，会有相同的结果。

### 1.3. fromEvent

我们也可以用 Event 建立 Observable，通过 fromEvent 的方法，如下

```javascript
var source = Rx.Observable.fromEvent(document.body, 'click');

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});

// MouseEvent {...}
```

`fromEvent` 的第一个参数要传入 DOM 对象，第二个参数传入要监听的事件名称。上面的代码会针对 body 的 click 事件做监听，每当点击 body 就会打印出 event。

>取得 DOM 物件的常用方法：<br>
>`document.getElementById()` <br>
>`document.querySelector()` <br>
>`document.getElementsByTagName()` <br>
>`document.getElementsByClassName()`

#### 1.3.1. 自定义事件 fromEventPattern

要用 Event 来建立 Observable 实例还有另一个方法 `fromEventPattern`，这个方法是给类事件使用。

所谓的类事件就是指其行为跟事件相像，同时具有注册监听及移除监听两种行为，就像 DOM Event 有 addEventListener 及 removeEventListener 一样！

举一个例子，我们在之前实现的 Observer Pattern 就是类事件，程式码如下：

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
// ------- 以上都是之前的程式码 -------- //

var egghead = new Producer(); 
// egghead 同时具有 注册监听者及移除监听者 两种方法

var source = Rx.Observable
    .fromEventPattern(
        (handler) => egghead.addListener(handler), 
        (handler) => egghead.removeListener(handler)
    );
  
source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
})

egghead.notify('Hello! Can you hear me?');
// Hello! Can you hear me?
```

上面的代码可以看到，`egghead` 是 `Producer` 的实例，同时具有 注册监听及移除监听两种方法，我们可以将这两个方法依序传入 `fromEventPattern` 来建立 Observable 的实例！

>这里要注意不要直接将方法传入，避免 this 出错！也可以用 bind 来写。

```javascript
Rx.Observable
    .fromEventPattern(
        egghead.addListener.bind(egghead), 
        egghead.removeListener.bind(egghead)
    )
    .subscribe(console.log)
```

### 1.4. empty, never, throw

接下来我们要看几个比较无趣的 operators，之后我们会讲到很多 observables 合并(combine)、转换(transforme)的方法，到那个时候无趣的 observable 也会很有用！

有点像是数学上的 **零(0)** ，虽然有时候好像没什么，但却非常的重要。在 Observable 的世界里也有类似的东西，像是 `empty`

```javascript
var source = Rx.Observable.empty();

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});
// complete!
```

`empty` 会给我们一个空的 observable，如果我们订阅这个 observable 会发生什么事呢？ 它会立即发送 complete 的通知！

>可以直接把 `empty` 想成没有做任何事，但它至少会告诉你它没做任何事。

数学上还有一个跟零(0)很像的数，那就是 **无穷(∞)** ，在 Observable 的世界里我们用 `never` 来建立无穷的 observable

```javascript
var source = Rx.Observable.never();

source.subscribe({
    next: function(value) {
        console.log(value)
    },
    complete: function() {
        console.log('complete!');
    },
    error: function(error) {
        console.log(error)
    }
});
```

`never` 会给我们一个无穷的 observable，如果我们订阅它又会发生什么事呢？...什么事都不会发生，它就是一个一直存在但却什么都不做的 observable。

>可以把 `never` 想像成一个结束在无穷久以后的 observable，但你永远等不到那一天！

最后还有一个 operator `throw`，它也就只做一件事就是抛出错误。

```javascript
var source = Rx.Observable.throw('Oop!');

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// Throw Error: Oop!
```

上面这段代码就只会 log 出 `'Throw Error: Oop!'`。

这三个 operators 虽然目前看起来没什么用，但之后在文章中大家就会慢慢发掘它们的用处！

### 1.5. interval, timer

接着我们要看两个跟时间有关的 operators，在 JS 中我们可以用 `setInterval` 来建立一个持续的行为，这也能用在 Observable 中

```javascript
var source = Rx.Observable.create(function(observer) {
    var i = 0;
    setInterval(() => {
        observer.next(i++);
    }, 1000)
});

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// 1
// 2
// .....
```

上面这段程式码，会每隔一秒发送出一个从零开始递增的整数，在 Observable 的世界也有一个 operator 可以更方便地做到这件事，就是 `interval`

```javascript
var source = Rx.Observable.interval(1000);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// 1
// 2
// ...
```

interval 接收一个参数，必须是数值(Number)，这的数值代表发出讯号的间隔时间(ms)。这两段程式码基本上是等价的，会持续每隔一秒送出一个从零开始递增的数值！

另外有一个很相似的 operator 叫 `timer`， `timer` 可以给两个参数，如下

```javascript
var source = Rx.Observable.timer(1000, 5000);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// 1
// 2 ...
```

当 `timer` 有两个参数时，第一个参数代表要发出第一个值的等待时间(ms)，第二个参数代表第一次之后发送值的间隔时间，所以上面这段程式码会先等一秒送出 1 之后每五秒送出 2, 3, 4, 5...。

`timer` 第一个参数除了可以是数值(Number)之外，也可以是日期(Date)，就会等到指定的时间在发送第一个值。

另外 `timer` 也可以只接收一个参数

```javascript
var source = Rx.Observable.timer(1000);

source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});
// 0
// complete!
```

上面这段代码就会等一秒后送出 0 同时通知结束。

## 2. Subscription

今天我们讲到很多 无穷的 observable，例如 interval, never。但有时我们可能会在某些行为后不需要这些数据，要做到这件事最简单的方式就是 `unsubscribe`。

其实在订阅 observable 后，会回传一个 subscription 物件，这个物件具有释放资源的 `unsubscribe` 方法，范例如下

```javascript
var source = Rx.Observable.timer(1000, 1000);

// 取得 subscription
var subscription = source.subscribe({
  next: function(value) {
    console.log(value)
  },
  complete: function() {
    console.log('complete!');
  },
  error: function(error) {
    console.log('Throw Error: ' + error)
  }
});

setTimeout(() => {
    // 停止订阅(退订)， RxJS 4.x 以前的版本用 dispose()
    subscription.unsubscribe() 
}, 5000);
// 0
// 1
// 2
// 3
// 4
```

这里我们用了 `setTimeout` 在 5 秒后，执行了 `subscription.unsubscribe()` 来停止订阅并释放资源。另外 subscription 对象还有其他合并订阅等作用，这个我们之后有机会会在提到！

>Events observable 尽量不要用 `unsubscribe` ，通常我们会使用 `takeUntil` ，在某个事件发生后来完成 Event observable，这个部份我们之后会讲到！


## 3. 小结

今天我们把建立 Observable 实例的方法几乎都讲完了，建立 Observable 是 RxJS 的基础，接下来我们会讲转换(Transformation)、过滤(Filter)、合并(Combination)等 Operators。