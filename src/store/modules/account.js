import {
  getAccount,
  getAccounts,
  getUser,
  updateAccount,
  updatePassword,
  putUser,
  deleteUser,
} from '@/plugins/axios/modules/account';

const state = {
  loading: false,
  error: [],
  account: {},
  accounts: [],
  color: 'black',
  backgroundColor: 'white',
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
  SET_ACCOUNT(state, account) {
    state.account = account;
  },
  SET_ACCOUNTS(state, accounts) {
    state.accounts = accounts;
  },
  SET_COLOR(state, color) {
    state.color = color;
  },
  SET_BACKGROUND_COLOR(state, backgroundColor) {
    state.backgroundColor = backgroundColor;
  },
};

const actions = {
  fetchAccount({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    getAccount()
      .then((response) => {
        commit('SET_ACCOUNT', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  fetchAccounts({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    getAccounts()
      .then((response) => {
        commit('SET_ACCOUNTS', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  fetchUser({ commit }, userId) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    getUser(userId)
      .then((response) => {
        commit('SET_ACCOUNT', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  changeAccountData({ commit }, request) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return updateAccount(request)
      .then((response) => {
        commit('SET_ACCOUNT', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  changePassword({ commit }, request) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return updatePassword(request)
      .then((response) => {
        commit('SET_ACCOUNT', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  changeColor({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (state.color === 'black' && state.backgroundColor === 'white') {
      commit('SET_COLOR', 'white');
      commit('SET_BACKGROUND_COLOR', 'black');
    } else {
      commit('SET_COLOR', 'black');
      commit('SET_BACKGROUND_COLOR', 'white');
    }
  },
  changeUser({ commit }, { data, userId }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return putUser({ data: data, userId: userId })
      .then((response) => {
        commit('SET_ACCOUNTS', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  removeUser({ commit }, userId) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return deleteUser(userId)
      .then((response) => {
        commit('SET_ACCOUNTS', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
};

const getters = {
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
  getAccount: (state) => state.account,
  getAccounts: (state) => state.accounts,
  getColor: (state) => state.color,
  getBackgroundColor: (state) => state.backgroundColor,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
