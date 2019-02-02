# 条件渲染

在 React 中，您可以创建封装不同行为的组件。 然后，您只能渲染其中一些，具体取决于您的应用程序的状态。

React 中的条件渲染与 JavaScript 中的条件相同。 使用像 `if` 或[条件运算符](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)这样的 JavaScript 运算符来创建表示当前状态的元素，并让 React 更新 UI 以匹配它们。

考虑这两个组件：

```jsx
function UserGreeting(props) {
  return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
  return <h1>Please sign up.</h1>;
}
```

我们将创建一个 `Greeting` 组件，根据用户是否登录显示这些组件中的任何一个：

```jsx
function Greeting(props) {
  const isLoggedIn = props.isLoggedIn;
  if (isLoggedIn) {
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/ZpVxNq?editors=0011)

此示例根据 `isLoggedIn` 的值呈现不同的问候语。

## 1. 元素变量

您可以使用变量来存储元素。 这可以帮助您有条件地渲染组件的一部分，而其余的输出不会更改。

考虑这两个代表 `Logout` 和 `Login` 按钮的新组件：

```jsx
function LoginButton(props) {
  return (
    <button onClick={props.onClick}>
      Login
    </button>
  );
}

function LogoutButton(props) {
  return (
    <button onClick={props.onClick}>
      Logout
    </button>
  );
}
```

在下面的示例中，我们将创建一个名为 `LoginControl` 的有状态组件。

```jsx
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let button;

    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/QKzAgB?editors=0010)

虽然声明变量并使用 `if` 语句是有条件地渲染组件的好方法，但有时您可能希望使用更短的语法。 有几种方法可以在 JSX 中内联条件，如下所述。

## 2. 内联 If 与 `&&` 操作符

您可以通过将它们包装在花括号中来在 JSX 中[嵌入任何表达式](https://reactjs.org/docs/introducing-jsx.html#embedding-expressions-in-jsx)。 这包括 JavaScript 逻辑 `&&` 运算符。 它可以很方便地根据条件包含一个元素：

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 &&
        <h2>
          You have {unreadMessages.length} unread messages.
        </h2>
      }
    </div>
  );
}

const messages = ['React', 'Re: React', 'Re:Re: React'];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById('root')
);
```

[在 CodePen 上试一试](https://codepen.io/gaearon/pen/ozJddz?editors=0010)

它的工作原理是因为在 JavaScript 中，`true && 表达式` 总是求值为 `表达式`，而 `false && 表达式` 总是求值为 `false`。

因此，如果条件为 `true`，则 `&&` 之后的元素将出现在输出中。 如果是 `false`，React 将忽略并跳过它。

## 3. 内联 If-Else 与条件运算符

有条件地呈现内联元素的另一种方法是使用 JavaScript 条件运算符 [`condition ? true : false`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)。

在下面的示例中，我们使用它来有条件地渲染一小块文本。

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

它也可以用于更大的表达式，尽管它不太明显发生了什么：

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn ? (
        <LogoutButton onClick={this.handleLogoutClick} />
      ) : (
        <LoginButton onClick={this.handleLoginClick} />
      )}
    </div>
  );
}
```

就像在 JavaScript 中一样，您可以根据您和您的团队认为更具可读性的方式来进行条件渲染。 还要记住，只要条件变得过于复杂，就可能是[提取组件](https://reactjs.org/docs/components-and-props.html#extracting-components)的好时机。