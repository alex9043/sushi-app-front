<template>
  <div class="order-form-wrapper">
    <ErrorMessage v-if="error" :messages="error" />
    <form @submit.prevent="submitOrder">
      <div class="user-group" v-if="!isAuth">
        <h3>Ваши данные</h3>
        <div class="form-group">
          <input
            type="text"
            v-model="userName"
            id="userName"
            placeholder="Имя, Фамилия*"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="userPhone"
            id="userPhone"
            placeholder="Телефон*"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            v-model="userEmail"
            id="userEmail"
            placeholder="E-mail*"
            class="form-input"
          />
        </div>
      </div>
      <div class="address-group" v-if="!isAuth">
        <h3>Адрес доставки</h3>
        <div class="form-group">
          <select
            v-model="districtId"
            id="districtId"
            required
            class="form-input"
          >
            <option disabled value="">Выберите район</option>
            <option
              v-for="district in districts"
              :key="district.id"
              :value="district.id"
            >
              {{ district.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model="street"
            id="street"
            required
            placeholder="Улица*"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="houseNumber"
            id="houseNumber"
            required
            placeholder="Дом*"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="building"
            id="building"
            placeholder="Корпус"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="entrance"
            id="entrance"
            placeholder="Подъезд"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="floor"
            id="floor"
            placeholder="Этаж"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="apartmentNumber"
            id="apartmentNumber"
            required
            placeholder="Кв-ра/Офис*"
            class="form-input"
          />
        </div>
      </div>
      <div class="delivery-group">
        <h3>Доставка</h3>
        <div class="form-group">
          <fieldset>
            <legend>Способ доставки</legend>
            <input
              type="radio"
              value="DELIVERY"
              v-model="deliveryType"
              checked
            />
            <label>Доставка курьером</label>
            <br />
            <input type="radio" value="PICKUP" v-model="deliveryType" />
            <label>Самовывоз</label>
          </fieldset>
        </div>
      </div>
      <div class="payment-group">
        <h3>Доставка</h3>
        <div class="form-group">
          <fieldset>
            <legend>Способ оплаты</legend>
            <input type="radio" value="CASH" v-model="paymentType" checked />
            <label>Оплата наличными</label>
            <br />
            <input type="radio" value="CARD" v-model="paymentType" />
            <label>Оплата по карте при получении</label>
          </fieldset>
        </div>
      </div>
      <div class="additional-info-group">
        <div class="form-group">
          <input
            type="text"
            v-model="comment"
            id="comment"
            placeholder="Комментарий"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="change"
            id="change"
            placeholder="Сдача с какой суммы вам нужна"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <input
            type="number"
            v-model="peopleCount"
            id="peopleCount"
            placeholder="Количество человек"
            class="form-input"
          />
        </div>
      </div>
      <button type="submit" :disabled="isLoading" class="form-button">
        Оформить заказ
      </button>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'OrderForm',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      userName: 'Test test',
      userPhone: '+77777777777',
      userEmail: 'test@test.test',
      districtId: 1,
      street: 'Test street',
      houseNumber: 1,
      building: 1,
      entrance: 1,
      floor: '1',
      apartmentNumber: 1,
      deliveryType: 'DELIVERY',
      paymentType: 'CASH',
      comment: '',
      change: 5000,
      peopleCount: 2,
    };
  },
  computed: {
    ...mapGetters('districts', ['allDistricts']),
    ...mapGetters('order', ['getError', 'isLoading']),
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('auth', ['isAuthenticated']),
    error() {
      return this.getError;
    },
    isAuth() {
      return this.isAuthenticated;
    },
    districts() {
      return this.allDistricts;
    },
    isLoading() {
      return this.isLoading;
    },
  },
  methods: {
    ...mapActions('districts', ['fetchDistricts']),
    ...mapActions('order', ['createOrder']),
    ...mapActions('cart', ['clearCart']),
    submitOrder() {
      const orderItems = this.getCart.map((i) => {
        return {
          count: i.count,
          id: i.product.id,
        };
      });
      const payload = {
        userName: this.userName,
        userPhone: this.userPhone,
        userEmail: this.userEmail,
        districtId: this.districtId,
        street: this.street,
        houseNumber: this.houseNumber,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartmentNumber: this.apartmentNumber,
        deliveryType: this.deliveryType,
        paymentType: this.paymentType,
        comment: this.comment,
        change: this.change,
        peopleCount: this.peopleCount,
        orderItems: orderItems,
      };
      this.createOrder(payload).then(this.$router.push({ name: 'Home' }));
    },
  },
  created() {
    this.fetchDistricts();
  },
};
</script>
<style scoped lang="scss"></style>
