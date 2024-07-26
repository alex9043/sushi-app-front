import { getProducts, getCategories } from "@/plugins/axios/modules/home";

const state = {
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
};

const actions = {
  fetchProducts({ commit }) {
    getProducts().then((response) => {
      console.log(response);
      commit("SET_PRODUCTS", response.data.products);
    });
  },
  fetchCategories({ commit }) {
    getCategories().then((response) => {
      console.log(response);
      commit("SET_CATEGORIES", response.data.categories);
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
