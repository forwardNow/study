# JSX

## 1. 说明

在 JS 文件中，默认不能直接写 HTML 代码。

可以使用 babel 来转换这些 JS 中的 HTML 代码。

这种在 JS 中，混合 HTML 代码的语法，叫做 JSX（符合 XML 规范的 JS）。

JSX 在运行时，将其转换成了 `React.createElement(...)` 来执行。

## 2. 启用 JSX 语法

```shell
# 安装 babel
$ npm i -D @babel/core babel-loader @babel/preset-env @babel/preset-react

$ npm install --save-dev @babel/plugin-transform-runtime
$ npm install --save @babel/runtime
```

配置 `.babelrc` 文件

```json
{
  "presets": [ "@babel/preset-env", "@babel/preset-react" ],
  "plugins": [ "@babel/plugin-transform-runtime" ]
}
```

配置 webpack `loader`

```javascript
{
  test: /\.js|jsx$/,
  use: 'babel-loader',
  exclude: /node_modules/,
}
```

配置 `.eslintrc.json` 文件，使其支持 jsx 语法：

```json
{
    "extends": "airbnb-base",
    "env": {
      "browser": true,
      "node": true
    },
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true
      }
    }
}
```

## 3. 使用

### 3.1. JS 表达式

语法： `{ exp }`

示例：

```javascript
const msg = '哇哈哈2';
const title = '我是 DIV';

// JSX 数组
const list = [
  <p key='1'>1</p>,
  <p key='2'>2</p>,
];

const list2 = [3, 4].map(item => <p key={ item }>{ item }</p>);

const div = <div title={ title }>
    { msg }
    { list }
    { list2 }
    { [5, 6].map(item => <p key={ item }>{item}</p>) }
  </div>;
```

注意：

* 为属性的值为表达式时，不要用引号包裹 `{ exp }`
* 用 JSX 创建 DOM 时，根节点只能有一个
* 必须符合 XML 语法规范，如标签成对出现，单标签必须闭合
* 在编译 JSX 代码时，遇到 `<标签>` 就将其作为 HTML 编译，遇到 `{}` 就将其作为 JS 编译。

### 3.2. 注释

```jsx
{/* 我是注释 */}
```

### 3.3. 关键词

设置元素属性时，有些属性名是 JS 中的关键词（如 `class`），需要在关键字前面加 `html` 前缀：

* `class` 属性为 `htmlClass`
* `for` 属性为 `htmlFor`
