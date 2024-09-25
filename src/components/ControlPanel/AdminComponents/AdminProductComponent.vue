<template>
  <div class="admin-product">
    <h4>Products</h4>
    <div>
      <label for="tags">Tags:</label>
      <select v-model="selectedTag">
        <option value="">All Tags</option>
        <option v-for="tag in uniqueTags" :key="tag" :value="tag">
          {{ tag }}
        </option>
      </select>
    </div>
    <div>
      <label for="categories">Categories:</label>
      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option
          v-for="category in uniqueCategories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>
    </div>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Tags</th>
          <th>Categories</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.rating }}</td>
          <td>{{ product.tags.map((tag) => tag.name).join(', ') }}</td>
          <td>
            {{ product.categories.map((category) => category.name).join(', ') }}
          </td>
          <td>
            <button @click="editProduct(product.id)">Edit</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="closePanel">Закрыть окно</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminProductComponent',
  data() {
    return {
      selectedTag: '',
      selectedCategory: '',
    };
  },
  computed: {
    ...mapGetters('home', ['allProducts']),
    uniqueTags() {
      const tagsSet = new Set();
      this.allProducts.forEach((product) => {
        product.tags.forEach((tag) => {
          tagsSet.add(tag.name);
        });
      });
      return Array.from(tagsSet);
    },
    uniqueCategories() {
      const categoriesSet = new Set();
      this.allProducts.forEach((product) => {
        product.categories.forEach((category) => {
          categoriesSet.add(category.name);
        });
      });
      return Array.from(categoriesSet);
    },
    filteredProducts() {
      return this.allProducts.filter((product) => {
        const matchesTag = this.selectedTag
          ? product.tags.some((tag) => tag.name === this.selectedTag)
          : true;
        const matchesCategory = this.selectedCategory
          ? product.categories.some(
              (category) => category.name === this.selectedCategory,
            )
          : true;
        return matchesTag && matchesCategory;
      });
    },
  },
  methods: {
    ...mapActions('home', ['fetchProducts']),
    closePanel() {
      this.$emit('close-panel');
    },
    editProduct(productId) {
      console.log(`Edit product with ID: ${productId}`);
    },
    deleteProduct(productId) {
      console.log(`Delete product with ID: ${productId}`);
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>

<style scoped lang="scss">
.admin-product {
  width: 500px;
  margin: 0 auto;
  padding: 20px;

  table {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
    }
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  select {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 10px;
  }
}
</style>
