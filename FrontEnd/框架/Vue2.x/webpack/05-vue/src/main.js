// import Vue from 'vue/dist/vue';
import Vue from 'vue';

// import MintUI from 'mint-ui';
// import 'mint-ui/lib/style.css';
// Vue.use(MintUI);

import { Button } from 'mint-ui';

import router from './router';

import AppComponent from './App.vue';

Vue.component(Button.name, Button);

const app = new Vue({
  el: '#app',
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
});

console.log(app);
