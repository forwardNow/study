// vue
import Vue from "vue";
// vue-router
import VueRouter from "vue-router";
// vue-resource
import VueResource from "vue-resource";
// axios
import Axios from "axios";

// 自定义组件
import App from "./app.vue";

import Header from "./components/layout/header.vue";
import Footer from "./components/layout/footer.vue";

// pages
import Home from "./pages/home/home.vue";
import Manage from "./pages/manage/manage.vue";
import ManageDept from "./pages/manage/dept.vue";
import ManageLog from "./pages/manage/log.vue";
import NotFound from "./pages/error/404.vue"

import Mint from "mint-ui";
import { Indicator } from "mint-ui";
import "mint-ui/lib/style.css";

Vue.use( Mint );

// 安装 vue-router
Vue.use( VueRouter );
// 安装：将 $http 挂载到Vue的原型。
Vue.use( VueResource );

// 配置 axios
Vue.prototype.$axios = Axios;
// 设置默认参数
Axios.defaults.baseURL = "http://www.baidu.com";
// 拦截器
Axios.interceptors.request.use( function( config ) {

    // 发起请求之前，显示 loading
    Mint.Indicator.open();

    return config;
} );

Axios.interceptors.response.use( function( config ) {

    // 获取响应后，隐藏 loading
    Mint.Indicator.close();

    return config;
} );


// 全局组件
Vue.component( "Header", Header );
Vue.component( "Footer", Footer );

// 路由
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

// 创建vue实例
new Vue( {
    // 指定挂载点
    el: "#app",
    // 渲染
    render: ( createElement ) => {
        return createElement( App );
    },
    router: vueRouter
} );