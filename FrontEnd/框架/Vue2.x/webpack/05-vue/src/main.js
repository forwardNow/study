import Vue from 'vue';
import { Header, Tabbar, TabItem } from 'mint-ui';

import router from './router';

import AppComponent from './App.vue';


Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

new Vue({
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
}).$mount('#app');
