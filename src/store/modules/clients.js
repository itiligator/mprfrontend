import {
  CLIENTS_REQUEST,
  CLIENTS_SUCCESS,
  GETCLIENTBYINN,
  GETALLCLIENTS,
} from '@/store/actions/clients';
import { HTTP } from '@/utils/http';

const state = {
  clientsstate: [],
  clientsdate: '',
  clientssloaded: false,
};

const getters = {
  // eslint-disable-next-line no-shadow,arrow-body-style
  [GETALLCLIENTS]: (state) => state.clientsstate,
  [GETCLIENTBYINN]:
  // eslint-disable-next-line no-shadow
    (state) => (inn) => {
      const searchResult = state.clientsstate.find((c) => c.inn === inn);
      if (typeof searchResult !== 'undefined') { return searchResult; }
      return { name: inn, inn };
    },
};

const actions = {
  [CLIENTS_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
    HTTP.get('/clients')
      .then((resp) => {
        commit(CLIENTS_SUCCESS, resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [CLIENTS_SUCCESS]: (state, resp) => {
    state.clientsstate = resp.data;
    state.clientssloaded = true;
    state.clientsdate = Date();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
