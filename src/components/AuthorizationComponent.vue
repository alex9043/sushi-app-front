<template>
  <div class="form-container">
    <h2>Вход на сайт</h2>
    <ErrorMessage v-if="error" :message="error" />
    <form @submit.prevent="login">
      <div class="form-group">
        <input
          type="text"
          v-model="phone"
          id="phone"
          required
          placeholder="Номер телефона"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          id="password"
          required
          placeholder="Пароль"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <p>
          Нет аккаунта?
          <router-link to="/register">Зарегистрируйтесь</router-link>
        </p>
      </div>
      <button type="submit" :disabled="isLoading" class="form-button">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage';
export default {
  components: {
    ErrorMessage,
  },
  data() {
    return {
      phone: '+77777777777',
      password: 'test',
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['auth/isLoading'];
    },
  },
  methods: {
    login() {
      const payload = {
        phone: this.phone,
        password: this.password,
      };
      this.$store
        .dispatch('auth/login', payload)
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          let errorMessage = 'Registration failed';
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

<style scoped>
.form-container {
  max-width: 400px;
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
</style>
