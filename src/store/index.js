import Vue from 'vue';
import Vuex from 'vuex';
// import order from '@/store/modules/order';
import clients from '@/store/modules/clients';
import goods from '@/store/modules/goods';
import checklists from '@/store/modules/checklists';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';
import UI from './modules/UI';
import visits from './modules/visits';
import auth from './modules/auth';
import prices from './modules/prices';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    user,
    auth,
    UI,
    visits,
    goods,
    clients,
    checklists,
    prices,
    // order,
  },
  strict: debug,
  plugins: [createPersistedState()],
});
