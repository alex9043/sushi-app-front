import {
  createGuestOrder,
  createUserOrder,
  getOrders,
} from '@/plugins/axios/modules/order';

const state = {
  loading: false,
  error: [],
  order: {},
  orders: [],
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
  SET_ORDERS(state, orders) {
    state.orders = orders;
  },
  SET_LAST_ORDER(state, lastOrder) {
    state.lastOrder = lastOrder;
  },
  CLEAR_ERROR(state) {
    state.error = null;
  },
};

const actions = {
  createGuestOrder({ commit, dispatch }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
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
  createUserOrder({ commit, dispatch }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return createUserOrder(payload)
      .then((response) => {
        commit('SET_ORDERS', response.data);
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
    commit('CLEAR_ERROR');
    const savedOrder = localStorage.getItem('order');
    if (savedOrder) {
      const order = JSON.parse(savedOrder);
      commit('SET_ORDER', order);
      commit('SET_LAST_ORDER', true);
    } else {
      commit('SET_LAST_ORDER', false);
    }
    commit('SET_LOADING', false);
  },
  fetchOrders({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return getOrders()
      .then((response) => {
        commit('SET_ORDERS', response.data);
      })
      .catch((error) => {
        commit('SET_ERROR', error.response.data.errorMessages);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
};

const getters = {
  getOrder: (state) => state.order,
  getOrders: (state) => state.orders,
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
