<template>
  <div v-for="category in categories" :key="category.id" class="category">
    <h2>{{ category.name }}</h2>
    <div class="products">
      <ProductCardComponent
        v-for="product in filteredProductsByCategory(category.id)"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductCardComponent from '@/components/ProductCardComponent.vue';

export default {
  name: 'HomeView',
  components: {
    ProductCardComponent,
  },
  computed: {
    ...mapGetters('home', ['allCategories', 'allProducts']),
    categories() {
      return this.allCategories;
    },
    products() {
      return this.allProducts;
    },
  },
  methods: {
    ...mapActions('home', ['fetchCategories', 'fetchProducts']),
    filteredProductsByCategory(categoryId) {
      return this.products.filter((product) =>
        product.categories.some((category) => category.id === categoryId),
      );
    },
  },
  created() {
    this.fetchCategories();
    this.fetchProducts();
  },
};
</script>

<style>
.category {
  margin-bottom: 20px;
}
.products {
  display: flex;
  flex-wrap: wrap;
}
</style>
