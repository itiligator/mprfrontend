/* eslint-disable dot-notation */
// /* eslint-disable promise/param-names */

import { HTTP } from '@/utils/http';

// import { VISIT_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/visits';
// import { CLIENTS_REQUEST } from '@/store/actions/clients';
// import { GOODS_REQUEST } from '@/store/actions/goods';
// import { CHECKLISTS_REQUEST } from '@/store/actions/checklists';
// import { USER_REQUEST } from '../actions/user';
import { VISIT_FLASH_ALL } from '@/store/actions/visits';
import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth';

const state = {
  token: window.localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false,
};

const getters = {
  // eslint-disable-next-line no-shadow
  isAuthenticated: (state) => !!state.token,
  // eslint-disable-next-line no-shadow
  authStatus: (state) => state.status,
};

const actions = {
  [AUTH_REQUEST]: ({ commit }, user) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    HTTP.post('api-token-auth/', user)
      .then((resp) => {
        window.localStorage.setItem('user-token', resp.data.token);
        commit(AUTH_SUCCESS, resp);
        // dispatch(USER_REQUEST);
        // dispatch(VISIT_DOWNLOAD_ALL_FROM_SERVER);
        // dispatch(CLIENTS_REQUEST);
        // dispatch(GOODS_REQUEST);
        // dispatch(CHECKLISTS_REQUEST);
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        window.localStorage.removeItem('user-token');
        reject(err);
      });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(VISIT_FLASH_ALL);
    commit(AUTH_LOGOUT);
    window.localStorage.clear();
    // window.localStorage.removeItem('user-token');
    resolve();
  }),
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading';
  },
  // eslint-disable-next-line no-shadow
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success';
    state.token = resp.data.token;
    state.hasLoadedOnce = true;
  },
  // eslint-disable-next-line no-shadow
  [AUTH_ERROR]: (state) => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  // eslint-disable-next-line no-shadow
  [AUTH_LOGOUT]: (state) => {
    state.token = '';
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
