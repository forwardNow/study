# Swagger

## 1. 参考

* [官网](https://swagger.io/)
* [YAML —— 维基百科](https://zh.wikipedia.org/wiki/YAML)
* [YAML 语言教程 —— 阮一峰](http://www.ruanyifeng.com/blog/2016/07/yaml.html)
* [swagger-ui —— Github](https://github.com/swagger-api/swagger-ui)
* [Swagger UI安装与使用教程 —— CSDN](https://blog.csdn.net/rth362147773/article/details/78966395)
* [CORS跨域-Nginx使用方法（Access-Control-Allow-Origin错误提示）](https://blog.csdn.net/rth362147773/article/details/78817868)

## 2. 介绍

编写人和机器都能读的 API 文档，API 文档使用 YAML 语言编写，也就是说你得懂 YAML 语言才可以进行 API 文档的编辑。

编辑 API 文档可以使用的工具如下：

* 文本编辑器，如 vscode（配合插件 `Swagger Viewer`）
* [Swagger Editor](https://swagger.io/tools/swagger-editor/)，官方提供的 API 设计工具，本地使用，可边写边预览
* [SwaggerHub](https://swagger.io/tools/swaggerhub/)，官方云服务，可在线编辑、在线预览（别人可访问）

API 文档编辑完了，需要生成 Web 版的给别人看，需要用到 [Swagger UI](https://swagger.io/tools/swagger-ui/)

## 3. Swagger UI 的使用

>在 Vue 中的使用

安装：

```shell
npm install swagger-ui
```

目录：

```text
${root}/
  src/
    swagger/
      SwaggerUI.vue
      sys.yaml
```

路由配置：

```javascript
new Router({
  routes: [
    { path: '/api', component: () => import('./swagger/SwaggerUI.vue') },
    // ......
  ],
});  
```

编写 `SwaggerUI.vue`：

```html
<template>
  <div id="swagger-ui"></div>
</template>
<script>
  import SwaggerUIBundle from 'swagger-ui'
  import 'swagger-ui/dist/swagger-ui.css'

  export default {
    mounted() {
      SwaggerUIBundle({
        url: '/swagger/sys.yaml',
        dom_id: '#swagger-ui',
        deepLinking: false,
        presets: [
          SwaggerUIBundle.presets.apis
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })
    }
  }
</script>
```

访问 `http://localhost:8000/#api` 即可。