<template>
  <div class="review-form-wrapper">
    <form @submit.prevent="submitForm" class="review-form">
      <div class="form-group">
        <input
          type="text"
          id="reviewerName"
          v-model="reviewerName"
          placeholder="name"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          id="reviewText"
          v-model="reviewText"
          placeholder="review..."
        />
      </div>
      <div class="form-group">
        <input type="number" id="rating" v-model="rating" />
      </div>
      <div class="form-group">
        <button type="submit" class="review-form-submit">Отправить</button>
      </div>
    </form>
    <button @click="closeForm" class="review-close-button">
      Закрыть форму
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ReviewForm',
  props: {
    isShowForm: {
      type: Boolean,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reviewerName: '',
      reviewText: '',
      rating: null,
    };
  },
  methods: {
    ...mapActions('home', ['createReview']),
    closeForm() {
      this.$emit('close-form');
    },
    submitForm() {
      const data = {
        reviewerName: this.reviewerName,
        reviewText: this.reviewText,
        rating: this.rating,
      };
      this.createReview({ productId: this.productId, data });
      this.closeForm();
    },
  },
};
</script>

<style scoped lang="scss">
.review-form-wrapper {
  .review-form {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    .form-group {
      margin-bottom: 10px;
      .review-form-submit {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
