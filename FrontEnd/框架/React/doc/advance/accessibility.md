# 无障碍

## 1. 为什么是无障碍？

Web 可访问性（也称为 [a11y](https://en.wiktionary.org/wiki/a11y)）是可供每个人使用的网站的设计和构建。 辅助功能支持是必要的，以允许辅助技术解释网页。

React 通常使用标准 HTML 技术完全支持构建可访问的网站。

## 2. 标准和指南

### 2.1. WCAG

[Web 内容可访问性指南（Web Content Accessibility Guidelines，WCAG）](https://www.w3.org/WAI/intro/wcag)提供了创建可访问网站的指南。

以下 WCAG 清单提供了概述：

* [WCAG checklist from Wuhcag](https://www.wuhcag.com/wcag-checklist/)
* [WCAG checklist from WebAIM](http://webaim.org/standards/wcag/checklist)
* [Checklist from The A11Y Project](http://a11yproject.com/checklist.html)

### 2.2. WAI-ARIA

[Web 可访问性计划 - 可访问的富 Internet 应用程序（Web Accessibility Initiative - Accessible Rich Internet Applications）](https://www.w3.org/WAI/intro/aria)文档包含用于构建完全可访问的 JavaScript 小部件的技术。

请注意，JSX 完全支持所有 `aria-*` HTML 属性。 虽然 React 中的大多数 DOM 属性和特性都是 camelCased，但这些属性应该是连字符（也称为 kebab-case，lisp-case等），因为它们是纯 HTML 格式：

```jsx
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

## 3. 语义 HTML

语义 HTML 是 Web 应用程序中可访问性的基础。 使用各种 HTML 元素来强化我们网站中信息的含义通常会为我们提供免费的可访问性。

* [MDN HTML元素参考](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

有时，当我们将 `<div>` 元素添加到 JSX 中以使我们的 React 代码工作时，我们会破坏 HTML 语义，尤其是在使用列表（`<ol>`，`<ul>`和`<dl>`）和 HTML `<table>` 时。 在这些情况下，我们应该使用 [React Fragments](https://reactjs.org/docs/fragments.html) 将多个元素组合在一起。

例如，

```jsx
import React, { Fragment } from 'react';

function ListItem({ item }) {
  return (
    <Fragment>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <ListItem item={item} key={item.id} />
      ))}
    </dl>
  );
}
```

您可以像将任何其他类型的元素一样将项集合映射到片段数组：

```jsx
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        // Fragments should also have a `key` prop when mapping collections
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
```

当您在 `Fragment` 标签上不需要任何道具时，如果您的工具支持它，您可以使用[短语法](https://reactjs.org/docs/fragments.html#short-syntax)：

```jsx
function ListItem({ item }) {
  return (
    <>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </>
  );
}
```

有关详细信息，请参阅[Fragments 文档](https://reactjs.org/docs/fragments.html)。

## 4. 无障碍表格

### 4.1. 标签

每个 HTML 表单控件（例如 `<input>` 和 `<textarea>`）都需要标记为可访问。 我们也需要向屏幕阅读器提供公开的描述性标签。

以下资源向我们展示了如何执行此操作：

* [The W3C shows us how to label elements](https://www.w3.org/WAI/tutorials/forms/labels/)
* [WebAIM shows us how to label elements](http://webaim.org/techniques/forms/controls)
* [The Paciello Group explains accessible names](https://www.paciellogroup.com/blog/2017/04/what-is-an-accessible-name/)

虽然这些标准 HTML 实践可以直接在 React 中使用，但请注意 `for` 特性在 JSX 中写为 `htmlFor`：

```jsx
<label htmlFor="namedInput">Name:</label>
<input id="namedInput" type="text" name="name"/>
```

### 4.2. 向用户告知错误

所有用户都需要了解错误情况。 以下链接向我们展示了如何向屏幕阅读器公开错误文本：

* [The W3C demonstrates user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
* [WebAIM looks at form validation](http://webaim.org/techniques/formvalidation/)

## 5. 聚焦控制

确保您的 Web 应用程序只用键盘就可以完全操作：

* [WebAIM talks about keyboard accessibility](http://webaim.org/techniques/keyboard/)

### 5.1. 键盘焦点和焦点轮廓

键盘焦点是指 DOM 中选择用于接受键盘输入的当前元素。 我们在任何地方都看到它作为焦点轮廓，类似于下图所示：

![https://reactjs.org/static/keyboard-focus-dec0e6bcc1f882baf76ebc860d4f04e5-9d63d.png](https://reactjs.org/static/keyboard-focus-dec0e6bcc1f882baf76ebc860d4f04e5-9d63d.png)

只有使用 CSS 才能删除此轮廓，例如通过设置 `outline: 0`，如果要将其替换为另一个焦点轮廓实现。

### 5.2. 跳转到所需内容的机制

提供一种机制，允许用户跳过应用程序中过去的导航部分，因为这可以帮助并加快键盘导航速度。

跳过链接或跳过导航链接是隐藏的导航链接（只有在键盘用户与页面交互时才会显示）。 使用内部页面锚点和一些样式很容易实现它们：

* [WebAIM - Skip Navigation Links](http://webaim.org/techniques/skipnav/)

还可以使用地标元素和 role（例如 `<main>` 和 `<aside>`）来划分页面区域，因为辅助技术允许用户快速导航到这些部分。

在此处阅读有关使用这些元素以增强可访问性的更多信息：

* [Accessible Landmarks](http://www.scottohara.me/blog/2018/03/03/landmarks.html)

### 5.3. 以编程方式管理焦点

我们的 React 应用程序在运行时不断修改 HTML DOM，有时会导致键盘焦点丢失或设置为意外元素。 为了修复这个问题，我们需要以编程方式将键盘焦点向右移动。 例如，通过将键盘焦点重置为在关闭模式窗口后打开模态窗口的按钮。

MDN Web Docs介绍了这一点，并描述了我们如何构建[可通过键盘导航的 JavaScript 小部件](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)。

要在 React 中设置焦点，我们可以将 [Refs 用于 DOM 元素](https://reactjs.org/docs/refs-and-the-dom.html)。

使用这个，我们首先在组件类的 JSX 中创建一个元素的引用：

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // Create a ref to store the textInput DOM element
    this.textInput = React.createRef();
  }
  render() {
  // Use the `ref` callback to store a reference to the text input DOM
  // element in an instance field (for example, this.textInput).
    return (
      <input
        type="text"
        ref={this.textInput}
      />
    );
  }
}
```

然后我们可以在需要时在组件的其他位置让它获取焦点：

```jsx
focus() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
}
```

有时，父组件需要将焦点设置为子组件中的元素。 我们可以通过子组件将 DOM 引用[暴露给父组件](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components)来实现这一点，子组件将父组件的 ref 转发给子组件的 DOM 节点。

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
  }
  render() {
    return (
      <CustomTextInput inputRef={this.inputElement} />
    );
  }
}

// Now you can set focus when required.
this.inputElement.current.focus();
```

使用 HOC（Higher-Order Components，高阶组件，高阶组件是接受组件作为参数并返回组件的函数）扩展组件时，建议使用 React 的 `forwardRef` 函数将 `ref` 转发到包装组件。 如果第三方 HOC 未实现 ref 转发，则上述模式仍可用作后备。

一个很好的焦点管理示例是 [react-aria-modal](https://github.com/davidtheclark/react-aria-modal)。 这是完全可访问的模态窗口的一个相对罕见的例子。 它不仅将初始焦点设置在取消按钮上（防止键盘用户意外激活成功动作）并将键盘焦点陷入模态内，还将焦点重置回最初触发模态的元素。

>注意：
>
>虽然这是一个非常重要的可访问性功能，但它也是一种应该谨慎使用的技术。 在受到干扰时使用它来修复键盘焦点流，而不是试图预测用户想要如何使用应用程序。

## 6. 鼠标和指针事件

确保仅使用键盘也可以访问通过鼠标或指针事件暴露的所有功能。 仅依赖于指针设备将导致许多键盘用户无法使用您的应用程序的情况。

为了说明这一点，让我们看一下由点击事件引起的破坏可访问性的示例。 这是外部单击模式，用户可以通过单击元素外部来禁用打开的弹出框。

![https://reactjs.org/outerclick-with-mouse-5523b05b22210c5a2fa0bd1f01339cb3.gif](https://reactjs.org/outerclick-with-mouse-5523b05b22210c5a2fa0bd1f01339cb3.gif)

这通常通过将 `click` 事件附加到关闭 popover 的 `window` 对象来实现：

```jsx
class OuterClickExample extends React.Component {
constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.toggleContainer = React.createRef();

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event) {
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

这对于具有指针设备（例如鼠标）的用户可能正常工作，但是当单独使用键盘操作时，由于 `window` 对象从未接收到 `click` 事件，因此当选项卡到下一个元素时会导致功能损坏。 这可能会导致功能模糊，从而阻止用户使用您的应用程序。

![https://reactjs.org/outerclick-with-keyboard-eca0ca825c8c5e2aa609cee72ef47e27.gif](https://reactjs.org/outerclick-with-keyboard-eca0ca825c8c5e2aa609cee72ef47e27.gif)

通过使用适当的事件处理程序，例如 `onBlur` 和 `onFocus`，可以实现相同的功能：

```jsx
class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  // We close the popover on the next tick by using setTimeout.
  // This is necessary because we need to first check if
  // another child of the element has received focus as
  // the blur event fires prior to the new focus event.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false
      });
    });
  }

  // If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    // React assists us by bubbling the blur and
    // focus events to the parent.
    return (
      <div onBlur={this.onBlurHandler}
           onFocus={this.onFocusHandler}>

        <button onClick={this.onClickHandler}
                aria-haspopup="true"
                aria-expanded={this.state.isOpen}>
          Select an option
        </button>
        {this.state.isOpen ? (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        ) : null}
      </div>
    );
  }
}
```

此代码向指针设备和键盘用户公开功能。 另请注意添加的 `aria-*` props 以支持屏幕阅读器用户。 为简单起见，尚未实现用于启用弹出框选项的箭头键交互的键盘事件。

![https://reactjs.org/blur-popover-close-28ce2067489843caf05fe7ce22494542.gif](https://reactjs.org/blur-popover-close-28ce2067489843caf05fe7ce22494542.gif)

这是许多情况的一个示例，其中仅依赖于指针和鼠标事件将破坏键盘用户的功能。 始终使用键盘进行测试将立即突出显示问题区域，然后可以使用键盘识别事件处理程序修复问题区域。

## 7. 更复杂的小部件

更复杂的用户体验并不意味着更难以访问。 尽管通过尽可能接近 HTML 的编码最容易实现无障碍，但即使是最复杂的小部件也可以被编码得无障碍。

在这里，我们需要了解 [ARIA 角色](https://www.w3.org/TR/wai-aria/#roles)以及 [ARIA 状态和属性](https://www.w3.org/TR/wai-aria/#states_and_properties)。 这些工具箱充满了 JSX 完全支持的 HTML 属性，使我们能够构建完全可访问、功能强大的 React 组件。

每种类型的小部件都有一个特定的设计模式，并且预计将由用户和用户代理以某种方式运行：

* [WAI-ARIA Authoring Practices - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices/#aria_ex)
* [Heydon Pickering - ARIA Examples](http://heydonworks.com/practical_aria_examples/)
* [Inclusive Components](https://inclusive-components.design/)