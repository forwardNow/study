import Vue from 'vue';
import { Header, Swipe, SwipeItem } from 'mint-ui';
import VurResource from 'vue-resource';

// MUI
import 'mui/dist/css/mui.min.css';
import 'mui/examples/hello-mui/css/icons-extra.css'; // 扩展图标
// import 'mui/dist/js/mui.min';

import router from './router';

import AppComponent from './App.vue';

import './style.less';


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

Vue.use(VurResource);

new Vue({
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
}).$mount('#app');
