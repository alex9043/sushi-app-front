<template>
  <div class="cart">
    <div v-if="isCartEmpty" class="empty-cart">
      В корзину еще не добавлены товары
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <button @click="decrementItem(item.product)">-</button>
        <p>{{ item.product.name }}</p>
        <p>Количество: {{ item.count }}</p>
        <p>Цена: {{ item.product.price * item.count }}</p>
        <button @click="incrementItem(item.product)">+</button>
      </div>
      <button @click="removeCart">X</button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartComponent',
  computed: {
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('auth', ['isAuthenticated']),
    isCartEmpty() {
      return this.cart.length === 0;
    },
    cart() {
      return this.getCart;
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart', 'clearCart']),
    incrementItem(product) {
      this.addToCart(product);
    },
    decrementItem(product) {
      this.removeFromCart(product);
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
