import { register, login } from '@/plugins/axios/modules/auth';

const state = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  roles: [],
  loading: false,
  error: null,
};

const mutations = {
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
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
  LOGOUT(state) {
    state.accessToken = null;
    state.refreshToken = null;
    state.roles = [];
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

const actions = {
  register({ commit }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return register(payload)
      .then((response) => {
        const tokens = response.data;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        commit('SET_TOKENS', tokens);
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  login({ commit }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return login(payload)
      .then((response) => {
        const { accessToken, refreshToken, roles } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        commit('SET_TOKENS', { accessToken, refreshToken });
        commit('SET_ROLES', roles);
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
};

const getters = {
  isAuthenticated: (state) => !!state.accessToken,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  getRoles: (state) => state.roles,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
