<template>
  <div class="modal-overlay">
    <div class="modal">
      <button @click="closeModal" class="close-button">✖</button>
      <h2>Отзывы</h2>
      <div
        v-for="review in product.reviews"
        :key="review.id"
        class="review-card"
      >
        <h3>{{ review.reviewerName }}</h3>
        <p>{{ new Date(review.createdDate).toLocaleDateString() }}</p>
        <RatingStars :rating="review.rating" />
        <p>{{ review.reviewText }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import RatingStars from '@/components/ControlPanel/RatingStars.vue';

export default {
  name: 'ReviewModal',
  components: { RatingStars },
  props: {
    product: { type: Object, required: true },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-height: 80vh;
    overflow-y: auto;
    .close-button {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      float: right;
    }
    .review-card {
      border-bottom: 1px solid #ddd;
      margin-bottom: 10px;
      padding-bottom: 10px;
    }
  }
}
</style>
