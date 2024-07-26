<template>
  <div>
    <h2>Вход на сайт</h2>
    <ErrorMessage v-if="error" :message="error" />
    <form @submit.prevent="login">
      <div>
        <input
          type="text"
          v-model="phone"
          id="phone"
          required
          placeholder="Номер телефона"
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Пароль"
        />
      </div>
      <div>
        <p>Нет аккаунта?</p>
        <router-link to="/register">Зарегистрирутесь</router-link>
      </div>
      <button type="submit" :disabled="isLoading">Войти</button>
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
      password: "test",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
  methods: {
    login() {
      const payload = {
        phone: this.phone,
        password: this.password,
      };
      this.$store
        .dispatch("auth/login", payload)
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
