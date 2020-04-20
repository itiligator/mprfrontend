import Vue from 'vue';
import Axios from 'axios';
import Meta from 'vue-meta';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';


// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(Meta);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
