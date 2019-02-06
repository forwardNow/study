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