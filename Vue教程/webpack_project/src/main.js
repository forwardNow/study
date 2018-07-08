// 引入 vue
import Vue from "vue";
// 引入 vue-router
import VueRouter from "vue-router";

// 引入 自定义组件
import App from "./app.vue";

// components
import Header from "./components/layout/header.vue";
import Footer from "./components/layout/footer.vue";

// pages
import Home from "./pages/home/home.vue";
import Manage from "./pages/manage/manage.vue";
import ManageDept from "./pages/manage/dept.vue";
import ManageLog from "./pages/manage/log.vue";
import NotFound from "./pages/error/404.vue"

// 注册 vue-router
Vue.use( VueRouter );

// 全局组件
Vue.component( "Header", Header );
Vue.component( "Footer", Footer );
Footer

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