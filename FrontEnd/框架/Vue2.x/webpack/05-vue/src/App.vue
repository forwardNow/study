<template>
  <div>
    App Vue
    <router-link to="/login">登陆</router-link>
    <router-link to="/register">注册</router-link>
    <router-link to="/management">管理</router-link>
    <router-view></router-view>
    <mt-button type="default">default</mt-button>
  </div>
</template>
