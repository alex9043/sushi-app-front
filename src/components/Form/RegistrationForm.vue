<template>
  <div class="form-container">
    <h2>Регистрация</h2>
    <ErrorMessage v-if="error" :messages="error" />
    <form @submit.prevent="submitRegister">
      <h3>Личные данные</h3>
      <div class="form-group">
        <input
          type="text"
          v-model="name"
          id="name"
          required
          placeholder="Имя, Фамилия*"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          v-model="phone"
          id="phone"
          required
          placeholder="Телефон*"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input
          type="email"
          v-model="email"
          id="email"
          required
          placeholder="E-mail*"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label for="dateOfBirth">День рождения</label>
        <input
          type="date"
          v-model="dateOfBirth"
          id="dateOfBirth"
          class="form-input"
        />
      </div>
      <h3>Придумайте пароль</h3>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Пароль*"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Повторите пароль*"
          class="form-input"
        />
      </div>
      <h3>Адрес</h3>
      <div class="form-group">
        <input
          type="text"
          v-model="addressName"
          id="addressName"
          placeholder="Название адреса"
          class="form-input"
        />
      </div>
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
      <button type="submit" :disabled="isLoading" class="form-button">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'RegistrationForm',
  components: {
    ErrorMessage,
  },
  data() {
    return {
      phone: '+77777777777',
      name: 'test',
      email: 'test@test.test',
      dateOfBirth: '2000-01-01',
      password: 'test',
      confirmPassword: 'test',
      addressName: 'test',
      districtId: '',
      street: 'test',
      houseNumber: 1,
      building: 1,
      entrance: 1,
      floor: 1,
      apartmentNumber: 1,
    };
  },
  computed: {
    ...mapGetters('address', ['allDistricts']),
    ...mapGetters('auth', ['isLoading', 'getError']),
    districts() {
      return this.allDistricts;
    },
    isLoading() {
      return this.isLoading;
    },
    error() {
      return this.getError;
    },
  },
  methods: {
    ...mapActions('address', ['fetchDistricts']),
    ...mapActions('auth', ['register']),
    submitRegister() {
      const payload = {
        phone: this.phone,
        name: this.name,
        email: this.email,
        dateOfBirth: this.dateOfBirth,
        password: this.password,
        confirmPassword: this.confirmPassword,
        addressName: this.addressName,
        districtId: this.districtId,
        street: this.street,
        houseNumber: this.houseNumber,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartmentNumber: this.apartmentNumber,
      };
      this.register(payload).then((result) => {
        if (result.success) {
          this.$router.push('/'); // Перенаправление при успешной регистрации
        }
      });
    },
  },
  created() {
    this.fetchDistricts();
  },
};
</script>
