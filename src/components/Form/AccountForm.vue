<template>
  <div>
    <form @submit.prevent="submitAccount" class="account-form">
      <div class="form-group">
        <input type="text" id="name" v-model="name" placeholder="name" />
      </div>
      <div class="form-group">
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="email@email.email"
        />
      </div>
      <div class="form-group">
        <input
          type="text"
          id="phone"
          v-model="phone"
          placeholder="+77777777777"
        />
      </div>
      <div class="form-group">
        <input type="date" id="dateOfBirth" v-model="dateOfBirth" />
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
  name: 'AccountForm',
  data() {
    return {
      name: this.account.name,
      email: this.account.email,
      phone: this.account.phone,
      dateOfBirth: this.account.dateOfBirth,
    };
  },
  props: {
    account: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('account', ['changeAccountData']),
    submitAccount() {
      const data = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth,
      };
      this.changeAccountData(data);
      this.$emit('close-form');
    },
  },
};
</script>

<style scoped lang="scss"></style>
