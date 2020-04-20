import apiCall from '@/utils/api';
import Vue from 'vue';
import { USER_REQUEST, USER_ERROR, USER_SUCCESS } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

const state = { status: '', profile: {} };

const getters = {
  // eslint-disable-next-line no-shadow
  getProfile: (state) => state.profile,
  // eslint-disable-next-line no-shadow
  isProfileLoaded: (state) => !!state.profile.name,
};

const actions = {
  [USER_REQUEST]: ({ commit, dispatch }) => {
    commit(USER_REQUEST);
    apiCall({ url: 'user/me' })
      .then((resp) => {
        commit(USER_SUCCESS, resp);
      })
      .catch(() => {
        commit(USER_ERROR);
        // if resp is unauthorized, logout, to
        dispatch(AUTH_LOGOUT);
      });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [USER_REQUEST]: (state) => {
    state.status = 'loading';
  },
  // eslint-disable-next-line no-shadow
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success';
    Vue.set(state, 'profile', resp);
  },
  // eslint-disable-next-line no-shadow
  [USER_ERROR]: (state) => {
    state.status = 'error';
  },
  // eslint-disable-next-line no-shadow
  [AUTH_LOGOUT]: (state) => {
    state.profile = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
