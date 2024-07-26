import { register, login } from "@/plugins/axios/modules/auth";

const state = {
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  register({ commit }, payload) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    return register(payload)
      .then((response) => {
        const tokens = response.data;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        commit("SET_TOKENS", tokens);
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },
  login({ commit }, payload) {
    commit("SET_LOADING", true);
    commit("CLEAR_ERROR");

    return login(payload)
      .then((response) => {
        const tokens = response.data;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        commit("SET_TOKENS", tokens);
      })
      .finally(() => {
        commit("SET_LOADING", false);
      });
  },
};

const getters = {
  isAuthenticated: (state) => !!state.accessToken,
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
