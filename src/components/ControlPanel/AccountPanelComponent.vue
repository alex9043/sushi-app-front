<template>
  <div>
    <h3>Личный кабинет</h3>
    <div v-if="!isAccountFormVisible && !isPasswordFormVisible">
      <p>Ваше имя - {{ account.name }}</p>
      <p>Телефон - {{ account.phone }}</p>
      <p>Email - {{ account.email }}</p>
      <p>Дата рождения - {{ account.dateOfBirth }}</p>
    </div>
    <div v-if="isAccountFormVisible">
      <AccountForm :account="account" />
    </div>
    <div v-if="isPasswordFormVisible">
      <PasswordForm />
    </div>
    <button @click="toggleAccountForm" class="toggle-account-form">
      {{ isAccountFormVisible ? 'Просмотреть данные' : 'Изменить данные' }}
    </button>
    <button @click="togglePasswordForm" class="toggle-account-form">
      {{ isPasswordFormVisible ? 'Просмотреть данные' : 'Изменить пароль' }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AccountForm from '@/components/Form/AccountForm.vue';
import PasswordForm from '@/components/Form/PasswordForm.vue';

export default {
  name: 'OrderPanelComponent',
  components: {
    AccountForm,
    PasswordForm,
  },
  data() {
    return {
      isAccountFormVisible: false,
      isPasswordFormVisible: false,
    };
  },
  computed: {
    ...mapGetters('account', ['getAccount']),
    account() {
      return this.getAccount;
    },
  },
  methods: {
    ...mapActions('account', ['fetchAccount']),
    toggleAccountForm() {
      this.isAccountFormVisible = !this.isAccountFormVisible;
      this.isPasswordFormVisible = false;
    },
    togglePasswordForm() {
      this.isPasswordFormVisible = !this.isPasswordFormVisible;
      this.isAccountFormVisible = false;
    },
  },
  created() {
    this.fetchAccount();
  },
};
</script>

<style scoped lang="scss">
.toggle-account-form {
  margin-top: 10px;
}
</style>
