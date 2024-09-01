<template>
  <div class="form-container">
    <h2>Вход на сайт</h2>
    <ErrorMessage v-if="error" :messages="error" />
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
      <button type="submit" :disabled="isLoading" class="form-button">
        Войти
      </button>
    </form>
  </div>
</template>

<script>
import ErrorMessage from '@/components/ErrorMessage.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'AuthForm',
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
    ...mapGetters('auth', ['isLoading', 'getError']),
    isLoading() {
      return this.isLoading;
    },
    error() {
      return this.getError;
    },
  },
  methods: {
    login() {
      const payload = {
        phone: this.phone,
        password: this.password,
      };
      this.$store.dispatch('auth/login', payload).then((result) => {
        if (result.success) {
          this.$router.push('/');
        }
      });
    },
  },
};
</script>
