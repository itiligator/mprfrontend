import Vue from 'vue';
import UUID from 'vue-uuid';
import Vuesax from 'vuesax';
import Axios from 'axios';
import Meta from 'vue-meta';
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';


import store from './store';

import 'vuesax/dist/vuesax.css';

Vue.use(Vuesax);
Vue.use(UUID);

// Install BootstrapVue
// Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
// Vue.use(IconsPlugin);
Vue.use(Meta);
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
