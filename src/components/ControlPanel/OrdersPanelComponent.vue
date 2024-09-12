<template>
  <div>
    <h3>Заказы</h3>
    <div v-if="!this.isAuthenticated">
      <div v-if="this.getLastOrder" class="order">
        <h4>Ваш последний заказ</h4>
        <p>Ваше имя - {{ this.order.userName }}</p>
        <p>
          Ваш адрес - {{ this.order.street }}, к. {{ this.order.building }}, д.
          {{ this.order.houseNumber }}, этаж {{ this.order.floor }}, кв.
          {{ this.order.apartmentNumber }}
        </p>
        <p>Тип доставки - {{ this.order.deliveryType }}</p>
        <p>Тип оплаты - {{ this.order.paymentType }}</p>
        <h5>Ваша корзина</h5>
        <div
          v-for="item in this.order.orderItems"
          :key="item.product.id"
          class="order-item"
        >
          <p>{{ item.product.name }}</p>
          <p>Количество: {{ item.count }}</p>
          <p>Стоимость: {{ item.product.price * item.count }}Р</p>
        </div>
      </div>
      <div v-else>
        <p>Последний заказ не найден</p>
      </div>
    </div>
    <div v-else>
      <h4>История заказов</h4>
      <div v-if="this.orders">
        <div v-for="order in this.orders" :key="order.id" class="order">
          <p>
            Адрес - {{ order.street }}, к. {{ order.building }}, д.
            {{ order.houseNumber }}, этаж {{ order.floor }}, кв.
            {{ order.apartmentNumber }}
          </p>
          <p>Тип доставки - {{ order.deliveryType }}</p>
          <p>Дата заказа - {{ order.createdDate }}</p>
          <p>Тип оплаты - {{ order.paymentType }}</p>
          <p>Статус заказа - {{ order.orderStatus }}</p>
          <h5>Ваша корзина</h5>
          <div
            v-for="item in order.orderItems"
            :key="item.product.id"
            class="order-item"
          >
            <p>{{ item.product.name }}</p>
            <p>Количество: {{ item.count }}</p>
            <p>Стоимость: {{ item.product.price * item.count }}Р</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p>Пока не было совершено заказов</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'OrdersPanelComponent',
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('order', ['getLastOrder', 'getOrder', 'getOrders']),
    order() {
      return this.getOrder || {};
    },
    orders() {
      return this.getOrders.orders || [];
    },
  },
  methods: {
    ...mapActions('order', ['checkLastOrder', 'fetchOrders']),
    getAllOrders() {
      if (this.isAuthenticated) {
        this.fetchOrders();
      } else {
        this.checkLastOrder();
      }
    },
  },
  created() {
    this.getAllOrders();
  },
};
</script>

<style scoped lang="scss">
.order-item {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  margin-bottom: 10px;
  &:last-child {
    border-bottom: none;
  }
  p {
    margin-bottom: 5px;
  }
}
.order {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
}
</style>
