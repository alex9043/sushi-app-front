<template>
  <div class="cart">
    <div v-if="isCartEmpty" class="empty-cart">
      В корзину еще не добавлены товары
    </div>
    <div v-else class="cart-items">
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <button @click="decrementItem(item.product)" class="cart-item-btn">
          -
        </button>
        <div class="cart-item-wrapper">
          <p>{{ item.product.name }}</p>
          <p>Количество: {{ item.count }}</p>
          <p>Цена: {{ item.product.price * item.count }}</p>
        </div>
        <button @click="incrementItem(item.product)" class="cart-item-btn">
          +
        </button>
      </div>
      <button @click="removeCart">X</button>
    </div>
    <div class="cart-link" v-if="!isCartEmpty">
      <router-link to="/order">Перейти к заказу</router-link>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartComponent',
  props: {
    isOrder: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  computed: {
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('order', ['getLastOrder']),
    isCartEmpty() {
      return this.cart.length === 0;
    },
    cart() {
      return this.getCart;
    },
  },
  methods: {
    ...mapActions('cart', ['addToCart', 'removeFromCart', 'clearCart']),
    ...mapActions('order', ['checkLastOrder']),
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
  created() {
    this.checkLastOrder();
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
      display: flex;
      justify-content: center;
      align-items: center;
      &:last-child {
        border-bottom: none;
      }
      .cart-item-btn {
        width: 30px;
        height: 30px;
      }
    }
  }
  .cart-link {
    margin-top: 15px;
    text-align: center;
    a {
      color: #333333;
      border: 1px solid #333333;
      padding: 5px 10px;
      &:hover {
        background: #cccccc;
        color: #333333;
      }
    }
  }
}
</style>
