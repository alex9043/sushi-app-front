import {
  getProducts,
  getTags,
  getCategories,
  getIngredients,
  postProduct,
  postTag,
  postCategory,
  postIngredient,
  postReview,
  putProduct,
  putTag,
  putCategory,
  putIngredient,
  deleteProduct,
  deleteTag,
  deleteCategory,
  deleteIngredient,
} from '@/plugins/axios/modules/home';

const state = {
  errors: [],
  products: [],
  categories: [],
  tags: [],
  ingredients: [],
};

const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
  SET_CATEGORIES(state, categories) {
    state.categories = categories;
  },
  SET_TAGS(state, tags) {
    state.tags = tags;
  },
  SET_INGREDIENTS(state, ingredients) {
    state.ingredients = ingredients;
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
  createProduct({ commit }, data) {
    commit('CLEAR_ERRORS');
    postProduct(data)
      .then((response) => {
        commit('SET_PRODUCTS', response.data.products);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  editProduct({ commit }, { productId, data }) {
    commit('CLEAR_ERRORS');
    putProduct({ productId, data })
      .then((response) => {
        commit('SET_PRODUCTS', response.data.products);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  removeProduct({ commit }, productId) {
    commit('CLEAR_ERRORS');
    deleteProduct(productId)
      .then((response) => {
        commit('SET_PRODUCTS', response.data.products);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },

  fetchTags({ commit }) {
    getTags().then((response) => {
      commit('SET_TAGS', response.data.tags);
    });
  },
  createTag({ commit }, data) {
    commit('CLEAR_ERRORS');
    postTag(data)
      .then((response) => {
        commit('SET_TAGS', response.data.tags);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  editTag({ commit }, { tagId, data }) {
    commit('CLEAR_ERRORS');
    putTag({ tagId, data })
      .then((response) => {
        commit('SET_TAGS', response.data.tags);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  removeTag({ commit }, tagId) {
    commit('CLEAR_ERRORS');
    deleteTag(tagId)
      .then((response) => {
        commit('SET_TAGS', response.data.tags);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },

  fetchCategories({ commit }) {
    getCategories().then((response) => {
      commit('SET_CATEGORIES', response.data.categories);
    });
  },
  createCategory({ commit }, data) {
    commit('CLEAR_ERRORS');
    postCategory(data)
      .then((response) => {
        commit('SET_CATEGORIES', response.data.categories);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  editCategory({ commit }, { categoryId, data }) {
    commit('CLEAR_ERRORS');
    putCategory({ categoryId, data })
      .then((response) => {
        commit('SET_CATEGORIES', response.data.categories);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  removeCategory({ commit }, categoryId) {
    commit('CLEAR_ERRORS');
    deleteCategory(categoryId)
      .then((response) => {
        commit('SET_CATEGORIES', response.data.categories);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },

  fetchIngredients({ commit }) {
    getIngredients().then((response) => {
      commit('SET_INGREDIENTS', response.data.ingredients);
    });
  },
  createIngredient({ commit }, data) {
    commit('CLEAR_ERRORS');
    postIngredient(data).catch((errors) => {
      commit('SET_ERRORS', errors.response.data.errorMessages);
    });
  },
  editIngredient({ commit }, { ingredientId, data }) {
    commit('CLEAR_ERRORS');
    putIngredient({ ingredientId, data })
      .then((response) => {
        commit('SET_INGREDIENTS', response.data.ingredients);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
      });
  },
  removeIngredient({ commit }, ingredientId) {
    commit('CLEAR_ERRORS');
    deleteIngredient(ingredientId)
      .then((response) => {
        commit('SET_INGREDIENTS', response.data.ingredients);
      })
      .catch((errors) => {
        commit('SET_ERRORS', errors.response.data.errorMessages);
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
  allTags: (state) => state.tags,
  allIngredients: (state) => state.ingredients,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
