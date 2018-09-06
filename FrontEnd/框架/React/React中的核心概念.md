 # React中的核心概念

## 1. 虚拟 DOM （Virtual Document Object Model）

### 1.1. DOM

【本质】：浏览器中的概念，用 JS 对象来表示页面中的元素，并提供了操作 DOM 对象的API

### 1.2. React 中的虚拟 DOM

【本质】：框架中的概念，用 JS 对象来模拟页面上的 DOM 以及 DOM 的嵌套关系。

【目的】：为了实现页面中的 DOM 元素高效更新（按需更新）

示例：

```html
<p>
  点击
  <a href="#">我是超链接</a>
</p>

<script>
let virtualA = {
  tagName: 'p',
  children: [
    '点击',
    {
      tagName: 'a',
      attr: {
        href: '#'
      },
      children: [
        '我是超链接'
      ]
    }
  ]
};
</script>
```