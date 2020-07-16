import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// eslint-disable-next-line no-unused-vars
import Logout from '@/components/Logout.vue';
import Login from '@/views/Login.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "common" */ '../views/Home.vue'),
  },
  {
    path: '/visit',
    name: 'Visit',
    component: () => import(/* webpackChunkName: "common" */ '../views/Visit.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.getters.isAuthenticated) next({ name: 'Login' });
  else next();
  // store.commit(HIDE_SIDEBAR);
});


export default router;
