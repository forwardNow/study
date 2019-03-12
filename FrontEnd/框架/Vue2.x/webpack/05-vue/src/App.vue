<template>
  <div class="app-container">
    <mt-header fixed title="Vue 项目"></mt-header>

    <transition>
      <router-view></router-view>
    </transition>

    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
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
<style scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden; /* 解决页面切换动画出现滚动条的问题 */
}

/* 从右侧进入 */
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

/* 从左侧离开 */
.v-leave-to {
  position: absolute; /* 解决页面离开时，仍旧占位的问题 */
  opacity: 0;
  transform: translateX(-100%);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
</style>

