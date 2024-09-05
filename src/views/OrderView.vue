<template>
  <div class="order-container">
    <div>
      <h2>Ваш заказ</h2>
      <div class="cart-in-order">
        <h3>Корзина</h3>
        <CartComponent :is-order="true" />
      </div>
      <OrderForm />
    </div>
  </div>
</template>

<script>
import OrderForm from '@/components/Form/OrderForm.vue';
import CartComponent from '@/components/CartComponent.vue';

export default {
  name: 'OrderView',
  components: { OrderForm, CartComponent },
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
