<template>
    <div>
        我是管理业
        <router-link :to=" { name: 'manage.dept' } ">部门管理</router-link>
        <router-link :to=" { name: 'manage.log' } ">日志管理</router-link>
        <router-view></router-view>
    </div>
</template>
