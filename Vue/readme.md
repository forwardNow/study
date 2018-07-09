 # 教程

## 1. webpack

### 1.1. 项目目录

    project/
        src/    # 存放以功能进行划分的源代码，给人看。
        dist/   # 存放上线的代码（减少请求、混淆代码等），给机器看。
        webpack.config.js   # 打包生成代码到 dist 
        package.json        # 包信息描述

webpack-dev-server 运行 src 下的代码，虚拟出 build.js 进行测试。

### 1.2. 安装NPM包

    init
        $ npm init -y

    webpack
        $ npm install webpack webpack-cli --save-dev
        
    babel(ES6转ES5)
        $ npm install babel-loader babel-core babel-preset-env babel-plugin-transform-runtime --save-dev

    CSS
        $ npm install style-loader css-loader --save-dev

    postcss
        # postcss.config.js 进行配置
        $ npm install postcss-loader autoprefixer --save-dev

    extract-text
        # @next： 使用 @4.0.0-beta.0
        $ npm install extract-text-webpack-plugin@next --save-dev

    less
        $ npm install less-loader less --save-dev

    scss
        $ npm install sass-loader node-sass webpack --save-dev

    html
        $ npm install html-webpack-plugin --save-dev
        # 在 plugin 配置

    dev-server
        $ npm install webpack-dev-server --save-dev
        # 在 plugin 配置 

    vue
        $ npm install vue-hot-reload-api vue-html-loader vue-loader vue-style-loader vue-template-compiler --save-dev
        $ npm install vue --save
        # 在 plugin 配置

### 1.3. package.json

package.json： 

    ......
    "scripts": {
        // 开发时的命令
        "dev": "webpack-dev-server",
        // 打包代码到生产环境的命令
        "build": "webpack"
    },

通过命令行可以运行 "`scripts`" 里的脚本命令：

    $ npm run dev


## 2. ES6相关

### 2.1. webpack-ES6的处理

使用 `babel` 将 ES6 转 ES5。

* `babel`
    - `babel-loader` ( 内部依赖 babel-core )
        + `presets` 和 `es2015`：处理关键字
        + `plugins` 和 `babel-plugin-transform-runtime`：处理函数

### 2.2. ES6中的模块

    // todo


### 2.3. ES6中的代码变化

* 对象属性的简化：`{ name }`
* 对象方法的简化：`{ add():{} }`

示例： 

    var name = "吴钦飞";
    var person = {
        name: name
    }
    var person2 = {
        name
    }

    var pig = {
        sleep: function() {}
    }
    var pig2 = {
        sleep() {}
    }

### 2.4. vue单文件

**格式**：

`*.vue` 文件。最终通过webpack编译成 `*.js` 在浏览器运行。

**内容**：

`<template></template>` + `<script></script>` + `<style></style>`

* `<template>` 中只能有一个根节点 (vue2.x)
* `<script>` 中按照 `export default {配置}` 来写
* `style` 可以设置`scoped`属性，让其只在`template`中生效

**开发流程**：

    project/
        src/
            index.html
            main.js
            app.vue
    
    # 1.【index.html】指定挂载点
    <div id="app"></div>

    # 2.【main.js】引入 vue 和 app.vue
    import Vue from "vue";
    import App from "./app.vue"

    # 3.【main.js】构建 vue实例
    new Vue( {
        // 关联挂载点
        el: "#app",
        // 渲染内容到挂载点
        render( createElement ) {
            return createElement( App );
        }
    } );

## 3. vue 基础

### 3.1. 核心概念

angular：
 * 模块化
 * 双向数据绑定（脏检查：一个属性改变，会检查所有$watch。影响性能。）

Vue：
 * 组件化
 * 双向数据流（基于ES5的`defineProperty`来实现，IE9+才支持。）

无论是模块化还是组件化都是在细分代码，只是粒度不一样，比如说：
开发一个登陆模块，登陆包含 头部组件、主体组件、底部组件。
头部组件包含：页面（template）、样式（style）、动态效果（script）。

**双向数据流**：
 * 方向1：JS内存属性发生改变，影响页面的变化
 * 方向2：页面的改变，影响JS内存属性的改变

**`<template>`中的表达式**：

* 可使用表达式的位置
    * 插值：`{{ 表达式 }}`
    * 指令：`v-xx:参数="表达式"`
* 表达式中可直接使用 vue实例 的属性和方法

### 3.2. 官方API

* 全局（通过 Vue 来调用）
    * 配置
    * API
        * `Vue.component( "组件名", 组件对象 )`：注册全局组件
        * `Vue.filter( "过滤器名", 函数(值, 参数1, ...) )`：注册全局过滤器
        * `Vue.use( plugin )`：安装插件
* 实例（vm）
    * 方法
    * 事件
        * `$on( "事件名称", 回调函数(参数1,参数2,...) )`
        * `$emit( "事件名称", 参数1的值, 参数2的值,...)`
        * `$off( "事件名称" )`
* 选项（配置实例）
    * DOM
        * `el`：指定挂载点
    * 数据
        * `data`：数据
        * `methods`：方法
        * `props`：声明组件可接受数据的属性（类似于声明函数的参数列表）
    * 资源
        * `components`：注册局部组件（组件内声明组件）
    * 生命周期钩子
        * `created`：实例创建完毕，此时还未生成DOM
        * `mounted`：数据已经装载到DOM，可以操作DOM
* 指令
    * `v-text`：<==> `dom.textContent`
    * `v-html`：<==> `dom.innerHTML`
    * `v-show`：值为真，则`display: block`；值为假，则`display: none`
    * `v-if`：值为真，则插入该元素；值为假，则移除该元素
    * `v-for`：遍历数组或对象
    * `v-model`：双向数据绑定
    * `v-bind`：单选数据绑定（JS内存改变影响页面）
    * `v-on`：绑定事件

### 3.3. 常用指令

#### 3.3.1. v-bind

**语法**：

    v-bind:属性="表达式"

**说明**：

[表达式] 的运算结果 会赋值给 [属性]

**关于 `v-bind:class="表达式"`**
* class只有一个样式：表达式的值为一个字符串（三元表达式）
* class有多个样式：表达式的值为一个对象（样式名为key，value为真则拥有该样式）

**示例**

    <div v-bind:class="hasError ? 'alert-error' : 'alert-success'"></div>
    <div v-bind:class="{'has-error': true, 'alert-error': true}"></div>

#### 3.3.2. v-on

**语法**：

    v-on:事件名="表达式 或 方法"

**说明**：

 * 方法写在 `methods` 中
 * 在`<script>`中使用 vue实例的属性和方法 要加 `this.`
 * 在`<template>`中使用 vue实例的属性和方法 不需要加 `this.`


**示例**：

    <template>
        <div>
            <div v-bind:class="hasError ? 'alert-error' : 'alert-success'"></div>
            <button v-on:click="handleChange()">click me</button>
        </div>
    </template>
    <script>
    export default {
        data() {
            return {
                hasError: true
            }
        },
        methods: {
            handleChange() {
                this.hasError = !this.hasError;
            }
        }
    }
    </script>

#### 3.3.3. v-for

遍历数组或对象。

注意：
* 新增数组元素，`this.items.push( {... )`
* 删除数组元素，`this.items.splice( index, 1 )`

示例：

    items: [
        { deptId: "A1", deptName: "开发部" },
        { deptId: "C2", deptName: "财务部" }
    ],
    dic: {
        id: "k90",
        name: "吴钦飞",
        gender: "男"
    }
    <ul>
        <li v-for="(item, index) in items" v-bind:key="index">
            {{index}} - {{item.deptName}}
        </li>
    </ul>
    <ul>
        <li v-for="(value, key, index) in dic" v-bind:key="index">
            {{index}} - {{value}}
        </li>
    </ul>

### 3.4. 组件

#### 3.4.1. 父子组件

说明：
* 父和子，用组件的是父，被用的是子
* 引入：`import 组件对象 from "./components/xxx.vue"` 
* 注册
    * 局部注册：`export default { components: { 组件名: 组件对象,... } }`
    * 全局注册：`Vue.component( 组件名, 组件对象 )`

示例：

    # 目录

    project/
        src/
            components/
                PageHeader.vue
                PageMain.vue
                PageFooter.vue
            app.vue

    # app.vue

    <template>
        <div>
            <page-header></page-header>
            <page-main></page-main>
            <page-footer></page-footer>
        </div>
    </template>
    <script>
    import PageHeader from "./components/PageHeader.vue";
    import PageMain from "./components/PageMain.vue";
    import PageFooter from "./components/PageFooter.vue";

    export default {
        components: {
            PageHeader: PageHeader,
            PageMain,
            PageFooter
        }
    }
    </script>

#### 3.4.2. 父向子通信

说明：
* （子）组件在 `props` 中声明可供父组件传值的属性（参数）
* （父）组件通过子组件声明的属性进行传值
* 使用`v-bind:属性名={变量}` 可建立数据到视图的单向数据流

示例：

    # app.vue
    <template>
        <div>
            <page-main v-bind:content="content"></page-main>
        </div>
    </template>
    <script>
    import PageMain from "./components/PageMain.vue";
    export default {
        data() {
            return {
                content: "hh"
            }
        },
        components: {
            PageMain
        }
    }
    </script>

    # PageMain.vue
    <template>
        <div>我是主体 {{content}}</div>
    </template>
    <script>
    export default {
        props: [ "content" ]
    }
    </script>

#### 3.4.3. 子向父通信

说明：

1. 先创建一个空的实例，用于总线bus，即 `bus = new Vue()`
2. 在bus上注册父组件的处理函数，即 `bus.$on( "事件名", 父组件处理器(prop1,prop2) )`
3. 子组件通过发送事件来传递数据，即 `bus.$emit( "事件名", prop1, prop2 )`

### 3.5. 过滤器

说明：
* 全局注册：`Vue.filter( "过滤器名", 函数(值, 参数1, ...) )`
* 局部注册：`options.filters = { "过滤器名", 函数(值, 参数1, ...) }`
* 使用：`{{ content | 过滤器 }}`
* 当 全局过滤器 与 局部过滤器 重名时
    * 该组件内，局部过滤器有效
    * 该组件所使用的子组件内，全局过滤器有效

### 3.6. 获取DOM元素

说明：
* 在特殊情况下才会直接操作DOM，比如第三方库
* 在元素上使用
    * 指定引用名称：`<div ref="myDiv"></div>`
    * 使用：`this.$refs.myDiv`
* 在子组件上使用
    * 指定引用名称：`<my-sub ref="mySub"></my-sub>`
    * 使用：`this.$refs.mySub.$el`

示例：

    <template>
        <div>
            <page-footer ref="sub"></page-footer>
            <div ref="myDiv"></div>
        </div>
    </template>
    <script>
    import PageFooter from "./components/PageFooter.vue";
    export default {
        mounted() {
            console.info( "当前组件的元素：", this.$refs.myDiv );
            this.$nextTick( () => {
                console.info( "子组件的根元素", this.$refs.sub.$el );
            });
        }
    }
    </script>

## 4. vue-router

### 4.1. 前端路由

此处的前端路由，仅指hash路由。

前端路由的核心：侦听锚点值的改变（`hashchange`），根据不同的锚点值，将不同的数据渲染到指定的DOM位置。
* DOM容器：`<div id="container"></div>`
* 监听hash：`window.addEventListener( "hashchange", callback )`
* hash值一旦改变，则执行 `callback`，获取模板和数据后将其插入到 DOM容器

基本实现：

    <header>页头</header>
    <main id="container"></main>
    <footer>页脚</footer>
    <script>
        // 容器
        var container = document.getElementById( "container" );

        // 侦听锚点的改变
        window.addEventListener( "hashchange", handleHashChange, false );
        
        // 当hash值改变后，进行处理
        function handleHashChange() {
            var 
                html = "",
                hash = location.hash
            ;

            // 匹配 /home
            if ( /^#\/home/.test( hash ) ) {
                html = "主页内容"
            } else if ( /^#\/aboutUs/.test( hash ) ) {
                html = "关于我们内容";
            } else {
                html = "默认内容";
            }

            container.innerHTML = html;
        }

        handleHashChange();
    </script>


### 4.2. 介绍

vue的核心插件：
* `vue-router` 路由
* `vuex` 管理全局共享数据



比较：
* angular：`ui-router` 通过 Ajax 来获取模板
* vue：`vue-router` 在打包的文件中调用模板。

### 4.3. 配置

安装：

    $ npm install vue-router --save

引入：
    
    import VueRouter from "vue-router";

注册插件：

    Vue.use( VueRouter );

创建路由对象并配置规则：（路由规则，从上往下 挨个匹配）

    let vueRouter = new VueRouter( { 
        routes: [ 
            { path: "/home", component: 组件对象Home }, 
            { path: "/aboutUs", component: 组件对象AboutUs }, 
            ... 
        ] 
    } );
    
添加进实例的`options`：

    new Vue( {
        ...
        router: vueRouter
    } );

指定路由挂载点：

    <template>
        <div>
            ...
            <router-view></router-view>
        </div>
    </template>


### 4.4. 使用

    routes : [
        { name: "aboutUs", path: "/aboutUs", component: AboutUs }
    ]

    # 通过 <a> 直接使用
    <a href="#/aboutUs">关于我们</a>

    # to="route的path"
    <router-link to="/aboutUs" class="link">关于我们2</router-link>

    # to="route的name"
    <router-link v-bind:to="{ name: 'aboutUs' }" class="link">关于我们3</router-link>

    # 挂载点
    <router-view></router-view>


### 4.5. 路由参数

所有vue实例都可访问：
* `$route`：当前路由，主要用来获取参数数据
* `$router`：路由器，主要用来执行操作

传参方式：
* 查询字符串方式，如 `/detail?id=66`
* path方式，如 `/detail/66`

路由设置：
* query方式，如 `{ name: "detail", path: "/detail", component: Detail }`
* path方式，如 `{ name: "detail", path: "/detail/:id", component: Detail }`

传递参数：
* query方式，如 `v-bind:to="{ name:'detail' ,query: { id: 1 } }"`
* path方式，如 `v-bind:to="{ name:'detail' ,params: { id: 1 } }"`

接收参数（在 `created` 钩子里）：
* query方式，如 `this.$route.query`
* path方式，如 `this.$route.params`


示例：

    # main.js
    const vueRouter = new VueRouter( {
        routes: [
            { name: "home", path: "/home", component: Home },
            { name: "aboutUs", path: "/aboutUs/:id", component: AboutUs },
        ]
    } );

    # app.vue
    <router-link 
        v-bind:to="{ name: 'home', query: { id: 2 } }" 
        class="link">首页</router-link>
    <router-link 
        v-bind:to="{ name: 'aboutUs', params: { id: 2 } }" 
        class="link">关于我们</router-link>

    # home.vue
    export default {
        created() {
            console.info( this.$route.query );
        }
    }

    # about-us.vue
    export default {
        created() {
            console.info( this.$route.params );
        }
    }

### 4.6. 编程导航

用程序来控制导航。

`this.$router.go( 参数 )`
* 作用：根据浏览记录，前进或后退
* 说明：参数为 1，则前进一步；参数为 -1，则后退一步。

`this.$router.push( 参数 )`
* 作用：直接跳转都某个页面
* 说明：参数的值 与 `<router-link :to="属性值">` 的属性值一致。

示例：

    this.$router.push( {
        name: "detail",
        query: { id: 1 } // query 传值
     // params: { id: 1 } // path 传值
    } );

### 4.7. 重定向和404

`http://localhost:8080/index.html` 匹配 `"/"`。

当进入页面后，应该重定向到主页：

    { name: "root", path: "/", redirect: { name: "home" } }

当访问不存在的页面的时，应显示 404找不到页面：

    # 最后一个路由规则匹配所有，即 404页
    { name: "notFound", path: "*", component: NotFoundVue }

示例：

    new VueRouter( {
        routes: [
            { name: "root", path: "/", redirect: { name: "home" } },
            { name: "home", path: "/home", component: HomeVue },
            { name: "notFound", path: "*", component: NotFoundVue }
        ]
    } );

### 4.8. 多视图

单视图：一个路由 + 一个组件 + 一个挂载点

    # 一个路由 + 一个组件
    { name: "home", path: "/home", component: HomeVue }

    # 一个挂载点
    <router-view></router-view>

多视图：一个路由 + 多个组件 + 多个挂载点

    # 一个路由 + 多个组件
    { name: "home", path: "/home", components: {
        header: Header,
        footer: Footer,
        default: Main
    } }

    # 多个挂载点
    <router-view name="header"></router-view> # 挂载 Header
    <router-view></router-view> # 挂载 Main
    <router-view name="footer"></router-view> # 挂载 Footer

### 4.9. 嵌套路由

**说明**：

用单页去实现多页应用，比如：页头有导航（首页，管理页），管理页里又有菜单树导航。

视图包含视图：

    # app.vue
    <router-link :to="{name: 'home'}">首页</router-link>
    <router-link :to="{name: 'manage'}">管理</router-link>
    <router-view>

    # manage.vue
    <router-link :to="{name: 'manage.dept'}">部门管理</router-link>
    <router-link :to="{name: 'manage.log'}">日志管理</router-link>
    <router-view>


路由具有父子级关系：

    # routes
    { name: "home", path: "/home", component: Home },
    { name: "manage", path: "/manage", component: Manage, children: [
        { name: "manage.dept", path: "dept", component: ManageDept },
        { name: "manage.log", path: "log", component: ManageLog },
    ]},

**示例**：

    src/
        components/
            layout/
                footer.vue
                header.vue
        pages/
            error/
                404.vue
            home/
                home.vue
            manage/
                dept.vue
                log.vue
                manage.vue
        app.vue
        index.html
        main.js

    # main.js
    const vueRouter = new VueRouter( {
        routes: [
            { name: "root", path: "/", redirect: { name: "home" } },
            { name: "home", path: "/home", component: Home },
            { name: "manage", path: "/manage", component: Manage, children: [
                { name: "manage.dept", path: "dept", component: ManageDept },
                { name: "manage.log", path: "log", component: ManageLog },
            ]},
            { name: "notFount", path: "*", component: NotFound }
        ]
    } );

    # app.vue
    <template>
        <div>
            <Header></Header>
            <router-view></router-view>
            <Footer></Footer>
        </div>
    </template>

    # header.vue
    <template>
        <div>
            我是头部  
            <router-link :to="{ name: 'home' }">首页</router-link>
            <router-link :to="{ name: 'manage' }">管理</router-link>
        </div>
    </template>

    # manage.vue
    <template>
        <div>
            我是管理业
            <router-link :to=" { name: 'manage.dept' } ">部门管理</router-link>
            <router-link :to=" { name: 'manage.log' } ">日志管理</router-link>
            <router-view></router-view>
        </div>
    </template>

## 5. vue-resource

说明：
* [官网](https://github.com/pagekit/vue-resource)
* vue插件，用于发送web请求和处理响应，使用XMLHttpRequest和JSONP。
* 现在已经停止维护了，推荐使用 [axios](https://github.com/axios/axios)

安装：

    $ npm install vue-resource --save

引入：

    import VueResource from "vue-resource";
    // 安装：将 $http 挂载到Vue的原型。
    Vue.use( VueResource );

示例：

    export default {
        created() {
            this.$http.get( "https://www.baidu.com" )
                .then( res => {
                    console.info( res );
                }, error => {
                    console.info( error );
                } );

            this.$http.post( "https://www.baidu.com", {
                deptId: 1
            }, {
                emulateJSON: true
            } ).then( res => {
                console.info( res );
            }, error => {
                console.info( error );
            } );
        }
    }

注意：

    当发送 跨域的`application/json` 请求时，
    浏览器会先发送 options 预检请求，
    以判断服务器是否支持 `content-type:application/json`。
    但有时服务器确实支持，但未正确处理options预检请求，造成错误判断。

    所以，客户端发送请求时可以将设置为  `application/x-www-form-urlencoded`，
    以避免 options 预检请求。



## 6. axios

说明:
* [官网](https://github.com/axios/axios)


## 7. mint-ui

### 7.1. 介绍

饿了么 开发的基于Vue的组件库：
* 桌面版：[element-ui](http://element-cn.eleme.io/#/zh-CN)
* 移动版：[mint-ui](http://mint-ui.github.io/#!/zh-cn)

组成
* JS 组件：需要引用后，才可使用
* 样式组件：注册后，可直接使用相应标签
* 表单组件：注册后，可直接使用相应标签

### 7.2. 引入

安装：

    $ npm install mint-ui --save

引入：

    // 引入样式

    // 引入全部组件
    import Vue from 'vue';
    import Mint from 'mint-ui';
    Vue.use(Mint);

    // 按需引入部分组件
    import { Cell, Checklist } from 'minu-ui';
    Vue.component(Cell.name, Cell);
    Vue.component(Checklist.name, Checklist);