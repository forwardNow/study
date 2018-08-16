<template>
    <div>
        <mt-header fixed title="信息管理系统"></mt-header>
        <router-view></router-view>
        <nav class="mui-bar mui-bar-tab">
            <a class="mui-tab-item mui-active" href="#tabbar">
                <span class="mui-icon iconfont icon-home"></span>
                <span class="mui-tab-label">首页</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-chat">
                <span class="mui-icon iconfont icon-vip"></span>
                <span class="mui-tab-label">会员</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-contact">
                <span class="mui-icon iconfont icon-cart_light"><span class="mui-badge">9</span></span>
                <span class="mui-tab-label">购物车</span>
            </a>
            <a class="mui-tab-item" href="#tabbar-with-map">
                <span class="mui-icon iconfont icon-search_light"></span>
                <span class="mui-tab-label">查找</span>
            </a>
        </nav>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
</style>

