import Vue from 'vue';

import App from './app.vue';
import HomeComponent from './components/home/home.vue'


// 路由
import VueRouter from 'vue-router';
Vue.use( VueRouter );
let router = new VueRouter({
    routes: [
        { path: "/", redirect: { name: "home" } },
        { name: "home", path: "/home", component: HomeComponent }
    ]
});

// mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);

// axios
import Axios from 'axios';
// 挂载到原型
Vue.prototype.$axios = Axios;
// 默认配置

new Vue({
    el: "#app",
    router,
    render: c => c(App)
});
