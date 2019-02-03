# 表单

HTML 表单元素与 React 中的其他 DOM 元素的工作方式稍有不同，因为表单元素自然会保留一些内部状态。 例如，纯 HTML 中的此表单接受一个名称：

```jsx
<form>
  <label>
    Name:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Submit" />
</form>
```

当用户提交表单时，此表单也具有普通 HTML 表单重载页面的默认行为。 如果您可在 React 中使用此行为。 但在大多数情况下会禁用默认行为，使用 JavaScript 函数来处理表单的提交并访问用户在表单中输入的数据。 实现这一目标的标准方法是使用一种称为“受控组件”的技术。
