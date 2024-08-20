<template>
  <div class="cart">
    <div v-if="isCartEmpty" class="empty-cart">
      В корзину еще не добавлены товары
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <button @click="decrementItem(item.product.id)">-</button>
        <p>{{ item.product.name }}</p>
        <p>Количество: {{ item.count }}</p>
        <p>Цена: {{ item.product.price * item.count }}</p>
        <button @click="incrementItem(item.product.id)">+</button>
      </div>
      <button @click="removeCart">X</button>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex';

export default {
  name: 'CartView',
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isCartEmpty() {
      return this.cart.length === 0;
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart', 'clearCart']),
    incrementItem(productId) {
      this.addToCart(productId);
    },
    decrementItem(productId) {
      this.removeFromCart(productId);
    },
    removeCart() {
      this.clearCart();
    },
  },
};
</script>

<style lang="scss">
.cart {
  background: #ffffff;
  border: 1px solid #cccccc;
  padding: 10px;
  width: 100%;
  .empty-cart {
    text-align: center;
    color: #333333;
  }
  .cart-items {
    display: flex;
    flex-direction: column;
    .cart-item {
      border-bottom: 1px solid #dddddd;
      padding: 10px 0;
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
</style>
