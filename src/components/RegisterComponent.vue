<template>
  <div>
    <h2>Регистрация</h2>
    <ErrorMessage v-if="error" :message="error" />
    <form @submit.prevent="register">
      <h3>Личные данные</h3>
      <div>
        <input
          type="text"
          v-model="name"
          id="name"
          required
          placeholder="Имя, Фамилия*"
        />
      </div>
      <div>
        <input
          type="text"
          v-model="phone"
          id="phone"
          required
          placeholder="Телефон*"
        />
      </div>
      <div>
        <input
          type="email"
          v-model="email"
          id="email"
          required
          placeholder="E-mail*"
        />
      </div>
      <div>
        <label for="dateOfBirth">День рождения</label>
        <input type="date" v-model="dateOfBirth" id="dateOfBirth" />
      </div>
      <h3>Придумайте пароль</h3>
      <div>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Пароль*"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
          placeholder="Повторите пароль*"
        />
      </div>
      <h3>Адрес</h3>
      <div>
        <input
          type="text"
          v-model="addressName"
          id="addressName"
          placeholder="Название адреса"
        />
      </div>
      <div>
        <select v-model="districtId" id="districtId" required>
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
      <div>
        <input
          type="text"
          v-model="street"
          id="street"
          required
          placeholder="Улица*"
        />
      </div>
      <div>
        <input
          type="number"
          v-model="houseNumber"
          id="houseNumber"
          required
          placeholder="Дом*"
        />
      </div>
      <div>
        <input
          type="number"
          v-model="building"
          id="building"
          placeholder="Корпус"
        />
      </div>
      <div>
        <input
          type="number"
          v-model="entrance"
          id="entrance"
          placeholder="Подъезд"
        />
      </div>
      <div>
        <input type="number" v-model="floor" id="floor" placeholder="Этаж" />
      </div>
      <div>
        <input
          type="number"
          v-model="apartmentNumber"
          id="apartmentNumber"
          required
          placeholder="Кв-ра/Офис*"
        />
      </div>
      <button type="submit" :disabled="isLoading">Register</button>
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
