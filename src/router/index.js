import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
// eslint-disable-next-line no-unused-vars
import Logout from '@/components/Logout.vue';
// import ShowOrder from '@/views/ShowOrder.vue';
import Home from '../views/Home.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/info',
    name: 'Info',
    component: () => import(/* webpackChunkName: "info" */ '../views/Info.vue'),
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
  },
  {
    path: '/order/:pk',
    name: 'ShowOrder',
    component: () => import(/* webpackChunkName: "showorder" */ '../views/ShowOrder.vue'),
  },
  {
    path: '/visit',
    name: 'Visit',
    component: () => import(/* webpackChunkName: "visit" */ '../views/VisitTZform.vue'),
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "visit" */ '../views/PaymentTZform.vue'),
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
});


export default router;
