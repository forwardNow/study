 # art-template

## 1. 使用 art-template 抽取布局部分

### 1.1. 说明

文档：https://aui.github.io/art-template/zh-cn/docs/syntax.html

#### 1.1.1. 子模板

**标准语法**

用于引入其他模板。

```html
{{ include './header.html' }}
或
{{ include './header.html' data }}
```

#### 1.1.2. 模板继承

layout.html：

```html
<html lang="en">
<head></head>
<body>
  {{ include './header.html' }}

  <!-- 留坑 -->
  {{ block 'content' }} 默认 content 内容 {{ /block }}

  {{ include './footer.html' }}
</body>
</html>
```

index.html：

```html
<!-- 继承 layout.html -->
{{ extend './layout.html' }}

<!-- 填坑 -->
{{ block 'content' }} index 内容 {{ /block }}
```
