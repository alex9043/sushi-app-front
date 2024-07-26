import { getDistricts } from "@/plugins/axios/modules/district";

const state = {
  districts: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_DISTRICTS(state, districts) {
    state.districts = districts;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  fetchDistricts({ commit }) {
    commit("SET_LOADING", true);
    commit("SET_ERROR", null);

    getDistricts()
      .then((response) => {
        console.log(response);
        commit("SET_DISTRICTS", response.data.districts);
      })
      .catch((error) => {
        commit("SET_ERROR", error);
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },
};

const getters = {
  allDistricts: (state) => state.districts,
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
