// import { createGuestOrder } from "@/plugins/axios/modules/order";

import { createGuestOrder } from '@/plugins/axios/modules/order';

const state = {
  loading: false,
  error: [],
  order: [],
  lastOrder: false,
};

const mutations = {
  SET_LOADING(state, isLoading) {
    state.loading = isLoading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_ORDER(state, order) {
    state.order = order;
  },
  SET_LAST_ORDER(state, lastOrder) {
    state.lastOrder = lastOrder;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  createOrder({ commit, dispatch }, payload) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    return createGuestOrder(payload)
      .then((response) => {
        localStorage.setItem('order', JSON.stringify(response.data));
        commit('SET_ORDER', response.data);
        dispatch('cart/clearCart', null, { root: true });
        return response.data;
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data.errorMessages);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  checkLastOrder({ commit }) {
    commit('SET_LOADING', true);
    commit('SET_ERROR', null);
    if (localStorage.getItem('order')) {
      const order = JSON.parse(localStorage.getItem('order'));
      commit('SET_ORDER', order);
      commit('SET_LAST_ORDER', true);
    }
  },
};

const getters = {
  getOrder: (state) => state.order,
  getLastOrder: (state) => state.lastOrder,
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
