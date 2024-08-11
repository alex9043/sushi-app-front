<template>
  <div class="product-card">
    <!-- <img :src="imageSrc" alt="Product Image" /> -->
    <h3>{{ product.name }}</h3>
    <p>{{ product.price }}</p>
  </div>
</template>

<script>
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
