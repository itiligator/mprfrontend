import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// eslint-disable-next-line no-unused-vars
import Logout from '@/components/Logout.vue';
import Login from '@/views/Login.vue';
// import ShowOrder from '@/views/ShowOrder.vue';
// import { HIDE_SIDEBAR } from '@/store/actions/UI';
import Home from '../views/Home.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/route',
    name: 'Route',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Route.vue'),
  },
  {
    path: '/visit',
    name: 'Visit',
    component: () => import(/* webpackChunkName: "login" */ '../views/Visit.vue'),
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: "login" */ '../views/Task.vue'),
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
  {
    path: '/datatest',
    name: 'Datatest',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/datatest.vue'),
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
