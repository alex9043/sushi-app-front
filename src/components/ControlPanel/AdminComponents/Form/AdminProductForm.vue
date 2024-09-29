<template>
  <div class="admin-product-form">
    <h4>{{ isEditMode ? 'Product Form' : 'Create Product' }}</h4>

    <div v-if="isEditMode && base64Image">
      <img :src="'data:image/jpeg;base64,' + base64Image" alt="Product image" />
    </div>

    <div>
      <label>Categories:</label>
      <div
        v-for="category in allCategories"
        :key="category.id"
        class="checkbox-input-wrapper"
      >
        <input
          type="checkbox"
          :value="category.id"
          v-model="selectedCategories"
          class="checkbox-input"
        />
        {{ category.name }}
      </div>
    </div>

    <div>
      <label>Tags:</label>
      <div v-for="tag in allTags" :key="tag.id" class="checkbox-input-wrapper">
        <input
          type="checkbox"
          :value="tag.id"
          v-model="selectedTags"
          class="checkbox-input"
        />
        {{ tag.name }}
      </div>
    </div>

    <div>
      <label>Ingredients:</label>
      <div
        v-for="ingredient in allIngredients"
        :key="ingredient.id"
        class="checkbox-input-wrapper"
      >
        <input
          type="checkbox"
          :value="ingredient.id"
          v-model="selectedIngredients"
          class="checkbox-input"
        />
        {{ ingredient.name }}
      </div>
    </div>

    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <input
          type="text"
          id="productName"
          v-model="name"
          placeholder="Product name"
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          id="productPrice"
          v-model="price"
          placeholder="Product price"
        />
      </div>

      <!-- Поле загрузки изображения -->
      <div class="form-group">
        <input type="file" @change="handleImageUpload" accept="image/*" />
      </div>

      <div class="form-group">
        <button type="submit" class="product-form-submit">
          {{ isEditMode ? 'Update' : 'Submit' }}
        </button>
      </div>
    </form>

    <button @click="closeForm">Закрыть форму</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { imageToBase64 } from '@/utils/imageUtils';

export default {
  name: 'AdminProductForm',
  props: {
    productData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      name: '',
      price: 0,
      base64Image: '',
      selectedCategories: [],
      selectedTags: [],
      selectedIngredients: [],
      isEditMode: false,
    };
  },
  watch: {
    productData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.isEditMode = true;
          this.name = newVal.name;
          this.price = newVal.price;
          this.base64Image = newVal.base64image;
          this.selectedCategories = newVal.categories.map(
            (category) => category.id,
          );
          this.selectedTags = newVal.tags.map((tag) => tag.id);
          this.selectedIngredients = newVal.ingredients.map(
            (ingredient) => ingredient.id,
          );
        }
      },
    },
  },
  computed: {
    ...mapGetters('home', ['allTags', 'allCategories', 'allIngredients']),
  },
  methods: {
    ...mapActions('home', [
      'fetchCategories',
      'fetchTags',
      'fetchIngredients',
      'createProduct',
      'editProduct',
    ]),

    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        imageToBase64(file).then((base64String) => {
          this.base64Image = base64String.split(',')[1];
        });
      }
    },

    closeForm() {
      this.$emit('close-form');
    },

    submitForm() {
      const data = {
        name: this.name,
        price: this.price,
        base64Image: this.base64Image,
        categories: this.selectedCategories,
        tags: this.selectedTags,
        ingredients: this.selectedIngredients,
      };
      if (this.isEditMode) {
        this.editProduct({ productId: this.productData.id, data: data });
      } else {
        this.createProduct(data);
      }
      this.$emit('close-form');
    },
  },
  created() {
    this.fetchCategories();
    this.fetchTags();
    this.fetchIngredients();
  },
};
</script>

<style lang="scss">
.admin-product-form {
  width: 600px;
  margin: 0 auto;
  padding: 20px;

  h4 {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #cccccc;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .checkbox-input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 5px;
  }
}
</style>
