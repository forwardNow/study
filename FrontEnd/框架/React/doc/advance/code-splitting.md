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

## 2. 代码拆分

捆绑很棒，但随着您的应用程序的增长，您的捆绑包也会增长。 特别是如果你包括大型第三方库。 您需要密切关注捆绑包中的代码，这样您就不会意外地将其设置得太大，以至于您的应用需要很长时间才能加载。

为了避免非常大的捆绑包，最好先解决问题并开始“拆分”你的捆绑。 [Code-Splitting](https://webpack.js.org/guides/code-splitting/) 是 Webpack 和 Browserify 等捆绑器支持的功能（通过 [factor-bundle](https://github.com/browserify/factor-bundle)），可以创建多个可在运行时动态加载的包。

拆分您的应用的代码可以帮助您“懒惰”加载用户当前需要的东西，这可以明显提高您的应用程序的性能。 虽然您没有减少应用程序中的总代码量，但您已经避免加载用户可能永远不需要的代码，并减少了初始加载期间所需的代码量。

## 3. `import()`

将代码拆分引入应用程序的最佳方法是使用动态 `import()` 语法。

Before:

```jsx
import { add } from './math';

console.log(add(16, 26));
```

After:

```jsx
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

>注意：
>
>动态 `import()` 语法是 ECMAScript（JavaScript）提议，目前不是语言标准的一部分。 预计在不久的将来会被接受。

当 Webpack 遇到这种语法时，它会自动启动代码拆分您的应用程序。 如果您正在使用 Create React App，则已为您配置，您可以立即开始使用它。 它也支持 Next.js 中的开箱即用。

如果你自己设置 Webpack，你可能想要阅读 Webpack 的[代码分割指南](https://webpack.js.org/guides/code-splitting/)。 您的 Webpack 配置应该看起来像[这样](https://gist.github.com/gaearon/ca6e803f5c604d37468b0091d9959269)。

使用 Babel 时，您需要确保 Babel 可以解析动态导入语法，但不会对其进行转换。 为此你需要 [babel-plugin-syntax-dynamic-import](https://yarnpkg.com/en/package/babel-plugin-syntax-dynamic-import)。

## 4. React.lazy

>注意：
>
>`React.lazy` 和 Suspense 尚不可用于服务器端呈现。 如果要在服务器呈现的应用程序中进行代码拆分，我们建议使用[可加载组件](https://github.com/smooth-code/loadable-components)。 它有一个很好的[指南](https://github.com/smooth-code/loadable-components/blob/master/packages/server/README.md)，用于捆绑服务器端渲染。

`React.lazy` 函数允许您将动态导入呈现为常规组件。

Before:

```jsx
mport OtherComponent from './OtherComponent';

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

After:

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <OtherComponent />
    </div>
  );
}
```

当渲染此组件时，这将自动加载包含 `OtherComponent` 的包。

`React.lazy` 采用必须调用动态 `import()` 的函数。 这必须返回一个 `Promise`，它解析为一个带有包含 React 组件的默认导出的模块。

## 5. Suspense

如果在 `MyComponent` 渲染时尚未加载包含 `OtherComponent` 的模块，我们必须在等待加载时显示一些后备内容 - 例如加载指示符。 这是使用 `Suspense` 组件完成的。

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```

`fallback` prop 接受在等待加载组件时要呈现的任何 React 元素。 您可以将 `Suspense` 组件放在惰性组件上方的任何位置。 您甚至可以使用单个 `Suspense` 组件包装多个惰性组件。

```jsx
const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```