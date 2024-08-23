import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from '@/plugins/axios/modules/cart';

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
  fetchCart({ commit, rootGetters }) {
    const isAuth = rootGetters['auth/isAuthenticated'];
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (isAuth) {
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
    } else {
      commit('SET_CART', JSON.parse(localStorage.getItem('cart')) || []);
      commit('SET_LOADING', false);
    }
  },
  addToCart({ commit, rootGetters }, payload) {
    const isAuth = rootGetters['auth/isAuthenticated'];
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (isAuth) {
      return addToCart(payload.id)
        .then((response) => {
          commit('SET_CART', response.data.cartItems || []);
        })
        .catch((error) => {
          commit('SET_ERROR', error.message);
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length !== 0) {
        let productIdx = cart.findIndex(
          (item) => item.product.id === payload.id,
        );
        if (productIdx !== -1) {
          cart[productIdx].count += 1;
        } else {
          cart.push({
            count: 1,
            product: {
              id: payload.id,
              name: payload.name,
              price: payload.price,
            },
          });
        }
      } else {
        cart.push({
          count: 1,
          product: {
            id: payload.id,
            name: payload.name,
            price: payload.price,
          },
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      commit('SET_CART', cart);
      commit('SET_LOADING', false);
    }
  },
  removeFromCart({ commit, rootGetters }, payload) {
    const isAuth = rootGetters['auth/isAuthenticated'];
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (isAuth) {
      commit('SET_LOADING', true);
      commit('CLEAR_ERROR');
      return removeFromCart(payload.id)
        .then((response) => {
          commit('SET_CART', response.data.cartItems || []);
        })
        .catch((error) => {
          commit('SET_ERROR', error.message);
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    } else {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      if (cart.length !== 0) {
        let productIdx = cart.findIndex(
          (item) => item.product.id === payload.id,
        );
        if (productIdx !== -1) {
          cart[productIdx].count -= 1;
          if (cart[productIdx].count === 0) {
            cart.splice(productIdx, 1);
          }
        }
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      commit('SET_CART', cart);
      commit('SET_LOADING', false);
    }
  },
  clearCart({ commit, rootGetters }) {
    const isAuth = rootGetters['auth/isAuthenticated'];
    commit('SET_LOADING', true);
    commit('CLEAR_ERROR');
    if (isAuth) {
      return clearCart()
        .then(() => {
          commit('SET_CART', []);
        })
        .catch((error) => {
          commit('SET_ERROR', error.message);
        })
        .finally(() => {
          commit('SET_LOADING', false);
        });
    } else {
      localStorage.removeItem('cart');
      commit('SET_CART', []);
      commit('SET_LOADING', false);
    }
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
