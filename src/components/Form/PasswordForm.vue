<template>
  <div>
    <form @submit.prevent="submitPassword" class="account-form">
      <div class="form-group">
        <label for="name">Старый пароль</label>
        <input
          type="password"
          id="name"
          v-model="oldPassword"
          placeholder="password"
        />
      </div>
      <div class="form-group">
        <label for="email">Новый пароль</label>
        <input
          type="password"
          id="email"
          v-model="password"
          placeholder="password"
        />
      </div>
      <div class="form-group">
        <label for="phone">Подтверждение пароля</label>
        <input
          type="password"
          id="phone"
          v-model="confirmPassword"
          placeholder="password"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="form-button">Изменить</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PasswordForm',
  data() {
    return {
      oldPassword: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    ...mapActions('account', ['changePassword']),
    submitPassword() {
      const data = {
        oldPassword: this.oldPassword,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      this.changePassword(data);
    },
  },
};
</script>

<style scoped lang="scss"></style>
