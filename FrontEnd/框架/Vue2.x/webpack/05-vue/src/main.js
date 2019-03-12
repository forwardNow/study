import Vue from 'vue';
import { Header, Swipe, SwipeItem } from 'mint-ui';
import VueResource from 'vue-resource';
import moment from 'moment';

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

Vue.use(VueResource);
// http://localhost:3000/api/carousel => this.$http.get('api/carousel')
Vue.http.options.root = 'http://localhost:3000';

Vue.filter('dateFormat',
  (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => moment(dataStr).format(pattern));

new Vue({
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
}).$mount('#app');
