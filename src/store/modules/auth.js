import { register, login } from '@/plugins/axios/modules/auth';
import { jwtDecode } from 'jwt-decode';

const state = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isUser: false,
  isAdmin: false,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const mutations = {
  SET_TOKENS(state, tokens) {
    state.accessToken = tokens.accessToken;
    state.refreshToken = tokens.refreshToken;
  },
  SET_AUTH_STATE(state, { isUser, isAdmin, isAuthenticated }) {
    state.isUser = isUser;
    state.isAdmin = isAdmin;
    state.isAuthenticated = isAuthenticated;
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
    state.isUser = false;
    state.isAdmin = false;
    state.isAuthenticated = false;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },
};

const actions = {
  register({ commit, dispatch, rootGetters }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return register(payload)
      .then((response) => {
        const tokens = response.data;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        commit('SET_TOKENS', tokens);
        dispatch('decodeAndSetAuthState', tokens.accessToken);
        if (rootGetters['cart/getCart'].length > 0) {
          dispatch('syncCartWithServer');
        }
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  login({ commit, dispatch, rootGetters }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return login(payload)
      .then((response) => {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        commit('SET_TOKENS', { accessToken, refreshToken });
        dispatch('decodeAndSetAuthState', accessToken);
        if (rootGetters['cart/getCart'].length > 0) {
          dispatch('syncCartWithServer');
        }
      })
      .catch((error) => {
        commit('SET_ERROR', error);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  initializeAuthState({ dispatch }) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch('decodeAndSetAuthState', accessToken);
    }
  },
  decodeAndSetAuthState({ commit }, accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      const roles = decodedToken.roles || [];
      const isUser = roles.includes('ROLE_USER');
      const isAdmin = roles.includes('ROLE_ADMIN');
      const isAuthenticated = true;

      commit('SET_AUTH_STATE', { isUser, isAdmin, isAuthenticated });
    } catch (error) {
      commit('LOGOUT');
    }
  },
  syncCartWithServer({ dispatch }) {
    console.log('sync');
    dispatch('cart/refreshCart', null, { root: true });
  },
  logout({ commit }) {
    commit('LOGOUT');
  },
};

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  isUser: (state) => state.isUser,
  isAdmin: (state) => state.isAdmin,
  isLoading: (state) => state.loading,
  getAccessToken: (state) => state.accessToken,
  getRefreshToken: (state) => state.refreshToken,
  getError: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
