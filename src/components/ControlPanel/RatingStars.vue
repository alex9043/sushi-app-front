<template>
  <div class="rating-stars">
    <span v-for="n in fullStars" :key="`full-${n}`" class="star full-star"
      >★</span
    >
    <span v-if="hasHalfStar" class="star half-star">★</span>
    <span v-for="n in emptyStars" :key="`empty-${n}`" class="star empty-star"
      >★</span
    >
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fullStars() {
      return Math.floor(this.rating);
    },
    hasHalfStar() {
      return this.rating % 1 >= 0.5;
    },
    emptyStars() {
      return 5 - this.fullStars - (this.hasHalfStar ? 1 : 0);
    },
  },
};
</script>

<style>
.star {
  color: gray;
  font-size: 20px;
}

.full-star {
  color: gold;
}

.half-star {
  background: linear-gradient(to right, gold 50%, gray 50%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
