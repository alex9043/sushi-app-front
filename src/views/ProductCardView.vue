<template>
  <div class="product-card">
    <!-- <img :src="imageSrc" alt="Product Image" /> -->
    <button @click="decrementItem(product)">-</button>
    <h3>{{ product.name }}</h3>
    <p>{{ product.price }}</p>
    <button @click="incrementItem(product)">+</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ProductCardView',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  computed: {
    imageSrc() {
      return this.product.base64image
        ? 'data:image/png;base64,${this.product.base64image}'
        : './image.png';
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart']),
    incrementItem(product) {
      this.addToCart(product);
    },
    decrementItem(product) {
      this.removeFromCart(product);
    },
  },
};
</script>

<style>
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}
.product-card img {
  max-width: 100%;
  height: auto;
}
</style>
