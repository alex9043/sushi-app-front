<template>
  <h3>Ваш последний заказ</h3>
  <div class="last-order">
    <div v-if="isOrder">
      <p>Имя - {{ order.userName }}</p>
      <p>
        Адрес - {{ order.street }} ул. к.{{ order.building }}, д.
        {{ order.houseNumber }}, кв. {{ order.apartmentNumber }}
      </p>
      <p>Тип доставки - {{ order.deliveryType }}</p>
      <p>Тип оплаты - {{ order.paymentType }}</p>
      <h4>Заказанные товары</h4>
      <div v-for="item in order.orderItems" :key="item.id">
        <p>
          {{ item.product.name }} - {{ item.product.price }} руб.,
          {{ item.count }} шт.
        </p>
      </div>
    </div>
    <div v-if="!isOrder">
      <p>Пока не было совершено заказов</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'LastOrderComponent',
  computed: {
    ...mapGetters('order', ['getOrder']),
    order() {
      return this.getOrder;
    },
    isOrder() {
      return this.order !== null && Object.keys(this.order).length > 0;
    },
  },
  methods: {
    ...mapActions('order', ['checkLastOrder']),
  },
};
</script>

<style scoped lang="scss"></style>
