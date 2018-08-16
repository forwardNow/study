import Vue from 'vue';

// axios
import Axios from 'axios';

// 路由
import VueRouter from 'vue-router';

// mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

// mui
import './static/vendor/mui/dist/css/mui.css';

// 字体图标
import './static/fonts/iconfont.css';

import App from './app.vue';
import HomeComponent from './components/home/home.vue';


// axios 挂载到原型
Vue.prototype.$axios = Axios;

// 路由
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/', redirect: { name: 'home' } },
    { name: 'home', path: '/home', component: HomeComponent },
  ],
});

// mint-ui 安装
Vue.use(Mint);

const app = new Vue({
  el: '#app',
  router,
  render: c => c(App),
});

console.log(app);
