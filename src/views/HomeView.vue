<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="category">
      <h2>{{ category.name }}</h2>
      <div class="products">
        <ProductCardComponent
          v-for="product in filteredProductsByCategory(category.id)"
          :key="product.id"
          :product="product"
          @openReviews="openReviewsModal"
        />
      </div>
    </div>

    <ReviewModal
      v-if="showReviewModal"
      :product="selectedProduct"
      @close="closeReviewsModal"
    />
  </div>
</template>

<script>
import ProductCardComponent from '@/components/ProductCardComponent.vue';
import ReviewModal from '@/components/ControlPanel/modal/ReviewModal.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'HomeView',
  components: {
    ProductCardComponent,
    ReviewModal,
  },
  data() {
    return {
      selectedProduct: null,
      showReviewModal: false,
    };
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
    openReviewsModal(product) {
      this.selectedProduct = product;
      this.showReviewModal = true;
    },
    closeReviewsModal() {
      this.showReviewModal = false;
      this.selectedProduct = null;
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
