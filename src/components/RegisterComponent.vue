<template>
  <div>
    <h2>Register</h2>
    <ErrorMessage v-if="error" :message="error" />
    <form @submit.prevent="register">
      <h3>Personal data</h3>
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <div>
        <label for="phone">Phone</label>
        <input type="text" v-model="phone" id="phone" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div>
        <label for="dateOfBirth">Date of birth</label>
        <input type="date" v-model="dateOfBirth" id="dateOfBirth" required />
      </div>
      <h3>Password</h3>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="confirmPassword"
          id="confirmPassword"
          required
        />
      </div>
      <h3>Address</h3>
      <div>
        <label for="addressName">Address name</label>
        <input type="text" v-model="addressName" id="addressName" required />
      </div>
      <div>
        <label for="districtId">District id</label>
        <input type="number" v-model="districtId" id="districtId" required />
      </div>
      <div>
        <label for="street">Street</label>
        <input type="text" v-model="street" id="street" required />
      </div>
      <div>
        <label for="houseNumber">House number</label>
        <input type="number" v-model="houseNumber" id="houseNumber" required />
      </div>
      <div>
        <label for="building">Building number</label>
        <input type="number" v-model="building" id="building" required />
      </div>
      <div>
        <label for="entrance">Entrance</label>
        <input type="number" v-model="entrance" id="entrance" required />
      </div>
      <div>
        <label for="floor">Floor</label>
        <input type="number" v-model="floor" id="floor" required />
      </div>
      <div>
        <label for="apartmentNumber">Apartment number</label>
        <input
          type="number"
          v-model="apartmentNumber"
          id="apartmentNumber"
          required
        />
      </div>
      <button type="submit" :disabled="isLoading">Register</button>
    </form>
  </div>
</template>

<script>
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
      districtId: 1,
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
    isLoading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
  methods: {
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
};
</script>
