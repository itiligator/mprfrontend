import {
  GOODS_REQUEST,
  GOODS_SUCCESS,
} from '@/store/actions/goods';
import { HTTP } from '@/utils/http';

const state = {
  goodsstate: [],
  goodsdate: '',
  goodsloaded: false,
};

const getters = {
  // eslint-disable-next-line no-shadow,arrow-body-style
  GOODS: (state) => state.goodsstate,
};

const actions = {
  [GOODS_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
    HTTP.get('/products')
      .then((resp) => {
        commit(GOODS_SUCCESS, resp);
        resolve(resp);
      })
      .catch((err) => {
        reject(err);
      });
  }),
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [GOODS_SUCCESS]: (state, resp) => {
    state.goodsstate = resp.data;
    state.goodsloaded = true;
    state.goodsdate = Date();
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
