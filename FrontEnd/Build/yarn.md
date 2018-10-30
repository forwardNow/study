# yarn

## 1. 介绍

yarn，发音 `[jɑ:n]`，跟中文“呀”差不多。

由 Facebook 发布的包管理器，主要解决 npm 5 之前的两个问题：安装依赖慢，安装版本不一致。

## 2. 缓存

下载包时会先查找缓存 `~/.yarn-cache`，如果缓存里没有才会从镜像源下载。

## 3. 版本锁定

自动创建 `yarn.lock` 文件，锁定依赖的版本。

`package.json` 中的依赖的版本的常用写法：

```javascript
"dependencies": {
  "jquery": "*",         // 3.3.1（最新）
  "jquery": "1.11.1",    // 1.11.1（指定）
  "jquery": "~1.11.1",   // 1.11.x 中最新的版本 1.11.3
  "jquery": "^1.11.1",   // 1.x.x 中最新的版本 1.12.4
}
```

## 4. 选择 yarn 还是 npm

推荐选择 npm 5+，因为在 npm 5+ 中这些问题已经得到解决。

## 5. 参考

* [Yarn vs npm - which Node package manager to use in 2018?](https://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/)
* [一文看懂npm、yarn、pnpm之间的区别](https://blog.csdn.net/qiansg123/article/details/80129453)