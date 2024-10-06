<template>
  <div class="admin-product">
    <div
      v-if="
        !isTagComponent &&
        !isCategoryComponent &&
        !isIngredientComponent &&
        !isProductForm
      "
    >
      <h4>Products</h4>
      <div class="product-add-buttons">
        <button @click="showTagComponent">Теги</button>
        <button @click="showCategoryComponent">Категории</button>
        <button @click="showIngredientComponent">Ингредиенты</button>
        <button @click="showProductForm">Добавить продукт</button>
      </div>

      <div>
        <label for="name">Search by Name:</label>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Enter product name"
        />
      </div>

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
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Tags</th>
            <th>Categories</th>
            <th>Ingredients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>
              <img
                v-if="product.base64image"
                :src="'data:image/jpeg;base64,' + product.base64image"
                alt="Product image"
                class="product-image"
              />
              <img
                v-else
                src="@/assets/product/product_not_found.jpg"
                alt="No image available"
                class="product-image"
              />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.rating }}</td>
            <td>{{ product.tags.map((tag) => tag.name).join(', ') }}</td>
            <td>
              {{
                product.categories.map((category) => category.name).join(', ')
              }}
            </td>
            <td>
              {{
                product.ingredients
                  .map((ingredient) => ingredient.name)
                  .join(', ')
              }}
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

    <AdminTagComponent
      v-if="isTagComponent"
      @close-component="closeComponent"
    />
    <AdminCategoryComponent
      v-if="isCategoryComponent"
      @close-component="closeComponent"
    />
    <AdminIngredientComponent
      v-if="isIngredientComponent"
      @close-component="closeComponent"
    />
    <AdminProductForm
      v-if="isProductForm"
      :productData="selectedProduct"
      @close-form="closeComponent"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AdminTagComponent from '@/components/ControlPanel/AdminComponents/product/AdminTagComponent.vue';
import AdminCategoryComponent from '@/components/ControlPanel/AdminComponents/product/AdminCategoryComponent.vue';
import AdminIngredientComponent from '@/components/ControlPanel/AdminComponents/product/AdminIngredientComponent.vue';
import AdminProductForm from '@/components/ControlPanel/AdminComponents/product/Form/AdminProductForm.vue';

export default {
  name: 'AdminProductComponent',
  components: {
    AdminTagComponent,
    AdminCategoryComponent,
    AdminIngredientComponent,
    AdminProductForm,
  },
  data() {
    return {
      selectedTag: '',
      selectedCategory: '',
      selectedProduct: null,
      searchQuery: '',
      isTagComponent: '',
      isCategoryComponent: '',
      isIngredientComponent: '',
      isProductForm: '',
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

        const matchesName = product.name
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());

        return matchesTag && matchesCategory && matchesName;
      });
    },
  },
  methods: {
    ...mapActions('home', ['fetchProducts', 'removeProduct']),
    closePanel() {
      this.$emit('close-panel');
    },
    editProduct(productId) {
      this.selectedProduct = this.allProducts.find(
        (product) => product.id === productId,
      );
      this.showProductForm();
    },
    deleteProduct(productId) {
      this.removeProduct(productId);
    },
    showTagComponent() {
      this.isTagComponent = true;
    },
    showCategoryComponent() {
      this.isCategoryComponent = true;
    },
    showIngredientComponent() {
      this.isIngredientComponent = true;
    },
    showProductForm() {
      this.isProductForm = true;
    },
    closeComponent() {
      this.isTagComponent = false;
      this.isCategoryComponent = false;
      this.isIngredientComponent = false;
      this.isProductForm = false;
      this.selectedProduct = null;
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

  .product-add-buttons {
    display: flex;
    justify-content: space-between;

    button {
      padding: 5px 10px;
      background-color: #ddd;
      color: #000;
      border: none;
      cursor: pointer;
    }
  }

  table {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #f4f4f4;
    }
  }

  .product-image {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  select,
  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 10px;
  }
}
</style>
