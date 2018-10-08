import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginComponent from './views/Login.vue';
import RegisterComponent from './views/Register.vue';
import ManagementComponent from './views/management/Management.vue';
import UserManagementComponent from './views/management/User.vue';
import DeptManagementComponent from './views/management/Dept.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: '/login', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    {
      path: '/management',
      component: ManagementComponent,
      children: [
        { path: 'user', component: UserManagementComponent },
        { path: 'dept', component: DeptManagementComponent },
      ],
    },
  ],
});

export default router;
