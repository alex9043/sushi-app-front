<template>
  <div>
    <div v-if="!isUserForm">
      <button @click="openUserForm">Изменить пользователя</button>
      <p>Имя - {{ getAccount.name }}</p>
      <p>Телефон - {{ getAccount.phone }}</p>
      <p>Email - {{ getAccount.email }}</p>
      <p>Дата рождения - {{ getAccount.dateOfBirth }}</p>
      <p>Роли</p>
      <p v-for="role in getAccount.roles" :key="role">
        {{ role }}
      </p>
      <p>Адреса</p>
      <div v-for="address in getAccount.addresses" :key="address.id">
        <p>
          Название - {{ address.name }}. Район - {{ address.district.name }}.Ул.
          {{ address.street }}, дом {{ address.houseNumber }}, корпус
          {{ address.building }}, подъезд {{ address.entrance }}, этаж
          {{ address.floor }}, квартира
          {{ address.apartmentNumber }}
        </p>
      </div>
    </div>
    <AdminUserForm
      :user-id="userId"
      v-if="isUserForm"
      @close-form="closeForm"
    />
    <button @click="closeProfile">Ко всем профилям</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AdminUserForm from '@/components/ControlPanel/AdminComponents/user/form/AdminUserForm.vue';

export default {
  name: 'AdminUserProfile',
  components: {
    AdminUserForm,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      userId: null,
      isUserForm: false,
    };
  },
  computed: {
    ...mapGetters('account', ['getAccount']),
    isEditMode() {
      return !isNaN(this.userId);
    },
  },
  methods: {
    ...mapActions('account', ['fetchUser']),

    closeProfile() {
      this.$emit('close-profile');
    },
    openUserForm() {
      this.isUserForm = true;
      this.userId = this.id;
    },
    closeForm() {
      this.isUserForm = false;
      this.userId = null;
    },
  },
  created() {
    this.fetchUser(this.id);
  },
};
</script>

<style scoped lang="scss"></style>
