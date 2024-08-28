<template>
  <div class="auth-view">
    <button @click="toggleForm">
      {{ isAuthForm ? 'Авторизация' : 'Регистрация' }}
    </button>
    <component :is="currentForm" />
  </div>
</template>

<script>
import AuthForm from '@/components/Form/AuthForm.vue';
import RegistrationForm from '@/components/Form/RegistrationForm.vue';
export default {
  name: 'AuthView',
  components: {
    AuthForm,
    RegistrationForm,
  },
  data() {
    return {
      isAuthForm: true,
    };
  },
  computed: {
    currentForm() {
      return this.isAuthForm ? 'AuthForm' : 'RegistrationForm';
    },
  },
  methods: {
    toggleForm() {
      this.isAuthForm = !this.isAuthForm;
    },
  },
};
</script>

<style lang="scss">
h2,
h3 {
  text-align: center;
  margin-bottom: 20px;
}
.auth-view {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  .form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    .form-group {
      margin-bottom: 15px;
      .form-input {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
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
  }
  button {
    display: block;
    margin: 0 auto 20px;
    background-color: #42b983;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
