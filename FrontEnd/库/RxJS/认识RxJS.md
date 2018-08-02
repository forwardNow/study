 # 认识 RxJS

在网页的世界存取任何资源都是非同步(Async)的，比如说我们希望拿到一个档案，要先发送一个请求，然后必须等到返回档案，再执行对这个档案的操作。这就是一个非同步的行为，而随着网页需求的复杂化，我们所写的 JavaScript 就有各种针对非同步行为的写法，例如使用 callback 或是 Promise 甚至是新的语法糖 async/await —— 但随着应用需求愈来愈复杂，编写非同步的代码仍然非常困难。

## 1. 非同步常见的问题

* 竞态条件 (Race Condition)
* 内存泄漏 (Memory Leak)
* 复杂的状态 (Complex State)
* 例外处理 (Exception Handling)

### 1.1. Race Condition

每当我们对同一个资源同时做多次的非同步存取时，就可能发生 Race Condition 的问题。比如说我们发了一个 Request 更新用户A的资料，然后我们又立即发送另一个 Request 取得用户A的资料，这时第一个 Request 和第二个 Request 先后顺序就会影响到最终接收到的结果不同，这就是 Race Condition。

### 1.2. Memory Leak

Memory Leak 是最常被大家忽略的一点。原因是在传统网站的行为，我们每次切换页面都是整页重刷，并重新执行 JavaScript，所以不太需要理会内存的问题！但是当我们希望将网站做得像应用程式时，这件事就变得很重要。例如做 SPA (Single Page Application) 网站时，我们是通过 JavaScript 来达到切换页面的内容，这时如果有对 DOM 注册监听事件，而没有在适当的时机点把监听的事件移除，就有可能造成 Memory Leak。比如说在 A 页面监听 body 的 scroll 事件，但切换到 B 页面时，没有把 scroll 的监听事件移除。

### 1.3. Complex State

当有非同步行为时，应用程式的状态就会变得非常复杂！比如说我们有一支付费用户才能播放的影片，首先可能要先抓取这部影片的资讯，接着我们要在播放时去验证使用者是否有权限播放，而使用者也有可能再按下播放后又立即按了取消，而这些都是非同步执行，这时就会各种复杂的状态需要处理。

### 1.4. Exception Handling

JavaScript 的 try/catch 可以捕捉同步的例外，但非同步的程式就没这么容易，尤其当我们的非同步行为很复杂时，这个问题就愈加明显。

## 2. 各种不同的 API

我们除了要面对非同步会遇到的各种问题外，还需要烦恼很多不同的 API

* DOM Events
* XMLHttpRequest
* WebSockets
* Timer
* ......

上面列的 API 都是非同步的，但他们都有各自的 API 及写法！如果我们使用 RxJS，上面所有的 API 都可以通过 RxJS 来处理，就能用同样的 API 操作 (RxJS 的 API)。

假如我们想要监听点击事件(click event)，但点击一次之后不再监听。

原生 JavaScript

```javascript
var handler = (e) => {
    console.log(e);
    document.body.removeEventListener('click', handler); // 结束监听
}

// 注册监听
document.body.addEventListener('click', handler);
```

使用 Rx 大概的样子

```javascript
Rx.Observable
    .fromEvent(document.body, 'click') // 注册监听
    .take(1) // 只取一次
    .subscribe(console.log);
```

大致上能看得出来我们在使用 RxJS 后，不管是针对 DOM Event 还是上面列的各种 API 我们都可以透过 RxJS 的 API 来操作，像是范例中用 `take(n)` 来设定只取一次，之后就释放内存。

说了这么多，其实就是简单一句话

**在面对日益复杂的问题，我们需要一个更好的解决方法。**


## 3. RxJS 基本介绍

RxJS 是一套由 Observable sequences 来组合 **非同步行为** 和 **事件基础** 程序的 Library！

这也被称为 Functional Reactive Programming，更切确地说是指 Functional Programming 及 Reactive Programming 两个编程思想的结合。

### 3.1. 关于 Reactive Extension (Rx)

Rx 最早是由微软开发的 LinQ 扩展出来的开源专案，之后主要由社群的工程师贡献，有多种语言支援，也被许多科技公司所采用，如 Netflix, Trello, Github, Airbnb...等。

#### 3.1.1. Rx 的相关资讯

* 开源专案 (Apache 2.0 License)
* 多种语言支持
    * JavaScript
    * Java
    * C#
    * Python
    * Ruby
    * ...(太多了列不完)

### 3.2. Functional Reactive Programming

Functional Reactive Programming 是一种编程范式(programming paradigm)，白话就是一种写程序的方法论！举个例子，像 OOP 就是一种编程范式，OOP 告诉我们要使用对象的方式来思考问题，以及编写程序。而 Functional Reactive Programming 其实涵盖了 Reactive Programming 及 Functional Programming 两种编程思想。

**Functional Programming**

如果要用一句话来总结 Functional Programming，那就是用 function 来思考我们的问题，以及编写程序。

**Reactive Programming**

很多人一谈到 Reactive Programming 就会直接联想到是在讲 RxJS，但实际上 Reactive Programming 仍是一种编程范式，在不同的场景都有机会遇到，而非只存在于 RxJS。

Reactive Programming 简单来说就是当变量或资源发生变化时，变量或资源自动告诉我发生变化了

这句话看似简单，其实背后隐含两件事
* 当发生变化 => 非同步：不知道什么时候会发生变化，反正变化时要跟我说
* 由变量自动告知我 => 我不用自己写如何通知发生变化的程序

当我们在使用 vue 开发时，只要一有绑定的变量发生改变，相关的变量及界面也会跟着变动，而开发者不需要写这其中如何通知发生变化的每一步程序，只需要专注在发生变化时要做什么事，这就是典型的 Reactive Programming (记得必须是由变数或资源主动告知！)

Rx 基本上就是上述的两个观念的结合，这个部份读者在看完之后的文章，会有更深的体悟。

