import {
  getProducts,
  getCategories,
  postReview,
} from '@/plugins/axios/modules/home';

const state = {
  errors: [],
  products: [],
  categories: [],
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_ERRORS(state, errors) {
    state.errors = errors;
  },
  CLEAR_ERRORS(state) {
    state.errors = [];
  },
};

const actions = {
  fetchProducts({ commit }) {
    getProducts().then((response) => {
      commit('SET_PRODUCTS', response.data.products);
    });
  },
  fetchCategories({ commit }) {
    getCategories().then((response) => {
      commit('SET_CATEGORIES', response.data.categories);
    });
  },
  createReview({ commit }, { productId, data }) {
    commit('CLEAR_ERRORS');
    postReview(productId, data).catch((errors) => {
      commit('SET_ERRORS', errors.response.data.errorMessages);
    });
  },
};

const getters = {
  allProducts: (state) => state.products,
  allCategories: (state) => state.categories,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
