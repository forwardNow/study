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

[Web 可访问性计划（Web Accessibility Initiative - Accessible Rich Internet Applications）](https://www.w3.org/WAI/intro/aria) - 可访问的富 Internet 应用程序文档包含用于构建完全可访问的 JavaScript 小部件的技术。

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