<template>
  <div>
    <h3>Личный кабинет</h3>
    <div
      v-if="
        !isAccountFormVisible && !isPasswordFormVisible && !isAddressFormVisible
      "
    >
      <p>Ваше имя - {{ account.name }}</p>
      <p>Телефон - {{ account.phone }}</p>
      <p>Email - {{ account.email }}</p>
      <p>Дата рождения - {{ account.dateOfBirth }}</p>
      <h4>Ваши адреса</h4>
      <div v-if="addresses.length > 0">
        <div
          v-for="(address, index) in addresses"
          :key="address.id"
          class="address"
        >
          <div>
            <p>Адрес - {{ address.name }}</p>
            <p>{{ formattedAddresses[index] }}</p>
          </div>
          <button @click="toggleAddressForm(address)">Изменить</button>
          <button @click="deleteAddress(address.id)">Удалить</button>
        </div>
      </div>
      <p v-else>Нет доступных адресов.</p>
    </div>
    <div v-if="isAddressFormVisible">
      <AddressForm :address="selectedAddress" @close-form="closeForm" />
    </div>
    <div v-if="isAccountFormVisible">
      <AccountForm :account="account" @close-form="closeForm" />
    </div>
    <div v-if="isPasswordFormVisible">
      <PasswordForm @close-form="closeForm" />
    </div>
    <button @click="toggleAddressForm(null)">
      {{ isAddressFormVisible ? 'Просмотреть данные' : 'Добавить адрес' }}
    </button>
    <button @click="toggleAccountForm" class="toggle-account-form">
      {{
        isAccountFormVisible ? 'Просмотреть данные' : 'Изменить данные аккаунта'
      }}
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
import AddressForm from '@/components/Form/AddressForm.vue';

export default {
  name: 'AccountPanelComponent',
  components: {
    AccountForm,
    PasswordForm,
    AddressForm,
  },
  data() {
    return {
      isAccountFormVisible: false,
      isPasswordFormVisible: false,
      isAddressFormVisible: false,
      selectedAddress: null,
    };
  },
  computed: {
    ...mapGetters('account', ['getAccount']),
    ...mapGetters('address', ['allAddresses']),

    account() {
      return this.getAccount;
    },

    addresses() {
      return this.allAddresses || [];
    },

    formattedAddresses() {
      return this.addresses.map((address) => {
        return `Ул. ${address.street}, д. ${address.houseNumber}, к. ${
          address.building
        }, кв. ${address.apartmentNumber}, район: ${
          address.district?.name || 'Загрузка района...'
        }`;
      });
    },
  },
  methods: {
    ...mapActions('account', ['fetchAccount']),
    ...mapActions('address', ['fetchAddresses', 'removeAddress']),

    toggleAccountForm() {
      this.isAccountFormVisible = !this.isAccountFormVisible;
      this.isPasswordFormVisible = false;
      this.isAddressFormVisible = false;
    },

    togglePasswordForm() {
      this.isPasswordFormVisible = !this.isPasswordFormVisible;
      this.isAccountFormVisible = false;
      this.isAddressFormVisible = false;
    },

    toggleAddressForm(address) {
      this.selectedAddress = address || {
        id: null,
        name: '',
        street: '',
        houseNumber: '',
        building: '',
        entrance: '',
        floor: '',
        apartmentNumber: '',
        district: { id: 1 },
      };
      this.isAddressFormVisible = !this.isAddressFormVisible;
      this.isAccountFormVisible = false;
      this.isPasswordFormVisible = false;
    },

    closeForm() {
      this.isAddressFormVisible = false;
      this.isAccountFormVisible = false;
      this.isPasswordFormVisible = false;
      this.selectedAddress = null;

      this.fetchAddresses();
    },

    deleteAddress(id) {
      this.removeAddress(id).then(() => {
        this.fetchAddresses();
      });
    },
  },

  created() {
    this.fetchAccount();
    this.fetchAddresses();
  },
};
</script>

<style scoped lang="scss">
.toggle-account-form {
  margin-top: 10px;
}
.address {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  p {
    margin-bottom: 5px;
  }
  p:last-child {
    margin-bottom: 0;
  }
}
</style>
