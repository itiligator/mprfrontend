import Vue from 'vue';
import vuetify from 'vuetify';
import UUID from 'vue-uuid';
import Meta from 'vue-meta';
import store from './store';
import router from './router';
import App from './App.vue';
import './registerServiceWorker';


Vue.use(UUID);
Vue.use(Meta);

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
