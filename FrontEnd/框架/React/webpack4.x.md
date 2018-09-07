 # webpack 4.x

## 1. 新特性

约定大于配置，以保持一致性与减小配置复杂度，如：

```
${root}/
  dist/
    main.js   # 默认输出文件
  src/    
    index.js  # 默认入口文件
  node_modules/
  package-lock.json
  package.json
  webpack.config.js
```

## 2. 起步

### 2.1. 安装

```shell
$ npm init --yes

$ npm i webpack -D
+ webpack@4.17.2

$ npm i webpack-cli -D
+ webpack-cli@3.1.0
```

### 2.2. package.json

```javascript
{
  "scripts": {
    "dev": "webpack"
  }
}
```

### 2.3. webpack.config.js

```javascript
module.exports = {
  // 'development' | 'production'
  mode: 'development',
};
```

### 2.4. 打包

```shell
$ npm run dev
```