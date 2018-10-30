// import Vue from 'vue/dist/vue';
import Vue from 'vue';

import router from './router';

import AppComponent from './App.vue';

const app = new Vue({
  el: '#app',
  render(createElements) {
    return createElements(AppComponent);
  },
  router,
});

console.log(app);
