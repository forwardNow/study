import Vue from 'vue';
import { Header, Swipe, SwipeItem } from 'mint-ui';

// MUI
import 'mui/dist/css/mui.min.css';
import 'mui/examples/hello-mui/css/icons-extra.css'; // 扩展图标
// import 'mui/dist/js/mui.min';

import router from './router';

import AppComponent from './App.vue';


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Header.name, Header);

new Vue({
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
}).$mount('#app');
