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
//=> { value: 1, done: false }
iterator.next();
//=> { value: 2, done: false }
iterator.next();
//=> { value: 3, done: false }
iterator.next();
//=> { value: undefined, done: true }
```

JavaScript 的 Iterator 只有一个 next 方法，这个 next 方法只会返回这两种结果：

1. 在最后一个元素前： `{ done: false, value: elem }`
2. 在最后一个元素之后： `{ done: true, value: undefined }`

当然我们可以自己实现简单的 Iterator Pattern

```javascript
class IteratorFromArray {
    constructor(arr) {
        this._array = arr;
        this._cursor = 0;
    }

    next() {
        return this._cursor < this._array.length ?
        { value: this._array[this._cursor++], done: false } :
        { done: true };
    }
}
```

Iterator Pattern 虽然很单纯，但同时带来了两个优势:

1. 它渐进式取得数据的特性可以拿来做延迟运算(Lazy evaluation)，让我们能用它来处理大数据结构
2. 因为 iterator 本身是序列，所以可以实现所有数组的运算方法像 map, filter... 等

这里我们利用最后一段代码实现 map 试试

```javascript
class IteratorFromArray {
    constructor(arr) {
        this._array = arr;
        this._cursor = 0;
    }

    next() {
        return this._cursor < this._array.length ?
        { value: this._array[this._cursor++], done: false } :
        { done: true };
    }
    
    map(callback) {
        const iterator = new IteratorFromArray(this._array);
        return {
            next: () => {
                const { done, value } = iterator.next();
                return {
                    done: done,
                    value: done ? undefined : callback(value)
                }
            }
        }
    }
}

var iterator = new IteratorFromArray([1,2,3]);
var newIterator = iterator.map(value => value + 3);

newIterator.next();
//=> { value: 4, done: false }
newIterator.next();
//=> { value: 5, done: false }
newIterator.next();
//=> { value: 6, done: false }
```

### 2.1. 补充: 延迟运算(Lazy evaluation)

延迟运算，或说 call-by-need，是一种运算策略(evaluation strategy)，简单来说我们延迟一个表达式的运算时机直到真正需要它的值在做运算。

以下我们用 generator 实现 iterator 来举一个例子

```javascript
function* getNumbers(words) {
    for (let word of words) {
        if (/^[0-9]+$/.test(word)) {
            yield parseInt(word, 10);
        }
    }
}

const iterator = getNumbers('30 天精通 RxJS (04)');

iterator.next();
//=> { value: 3, done: false }
iterator.next();
//=> { value: 0, done: false }
iterator.next();
//=> { value: 0, done: false }
iterator.next();
//=> { value: 4, done: false }
iterator.next();
//=> { value: undefined, done: true }
```

这里我们写了一个函式用来抓取字串中的数字，在这个函数中我们用 for...of 的方式来取得每个字符并用正则表示式来判断是不是数值，如果为真就转成数值并返回。当我们把一个字符串丢进 `getNumbers` 函数时，并没有马上运算出字符串中的所有数字，必须等到我们执行 `next()` 时，才会真的做运算，这就是所谓的延迟运算(evaluation strategy)

## 3. Observable

在了解 Observer 跟 Iterator 后，不知道大家有没有发现其实 Observer 跟 Iterator 有个共通的特性，就是他们都是 渐进式(progressive) 的取得数据，差别只在于 Observer 是生产者(Producer)推送数据(push)，而 Iterator 是消费者(Consumer)要求数据(pull)!

Observable 其实就是这两个 Pattern 思想的结合，Observable 具备生产者推送数据的特性，同时能像序列，拥有序列处理数据的方法(map, filter...)！

更简单的来说，Observable 就像是一个序列，里面的元素会随着时间推送。

>注意这里讲的是 思想的结合，Observable 跟 Observer 在实现上还是有差异，这我们在下一篇文章中讲到。

## 4. 今日小结

今天讲了 Iterator 跟 Observer 两个 Pattern，这两个 Pattern 都是渐进式的取得元素，差异在于 Observer 是靠生产者推送数据，Iterator 则是消费者去要求数据，而 Observable 就是这两个思想的结合！

