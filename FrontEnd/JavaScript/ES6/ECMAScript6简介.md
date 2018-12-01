# ECMAScript 6 简介

ECMAScript 6.0

* 说明：简称 ES6，是 JavaScript 语言的下一代标准，于 2015 年 6 月正式发布
* 目标：使 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## 1. ECMAScript 和 JavaScript 的关系

回顾一下历史：

* 1996 年 11 月，JavaScript 的创造者 Netscape 公司，将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。
* 1997 年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

该标准从一开始就是针对 JavaScript 语言制定的，但是之所以不叫 JavaScript 而叫 ECMAScript，有两个原因：

* 商标。Java 已被 Sun 公司注册，JavaScript 被 Netscape 公司注册
* 体现标准制定者。体现这门语言的制定者是 ECMA，不是 Netscape，这样有利于保证这门语言的开放性和中立性。

因此，ECMAScript 和 JavaScript 的关系是

* ECMAScript 是 JavaScript 的规格
* JavaScript 是 ECMAScript 的一种实现，另外 Jscript、ActionScript 也是 ECMAScript 的实现

日常场合，这两个词是可以等价的。

## 2. ES6 与 ECMAScript 2015 的关系

ECMAScript 2015（简称 ES2015）这个词，也是经常可以看到的。它与 ES6 是什么关系呢？

2011 年，ECMAScript 5.1 版发布后，就开始制定 6.0 版了。因此，ES6 这个词的原意，就是指 JavaScript 语言的下一个版本。

但是，因为这个版本（6.0）：

* 引入的语法功能太多
* 在制定过程当中，还有很多组织和个人不断提交新功能。

因此，常规的做法是先发布 6.0 版，过一段时间再发 6.1 版，然后是 6.2 版、6.3 版等等。

但是，标准的制定者想让标准的升级成为常规流程，最终：

* 标准在每年的 6 月份正式发布一次，作为当年的正式版本
* 接下来的时间，就在这个版本的基础上做改动，直到下一年的 6 月份，草案就自然变成了新一年的版本。

这样一来，就不需要以前的版本号了，只要用年份标记就可以了。

* ES6 的第一个版本，就这样在 2015 年 6 月发布了，正式名称就是《ECMAScript 2015 标准》（简称 ES2015）。
* 2016 年 6 月，小幅修订的《ECMAScript 2016 标准》（简称 ES2016）如期发布，这个版本可以看作是 ES6.1 版，因为两者的差异非常小（只新增了数组实例的 `includes` 方法和指数运算符），基本上是同一个标准。
* 根据计划，2017 年 6 月发布 ES2017 标准。

因此：

* ES6 既是一个历史名词，也是一个泛指，含义是 5.1 版以后的 JavaScript 的下一代标准，涵盖了 ES2015、ES2016、ES2017 等等
* ES2015 则是正式名称，特指该年发布的正式版本的语言标准。

## 3. 语法提案的批准流程

任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。

一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。

* Stage 0 - Strawman（展示阶段）
* Stage 1 - Proposal（征求意见阶段）
* Stage 2 - Draft（草案阶段）
* Stage 3 - Candidate（候选人阶段）
* Stage 4 - Finished（定案阶段）

一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 TC39 的官方网站 [Github.com/tc39/ecma262](https://github.com/tc39/ecma262) 查看。
