<template>
    <div>
        我是头部  
        <router-link :to="{ name: 'home' }">首页</router-link>
        <router-link :to="{ name: 'manage' }">管理</router-link>
    </div>
</template>
