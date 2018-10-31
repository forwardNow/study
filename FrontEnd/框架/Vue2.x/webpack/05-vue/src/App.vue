<template>
  <div class="app">
    <mt-header fixed title="fixed top">Vue 项目</mt-header>

    <mt-tabbar v-model="selected">
      <mt-tab-item id="tab1">
        tab1
      </mt-tab-item>
      <mt-tab-item id="tab2">
        tab2
      </mt-tab-item>
      <mt-tab-item id="tab3">
        tab3
      </mt-tab-item>
      <mt-tab-item id="tab4">
        tab4
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        selected: 'tab1'
      };
    },
  };
</script>
<style>
.app {
  padding-top: 40px;
}
</style>

