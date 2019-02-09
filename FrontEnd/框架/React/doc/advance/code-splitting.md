# 代码分割

## 1. 打包（捆绑）

大多数 React 应用程序将使用 Webpack 或 Browserify 等工具“捆绑”（“bundled”）其文件。 捆绑（bundling）是跟踪导入文件并将它们合并到单个文件中的过程：“捆绑”。 然后，可以将此捆绑包包含在网页上，以立即加载整个应用。

### 1.1. 示例

App:

```jsx
// app.js
import { add } from './math.js';

console.log(add(16, 26)); // 42
```

```jsx
// math.js
export function add(a, b) {
  return a + b;
}
```

Bundle:

```jsx
function add(a, b) {
  return a + b;
}

console.log(add(16, 26)); // 42
```

>注意：
>
>您的捆绑包最终会看起来与此不同。

如果您正在使用 Create React App，Next.js，Gatsby 或类似工具，您将拥有一个开箱即用的 Webpack 设置来捆绑您的应用程序。

如果你不是，你需要自己设置捆绑。 例如，请参阅 Webpack 文档上的“安装和入门”指南。