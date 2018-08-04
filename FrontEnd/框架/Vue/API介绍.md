 # API 介绍

## 1. 官方API

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