<template>
  <div class="product-card">
    <div class="tags">
      <p v-for="tag in product.tags" :key="tag.id" class="tag">
        {{ tag.name }}
      </p>
    </div>
    <img :src="imageSrc" alt="Product Image" />
    <div class="product-cart-content">
      <button @click="decrementItem(product)">-</button>
      <div>
        <h3>{{ product.name }}</h3>
        <p>{{ product.price }}</p>
        <div class="ingredients">
          <p
            v-for="ingredient in product.ingredients"
            :key="ingredient.id"
            class="ingredient"
          >
            {{ ingredient.name }},
          </p>
        </div>
        <button @click="handleOpenReviews">Отзывы</button>
        <RatingStars :rating="product.rating" />
      </div>
      <button @click="incrementItem(product)">+</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { base64ToImage } from '@/utils/imageUtils';
import RatingStars from '@/components/ControlPanel/RatingStars.vue';

export default {
  name: 'ProductCardComponent',
  components: {
    RatingStars,
  },
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageSrc: '',
      showReviewModal: false,
    };
  },
  async mounted() {
    await this.setImageSrc();
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart']),

    async setImageSrc() {
      if (this.product.base64image) {
        try {
          const base64Data = this.product.base64image.startsWith('data:')
            ? this.product.base64image
            : `data:image/jpeg;base64,${this.product.base64image}`;

          const imageBlob = base64ToImage(base64Data);
          this.imageSrc = URL.createObjectURL(imageBlob);
        } catch (error) {
          console.error(
            'Ошибка при преобразовании Base64 в изображение:',
            error,
          );
          this.imageSrc = require('@/assets/product/product_not_found.jpg');
        }
      } else {
        this.imageSrc = require('@/assets/product/product_not_found.jpg');
      }
    },
    incrementItem(product) {
      this.addToCart(product);
    },
    decrementItem(product) {
      this.removeFromCart(product);
    },
    handleOpenReviews() {
      this.$emit('openReviews', this.product);
    },
  },
};
</script>

<style lang="scss">
.product-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
    p {
      margin: 0 5px 5px 0;
      background-color: #f0f0f0;
      padding: 3px 5px;
      border-radius: 3px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  img {
    max-width: 100%;
    height: auto;
  }
  .product-cart-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      padding: 5px 10px;
      border: none;
      background-color: #fff;
      color: #000;
      cursor: pointer;
    }
    .ingredients {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .ingredient {
        margin: 0 5px 5px 0;
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
