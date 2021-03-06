import Vue from 'vue';
import VCalendar from 'v-calendar';
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

Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#4DBA87',
      success: 'rgb(23, 201, 100)',
      danger: 'rgb(242, 19, 93)',
      warning: 'rgb(255, 130, 0)',
      dark: 'rgb(36, 33, 69)',
    },
  },
});
Vue.use(UUID);
Vue.use(VCalendar, {
  componentPrefix: 'vc', // Now use vc-calendar and vc-date-picker
});

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
