<template>
  <div class="order-container">
    <div v-if="!showLastOrder">
      <h2>Ваш заказ</h2>
      <div class="cart-in-order">
        <h3>Корзина</h3>
        <CartComponent is-order="true" />
      </div>
      <OrderForm />
    </div>
    <div v-else>
      <LastOrderComponent />
    </div>
    <button @click="toggleView" v-if="!cartIsNull">
      {{ showLastOrder ? 'Сделать новый заказ' : 'Посмотреть последний заказ' }}
    </button>
  </div>
</template>

<script>
import CartComponent from '@/components/CartComponent.vue';
import OrderForm from '@/components/Form/OrderForm.vue';
import LastOrderComponent from '@/components/Form/LastOrderComponent.vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'OrderView',
  components: {
    CartComponent,
    OrderForm,
    LastOrderComponent,
  },
  methods: {
    ...mapActions('order', ['checkLastOrder']),
    ...mapMutations('order', ['SET_LAST_ORDER']),
    toggleView() {
      this.SET_LAST_ORDER(!this.showLastOrder);
    },
  },
  computed: {
    ...mapGetters('order', ['getLastOrder']),
    ...mapGetters('cart', ['getCart']),
    showLastOrder() {
      return this.getLastOrder;
    },
    cartIsNull() {
      return this.getCart.length === 0;
    },
  },
  created() {
    this.checkLastOrder();
  },
};
</script>

<style scoped lang="scss">
.order-container {
  .cart-in-order {
    margin: 0 auto;
    width: 50%;
  }
}
</style>
