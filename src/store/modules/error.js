const state = {
  errorMessage: null,
};

const getters = {
  getErrorMessage: (state) => state.errormessage,
};

const actions = {
  setError({ commit }, message) {
    commit('setError', message);
  },
  clearError({ commit }) {
    commit('clearError');
  },
};

const mutations = {
  setError(state, message) {
    state.errorMessage = message;
  },
  clearError(state) {
    state.errorMessage = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
