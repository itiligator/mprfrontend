
import { HTTP } from '@/utils/http';
import { CHECKLISTS_ALL, CHECKLISTS_REQUEST, CHECKLISTS_SUCCESS } from '@/store/actions/checklists';


const state = {
  checklists: [],
  checklistsState: '',
};

const getters = {
  // eslint-disable-next-line no-shadow,arrow-body-style
  [CHECKLISTS_ALL]: (state) => state.checklists,
};

const actions = {
  [CHECKLISTS_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
    HTTP.get('/checklistsquestions')
      .then((resp) => {
        commit(CHECKLISTS_SUCCESS, resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [CHECKLISTS_SUCCESS]: (state, resp) => {
    state.checklists = resp.data;
    state.checklistsState = true;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
