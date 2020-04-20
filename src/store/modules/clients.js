import {
  CLIENTS_REQUEST,
  CLIENTS_SUCCESS,
} from '@/store/actions/clients';
import { HTTP } from '@/utils/http';

const state = {
  clientsstate: [],
  clientsdate: '',
  clientssloaded: false,
};

const getters = {
  // eslint-disable-next-line no-shadow,arrow-body-style
  CLIENTS: (state) => state.clientsstate,
  // eslint-disable-next-line no-shadow
  GETCLIENTBYPK: (state) => (pk) => state.clientsstate.find((client) => client.pk === pk),
};

const actions = {
  [CLIENTS_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
    HTTP.get('/api/clients')
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
    // for (let i = 0; i < 10; i += 1) { state.clientsstate[resp.data[i].pk] = resp.data[i]; }
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
