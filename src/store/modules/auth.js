/* eslint-disable dot-notation */
// /* eslint-disable promise/param-names */

import { HTTP } from '@/utils/http';

import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
} from '../actions/auth';
import { USER_REQUEST } from '../actions/user';

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
  [AUTH_REQUEST]: ({ commit, dispatch }, user) => new Promise((resolve, reject) => {
    commit(AUTH_REQUEST);
    HTTP.post('api-token-auth/', user)
      .then((resp) => {
        window.localStorage.setItem('user-token', resp.data.token);
        // Here set the header of your ajax library to the token value.
        // example with axios
        // alert(`Token ${localStorage.getItem('user-token')}`);
        // HTTP.defaults.headers.common['Authorization'] =
        // `Token ${localStorage.getItem('user-token')}`;
        commit(AUTH_SUCCESS, resp);
        dispatch(USER_REQUEST);
        resolve(resp);
      })
      .catch((err) => {
        commit(AUTH_ERROR, err);
        window.localStorage.removeItem('user-token');
        reject(err);
      });
  }),
  [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
    commit(AUTH_LOGOUT);
    window.localStorage.removeItem('user-token');
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
    state.token = resp.token;
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
