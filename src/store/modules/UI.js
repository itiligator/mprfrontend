import { TOGGLE_SIDEBAR, SHOW_SIDEBAR, HIDE_SIDEBAR } from '@/store/actions/UI';

const state = {
  sidebar: false,
};

const getters = {
  // eslint-disable-next-line no-shadow
  SIDEBAR: (state) => state.sidebar,
};

const actions = {
  [TOGGLE_SIDEBAR]: ({ commit }) => commit(TOGGLE_SIDEBAR),
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [TOGGLE_SIDEBAR]: (state) => {
    state.sidebar = !state.sidebar;
  },
  // eslint-disable-next-line no-shadow
  [SHOW_SIDEBAR]: (state) => {
    state.sidebar = true;
  },
  // eslint-disable-next-line no-shadow
  [HIDE_SIDEBAR]: (state) => {
    state.sidebar = false;
  },

};

export default {
  state,
  getters,
  actions,
  mutations,
};
