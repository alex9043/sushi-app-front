<template>
  <div class="form-container">
    <h2>Регистрация</h2>
    <ErrorMessage v-if="error" :message="error" />
    <form @submit.prevent="register">
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
        Register
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ErrorMessage from "@/components/ErrorMessage";

export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      phone: "+77777777777",
      name: "test",
      email: "test@test.test",
      dateOfBirth: "2000-01-01",
      password: "test",
      confirmPassword: "test",
      addressName: "test",
      districtId: "",
      street: "test",
      houseNumber: 1,
      building: 1,
      entrance: 1,
      floor: 1,
      apartmentNumber: 1,
      error: null,
    };
  },
  computed: {
    ...mapGetters("districts", ["allDistricts", "isLoading", "getError"]),
    districts() {
      return this.allDistricts;
    },
    isLoading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
  methods: {
    ...mapActions("districts", ["fetchDistricts"]),
    register() {
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
      this.$store
        .dispatch("auth/register", payload)
        .then(() => {
          this.$router.push("/");
        })
        .catch((error) => {
          let errorMessage = "Registration failed";
          if (
            error.response &&
            error.response.data &&
            error.response.data.errorMessages
          ) {
            errorMessage =
              error.response.data.errorMessages[0]?.message || errorMessage;
          } else if (error.message) {
            errorMessage = error.message;
          }
          this.error = errorMessage;
        });
    },
  },
  created() {
    this.fetchDistricts();
  },
};
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.form-group {
  margin-bottom: 15px;
}

.form-input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.form-button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

h2,
h3 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
