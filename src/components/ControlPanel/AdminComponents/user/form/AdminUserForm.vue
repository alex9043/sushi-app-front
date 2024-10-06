<template>
  <div>
    <form @submit.prevent="updateUser(getAccount.id)">
      <label for="name">Имя:</label>
      <input type="text" id="name" v-model="name" required />

      <label for="phone">Телефон:</label>
      <input type="tel" id="phone" v-model="phone" required />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required />

      <label for="dateOfBirth">Дата рождения:</label>
      <input type="date" id="dateOfBirth" v-model="dateOfBirth" required />

      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" />

      <label>Роли:</label>
      <div v-for="role in allRoles" :key="role">
        <input type="checkbox" :value="role" v-model="selectedRoles" />
        {{ role }}
      </div>

      <button type="submit">Сохранить</button>
    </form>
    <button @click="closeForm">Закрыть форму</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminUserForm',
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      name: '',
      phone: '',
      email: '',
      dateOfBirth: '',
      password: '',
      allRoles: ['ROLE_USER', 'ROLE_ADMIN'], // Список всех ролей
      selectedRoles: [], // Выбранные роли
    };
  },
  computed: {
    ...mapGetters('account', ['getAccount']),
  },
  watch: {
    getAccount: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.name = newVal.name;
          this.phone = newVal.phone;
          this.email = newVal.email;
          this.dateOfBirth = newVal.dateOfBirth;
          this.password = '';
          this.selectedRoles = [...newVal.roles];
        }
      },
    },
  },
  methods: {
    ...mapActions('account', ['fetchUser', 'changeUser']),
    getUser(userId) {
      this.fetchUser(userId);
    },
    updateUser(userId) {
      const data = {
        name: this.name,
        phone: this.phone,
        email: this.email,
        dateOfBirth: this.dateOfBirth,
        password: this.password,
        roles: this.selectedRoles,
      };
      this.changeUser({ data: data, userId: userId });
      this.closeForm();
    },
    closeForm() {
      this.$emit('closeForm');
    },
  },
  created() {
    this.getUser(this.userId);
  },
};
</script>

<style scoped lang="scss"></style>
