import { getDistricts, getAddresses } from '@/plugins/axios/modules/address';

const state = {
  districts: [],
  addresses: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_DISTRICTS(state, districts) {
    state.districts = districts;
  },
  SET_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  fetchDistricts({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    getDistricts()
      .then((response) => {
        commit('SET_DISTRICTS', response.data.districts);
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  fetchAddresses({ commit, rootGetters }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (rootGetters['auth/isAuthenticated']) {
      return getAddresses()
        .then((response) => {
          commit('SET_ADDRESSES', response.data.addresses);
        })
        .catch((error) => {
          commit('SET_ERROR', error);
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    }
  },
};

const getters = {
  allDistricts: (state) => state.districts,
  allAddresses: (state) => state.addresses,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
