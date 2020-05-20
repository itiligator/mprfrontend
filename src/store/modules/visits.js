/* eslint-disable no-param-reassign */
import { HTTP } from '@/utils/http';
import {
  VISIT_CLOSE_AND_REPLACE_CURRENT,
  VISIT_CLOSE_CURRENT,
  VISIT_DOWNLOAD_ALL_FROM_SERVER,
  VISIT_DOWNLOAD_FINISHED_FROM_SERVER,
  VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER,
  VISIT_DOWNLOAD_PLANNED_FROM_SERVER,
  VISIT_ERROR, VISIT_FLASH_ALL,
  VISIT_GET_CURRENT,
  VISIT_GET_FINISHED,
  VISIT_GET_HISTORY,
  VISIT_GET_PLANNED,
  VISIT_IS_CURRENT,
  VISIT_SAVE_CURRENT_TO_VUEX,
  VISIT_UPLOAD_CURRENT_TO_SERVER,
  VISIT_WRITE_CURRENT_TO_VUEX,
  VISIT_WRITE_FINISHED_TO_VUEX,
  VISIT_WRITE_HISTORY_TO_VUEX_BY_INN,
  VISIT_WRITE_PLANNED_TO_VUEX,

} from '../actions/visits';


const initialCurrentVisit = {
  UUID: null,
  id: null,
  orders: null,
  payment: null,
  date: null,
  dataBase: true,
  clientINN: null,
  processed: false,
  invoice: false,
  status: 0,
  managerID: null,
  author: null,
};

const state = {
  visits: [],
  plannedVisits: [],
  finishedVisits: [],
  historicalVisits: {},
  currentVisit: initialCurrentVisit,
  visitStatus: '',
};

const getters = {
  [VISIT_GET_CURRENT]: (s) => s.currentVisit,
  [VISIT_IS_CURRENT]: (s) => !!s.currentVisit.UUID,
  [VISIT_GET_PLANNED]: (s) => s.plannedVisits,
  [VISIT_GET_FINISHED]: (s) => s.finishedVisits,
  [VISIT_GET_HISTORY]: (s) => s.historicalVisits,
};


const actions = {
  [VISIT_DOWNLOAD_FINISHED_FROM_SERVER]:
    ({ commit }) => new Promise((resolve, reject) => {
      const today = new Date().toISOString().slice(0, 10);
      HTTP.get(`visits?status=2&date=${today}`)
        .then((response) => {
          commit(VISIT_WRITE_FINISHED_TO_VUEX, response.data);
          resolve(response);
        })
        .catch((err) => {
          commit(VISIT_ERROR, err);
          reject(err);
        });
    }),
  [VISIT_DOWNLOAD_PLANNED_FROM_SERVER]:
    ({ commit }) => new Promise((resolve, reject) => {
      HTTP.get('visits?status=0')
        .then((response) => {
          commit(VISIT_WRITE_PLANNED_TO_VUEX, response.data);
          resolve(response);
        })
        .catch((err) => {
          commit(VISIT_ERROR, err);
          reject(err);
        });
    }),
  [VISIT_DOWNLOAD_ALL_FROM_SERVER]:
    ({ dispatch }) => {
      dispatch(VISIT_DOWNLOAD_PLANNED_FROM_SERVER);
      dispatch(VISIT_DOWNLOAD_FINISHED_FROM_SERVER);
    },
  [VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER]:
    ({ commit }, clientINN) => new Promise((resolve, reject) => {
      HTTP.get(`visits??processed=true&status=2&limit=3&clientINN=${clientINN}`)
        .then((response) => {
          commit(VISIT_WRITE_HISTORY_TO_VUEX_BY_INN, { clientINN, data: response.data });
          resolve(response);
        })
        .catch((err) => {
          commit(VISIT_ERROR, err);
          reject(err);
        });
    }),
  [VISIT_SAVE_CURRENT_TO_VUEX]:
    ({ commit }, visitData) => {
      commit(VISIT_WRITE_CURRENT_TO_VUEX, visitData);
    },
  [VISIT_UPLOAD_CURRENT_TO_SERVER]:
    (s) => new Promise((resolve, reject) => {
      const currentVisit = s.getters[VISIT_GET_CURRENT];
      HTTP.put(`visits/${currentVisit.UUID}`, currentVisit)
        .then((resp) => {
          resolve(resp);
        })
        .catch((err) => {
          s.commit(VISIT_ERROR, err);
          reject(err);
        });
    }),
  [VISIT_CLOSE_CURRENT]: (s) => new Promise((resolve, reject) => {
    const currentVisit = JSON.parse(JSON.stringify(s.getters[VISIT_GET_CURRENT]));
    currentVisit.status = 2;
    HTTP.put(`visits/${currentVisit.UUID}`, currentVisit)
      .then((resp) => {
        s.commit(VISIT_CLOSE_AND_REPLACE_CURRENT);
        resolve(resp);
      })
      .catch((err) => {
        s.commit(VISIT_ERROR, err);
        reject(err);
      });
  }),
};

// мутации

const mutations = {
  [VISIT_ERROR]: (s) => { s.visitStatus = 'error'; },
  [VISIT_WRITE_CURRENT_TO_VUEX]: (s, visitData) => { s.currentVisit = visitData; },
  [VISIT_WRITE_PLANNED_TO_VUEX]: (s, visitsData) => { s.plannedVisits = visitsData; },
  [VISIT_WRITE_FINISHED_TO_VUEX]: (s, visitsData) => { s.finishedVisits = visitsData; },
  [VISIT_WRITE_HISTORY_TO_VUEX_BY_INN]: (s, { clientINN, data }) => {
    s.historicalVisits[clientINN] = data;
  },
  [VISIT_FLASH_ALL]: (s) => {
    s.currentVisit = initialCurrentVisit;
    s.plannedVisits = [];
    s.finishedVisits = [];
    s.historicalVisits = {};
    s.visitStatus = 'flashed';
  },
  [VISIT_CLOSE_AND_REPLACE_CURRENT]: (s) => {
    const index = s.plannedVisits.findIndex((x) => x.UUID === s.currentVisit.UUID);
    if (index > -1) {
      s.plannedVisits.splice(index, 1);
    }
    s.currentVisit.status = 2;
    s.finishedVisits.push(s.currentVisit);
    s.currentVisit = initialCurrentVisit;
  },

};


// const getters = {
//   // eslint-disable-next-line no-shadow
//   [VISIT_GET_ALL]: (state) => state.visits,
//   // eslint-disable-next-line no-shadow,arrow-body-style
//   [VISIT_GET_CURRENT]: (state) => state.currentVisit,
//   // eslint-disable-next-line no-shadow
//   [VISIT_GET_BY_UUID]: (state, uuid) => state.visits.filter((visit) => visit.UUID === uuid),
//   // eslint-disable-next-line no-shadow
//   [VISIT_IS_CURRENT]: (state) => !!state.currentVisit.UUID,
// };
//
// const actions = {
//   [VISIT_DOWNLOAD_ALL_FROM_SERVER]: ({ commit }) => new Promise((resolve, reject) => {
//     HTTP.get('visits?status=0')
//       .then((resp) => {
//         commit(VISIT_WRITE_DATA_TO_STORE, resp.data);
//         resolve(resp);
//       })
//       .catch((err) => {
//         commit(VISIT_ERROR);
//         reject(err);
//       });
//   }),
//   // eslint-disable-next-line no-shadow
//   [VISIT_UPLOAD_CURRENT_TO_SERVER]: (state) => new Promise((resolve, reject) => {
//     // console.log(`visits/${state.getters[VISIT_GET_CURRENT].UUID}`);
//     HTTP.put(`visits/${state.getters[VISIT_GET_CURRENT].UUID}`, state.getters[VISIT_GET_CURRENT])
//       .then((resp) => {
//         resolve(resp);
//       })
//       .catch((err) => {
//         console.log(err);
//         state.commit(VISIT_ERROR);
//         reject(err);
//       });
//   }),
//   [VISIT_SAVE_CURRENT_TOVUEX]: ({ commit }, visitData) => {
//     // console.log('i m here in VISIT_SAVE_CURRENT_TOVUEX action');
//     commit(VISIT_UPDATE_CURRENT_IN_VUEX, visitData);
//   },
//   // eslint-disable-next-line no-shadow
//   [VISIT_PUSH_CURRENT_TO_ALL]: (state) => {
//     // console.log(state.getters[VISIT_GET_CURRENT].UUID);
//     const currentUUID = state.getters[VISIT_GET_CURRENT].UUID;
//     const index = state.getters[VISIT_GET_ALL].findIndex((x) => x.UUID === currentUUID);
//     // console.log(index);
//     state.commit(VISIT_PUSH_CURRENT_TO_ALL, index);
//     // state.commit(VISIT_UPDATE_BY_INDEX, index, state.currentVisit);
//   },
// };
//
// const mutations = {
//   // eslint-disable-next-line no-shadow
//   [VISIT_WRITE_DATA_TO_STORE]: (state, data) => {
//     state.visits = data;
//   },
//   // eslint-disable-next-line no-shadow
//   [VISIT_UPDATE_CURRENT_IN_VUEX]: (state, visitData) => {
//     // console.log('i m in VISIT_UPDATE_CURRENT_IN_VUEX mutation');
//     // eslint-disable-next-line no-param-reassign
//     // visitData.status = 1;
//     state.currentVisit = visitData;
//   },
//   // eslint-disable-next-line no-shadow
//   [VISIT_ERROR]: (state) => { state.status = 'error'; },
//   // eslint-disable-next-line no-shadow
//   [VISIT_PUSH_CURRENT_TO_ALL]: (state, index) => {
//     state.visits.$set(index, state.currentVisit);
//   },
//   // eslint-disable-next-line no-shadow
//   [VISIT_UPDATE_BY_INDEX]: (state, index, visitData) => {
//     state.visits.$set(index, visitData);
//   },
// };

export default {
  state,
  getters,
  actions,
  mutations,
};
