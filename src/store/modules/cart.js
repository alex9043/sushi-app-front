import { getCart, addToCart } from '@/plugins/axios/modules/cart';

const state = {
  loading: false,
  error: null,
  cart: [],
};

const mutations = {
  SET_CART(state, cart) {
    state.cart = cart;
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
  fetchCart({ commit }) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return getCart()
      .then((response) => {
        commit('SET_CART', response.data.cartItems || []);
      })
      .catch((error) => {
        commit('SET_ERROR', error.message);
      })
      .finally(() => {
        commit('SET_LOADING', false);
      });
  },
  addToCart({ commit }, payload) {
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    return addToCart(payload)
      .then((response) => {
        commit('SET_CART', response.data.cartItems || []);
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
  getCart: (state) => state.cart,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
