<template>
  <div>
    <div class="swipe">
      <mt-swipe :auto="4000">
        <mt-swipe-item>1</mt-swipe-item>
        <mt-swipe-item>2</mt-swipe-item>
        <mt-swipe-item>3</mt-swipe-item>
      </mt-swipe>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .swipe {
    height: 300px;
  }
</style>

