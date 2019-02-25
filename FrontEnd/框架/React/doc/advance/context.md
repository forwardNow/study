# 上下文

Context 提供了一种通过组件树传递数据的方法，而无需在每个级别手动传递 props。

在典型的 React 应用程序中，数据通过 props 自上而下传递（父传子），但这对于应用程序中许多组件所需的某些类型的 props（例如区域设置首选项、UI 主题）来说可能很麻烦。 Context 提供了一种在组件之间共享这些值的方法，而无需通过树的每个级别显式传递 prop。

## 1. 何时使用 Context

Context 旨在共享可被视为 React 组件树的“全局”数据，例如当前经过身份验证的用户、主题或首选语言。 例如，在下面的代码中，我们手动一层一层向下传递 `theme` prop 来设置 Button 组件的样式：

```jsx
class App extends React.Component {
  render() {
    return <Toolbar theme="dark" />;
  }
}

function Toolbar(props) {
  // The Toolbar component must take an extra "theme" prop
  // and pass it to the ThemedButton. This can become painful
  // if every single button in the app needs to know the theme
  // because it would have to be passed through all components.
  return (
    <div>
      <ThemedButton theme={props.theme} />
    </div>
  );
}

class ThemedButton extends React.Component {
  render() {
    return <Button theme={this.props.theme} />;
  }
}
```

使用 context，我们可以避免通过中间元素传递 props：

```jsx
// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "light" as the default).
const ThemeContext = React.createContext('light');

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    return <Button theme={this.context} />;
  }
}
```

## 2. 在使用 context 之前

context 主要用于当一些数据需要在不同的嵌套级别上被许多组件访问时。 谨慎应用它，因为它使组件重用更加困难。

如果您只想避免逐层传递 prop，那么[组件组合](https://reactjs.org/docs/composition-vs-inheritance.html)通常比上下文更简单。

例如，考虑一个传递用户的页面组件和avatarSize支持几个级别，以便深层嵌套的链接和头像组件可以读取它：

例如，一个 `Page` 组件，向下层传递 `user`、`avatarSize` 属性，以便嵌套很深的的 `Link` 、 `Avatar` 组件可以读取它：

```jsx
<Page user={user} avatarSize={avatarSize} />
// ... which renders ...
<PageLayout user={user} avatarSize={avatarSize} />
// ... which renders ...
<NavigationBar user={user} avatarSize={avatarSize} />
// ... which renders ...
<Link href={user.permalink}>
  <Avatar user={user} size={avatarSize} />
</Link>
```

如果最终只有 `Avatar` 组件确实需要它，那么将 `user` 和 `avatarSize` prop 传递给多个级别可能会感到多余。 同样令人讨厌的是，当 `Avatar` 组件从顶部需要更多 prop 时，您也必须在所有中间级别添加它们。

在没有上下文的情况下解决此问题的一种方法是传递 `Avatar` 组件本身，以便中间组件不需要知道 `user` prop：

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// Now, we have:
<Page user={user} />
// ... which renders ...
<PageLayout userLink={...} />
// ... which renders ...
<NavigationBar userLink={...} />
// ... which renders ...
{props.userLink}
```

通过此更改，只有最顶层的 `Page` 组件需要了解 `Link` 和 `Avatar` 组件对 `user` 和 `avatarSize` 的使用。

在许多情况下，这种控制反转可以使代码更加清晰，它减少需要要传递的 prop 的数量并对根组件进行更多控制。 但是，这不能在所有场景使用：将负责度转移到更高层级的组件，会使底层组件更灵活且难掌控。

一个组件可以由多个子组件。您可以传递多个孩子，甚至可以为孩子们分别设置多个“插槽”，如下所示：

```jsx
function Page(props) {
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavigationBar>
      <Link href={user.permalink}>
        <Avatar user={user} size={props.avatarSize} />
      </Link>
    </NavigationBar>
  );
  return (
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
```

当需要解耦父子组件时，这种方式可以满足大多数情况。如果子组件在渲染之前需要与父组件通信，可以使用 props 属性。

但是，有时需要树中的许多（不同的嵌套级别的）组件可以访问相同的数据。 上下文允许您将此类数据“广播”到下面的所有组件并对其进行更改。 上下文主要应用于，如管理当前 locale、theme、数据缓存。