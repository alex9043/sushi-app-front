import axios from '@/plugins/axios/axios.js';

export const getProducts = () => {
  return axios.get('/products');
};
export const postProduct = (data) => {
  return axios.post(`/products`, data);
};

export const putProduct = ({ data, productId }) => {
  return axios.put(`/products/${productId}`, data);
};

export const deleteProduct = (productId) => {
  return axios.delete(`/products/${productId}`);
};

export const getTags = () => {
  return axios.get('/products/tags');
};
export const postTag = (data) => {
  return axios.post('/products/tags', data);
};
export const putTag = ({ data, tagId }) => {
  return axios.put(`/products/tags/${tagId}`, data);
};
export const deleteTag = (tagId) => {
  return axios.delete(`/products/tags/${tagId}`);
};

export const getCategories = () => {
  return axios.get('/products/categories');
};
export const postCategory = (data) => {
  return axios.post('/products/categories', data);
};

export const putCategory = ({ data, categoryId }) => {
  return axios.put(`/products/category/${categoryId}`, data);
};
export const deleteCategory = (categoryId) => {
  return axios.delete(`/products/category/${categoryId}`);
};

export const getIngredients = () => {
  return axios.get('/products/ingredients');
};
export const postIngredient = (data) => {
  return axios.post('/products/ingredients', data);
};

export const putIngredient = ({ data, ingredientId }) => {
  return axios.put(`/products/ingredients/${ingredientId}`, data);
};

export const deleteIngredient = (ingredientId) => {
  return axios.delete(`/products/ingredients/${ingredientId}`);
};

export const postReview = (productId, data) => {
  return axios.post(`/products/${productId}/reviews`, data);
};
