
 # 1. 核心模块-path

## 1. 说明

操作路径操作的模块。

## 2. 引入

```javascript
const path = require('path');
```

## 3. 常用 API

### 3.1. `path.basename(path[, ext])`

**作用**：

获取最后一部分路径，第二个参数指定忽略的后缀名

**示例**：

```javascript
console.log(path.basename('/a/b/c.txt'));
// c.txt

console.log(path.basename('/a/b/c.txt', '.txt'));
// c
```

### 3.2. `path.dirname(path)`

**作用**：

获取给定路径的父目录

**示例**：

```javascript
console.log(path.dirname('/a/b/c'));
// /a/b

console.log(path.dirname('/a/b/c.txt'));
// /a/b
```

### 3.3. `path.extname(path)`

**作用**：

获取路径的扩展名。

**示例**：

```javascript
path.extname('index.html');
// Returns: '.html'

path.extname('index.coffee.md');
// Returns: '.md'

path.extname('index.');
// Returns: '.'

path.extname('index');
// Returns: ''

path.extname('.index');
// Returns: ''
```

### 3.4. `path.isAbsolute(path)`

**作用**：

是否为绝对路径

**示例**：

```javascript
path.isAbsolute('/foo/bar'); // true
path.isAbsolute('/baz/..');  // true
path.isAbsolute('qux/');     // false
path.isAbsolute('.');        // false
```

### 3.5. `path.join([...paths])`

**作用**：

拼接给定的路径片段。

**示例**：

```javascript
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'
```

### 3.6. `path.parse(path)`

**作用**：

解析为路径对象。

**示例**：

```javascript
path.parse('/home/user/dir/file.txt');
// Returns:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```