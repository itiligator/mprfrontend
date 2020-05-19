import { HTTP } from '@/utils/http';
import {
  VISIT_GET_ALL,
  VISIT_DOWNLOAD_ALL_FROM_SERVER,
  VISIT_GET_CURRENT,
  VISIT_GET_BY_UUID,
  VISIT_IS_CURRENT,
  VISIT_UPLOAD_CURRENT_TO_SERVER,
  VISIT_SAVE_CURRENT_TOVUEX,
  VISIT_ERROR,
  VISIT_WRITE_DATA_TO_STORE,
  VISIT_UPDATE_CURRENT_IN_VUEX,
  VISIT_PUSH_CURRENT_TO_ALL,
} from '../actions/visits';


const state = {
  visits: [],
  currentVisit: {},
};

const getters = {
  // eslint-disable-next-line no-shadow
  [VISIT_GET_ALL]: (state) => state.visits,
  // eslint-disable-next-line no-shadow,arrow-body-style
  [VISIT_GET_CURRENT]: (state) => state.currentVisit,
  // eslint-disable-next-line no-shadow
  [VISIT_GET_BY_UUID]: (state, uuid) => state.visits.filter((visit) => visit.UUID === uuid),
  // eslint-disable-next-line no-shadow
  [VISIT_IS_CURRENT]: (state) => !!state.currentVisit.UUID,
};

const actions = {
  [VISIT_DOWNLOAD_ALL_FROM_SERVER]: ({ commit }) => new Promise((resolve, reject) => {
    HTTP.get('visits')
      .then((resp) => {
        commit(VISIT_WRITE_DATA_TO_STORE, resp.data);
        resolve(resp);
      })
      .catch((err) => {
        commit(VISIT_ERROR);
        reject(err);
      });
  }),
  // eslint-disable-next-line no-shadow
  [VISIT_UPLOAD_CURRENT_TO_SERVER]: (state) => new Promise((resolve, reject) => {
    // console.log(`visits/${state.getters[VISIT_GET_CURRENT].UUID}`);
    HTTP.put(`visits/${state.getters[VISIT_GET_CURRENT].UUID}`, state.getters[VISIT_GET_CURRENT])
      .then((resp) => {
        resolve(resp);
      })
      .catch((err) => {
        console.log(err);
        state.commit(VISIT_ERROR);
        reject(err);
      });
  }),
  [VISIT_SAVE_CURRENT_TOVUEX]: ({ commit }, visitData) => {
    // console.log('i m here in VISIT_SAVE_CURRENT_TOVUEX action');
    commit(VISIT_UPDATE_CURRENT_IN_VUEX, visitData);
    // if (visitData.UUID !== undefined) { dispatch(VISIT_UPLOAD_CURRENT_TO_SERVER); }
  },
  // eslint-disable-next-line no-shadow
  [VISIT_PUSH_CURRENT_TO_ALL]: (state) => {
    console.log(state.getters[VISIT_GET_CURRENT].UUID);
    const currentUUID = state.getters[VISIT_GET_CURRENT].UUID;
    const index = state.getters[VISIT_GET_ALL].findIndex((x) => x.UUID === currentUUID);
    console.log(index);
    state.commit(VISIT_PUSH_CURRENT_TO_ALL, index);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [VISIT_WRITE_DATA_TO_STORE]: (state, data) => {
    state.visits = data;
  },
  // eslint-disable-next-line no-shadow
  [VISIT_UPDATE_CURRENT_IN_VUEX]: (state, visitData) => {
    // console.log('i m in VISIT_UPDATE_CURRENT_IN_VUEX mutation');
    // eslint-disable-next-line no-param-reassign
    // visitData.status = 1;
    state.currentVisit = visitData;
  },
  // eslint-disable-next-line no-shadow
  [VISIT_ERROR]: (state) => { state.status = 'error'; },
  // eslint-disable-next-line no-shadow
  [VISIT_PUSH_CURRENT_TO_ALL]: (state, index) => {
    state.visits[index] = state.currentVisit;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
