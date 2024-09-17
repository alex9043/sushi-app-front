<template>
  <div>
    <form @submit.prevent="submitAddress" class="account-form">
      <div class="form-group">
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="Address name"
        />
      </div>
      <div class="form-group">
        <input type="text" id="street" v-model="street" placeholder="Street" />
      </div>
      <div class="form-group">
        <input
          type="number"
          id="houseNumber"
          v-model="houseNumber"
          placeholder="House number"
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          id="building"
          v-model="building"
          placeholder="Building"
        />
      </div>
      <div class="form-group">
        <input
          type="number"
          id="entrance"
          v-model="entrance"
          placeholder="Entrance"
        />
      </div>
      <div class="form-group">
        <input type="number" id="floor" v-model="floor" placeholder="Floor" />
      </div>
      <div class="form-group">
        <input
          type="number"
          id="apartmentNumber"
          v-model="apartmentNumber"
          placeholder="Apartment number"
        />
      </div>
      <div class="form-group">
        <select
          v-model="districtId"
          id="districtId"
          required
          class="form-input"
        >
          <option disabled value="">Выберите район</option>
          <option
            v-for="district in districts"
            :key="district.id"
            :value="district.id"
          >
            {{ district.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <button type="submit" class="form-button">
          {{ id ? 'Изменить' : 'Добавить' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'AddressForm',
  data() {
    return {
      id: this.address.id || '',
      name: this.address.name || '',
      street: this.address.street || '',
      houseNumber: this.address.houseNumber || '',
      building: this.address.building || '',
      entrance: this.address.entrance || '',
      floor: this.address.floor || '',
      apartmentNumber: this.address.apartmentNumber || '',
      districtId: this.address.district.id || '',
    };
  },
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('address', ['allDistricts']),
    districts() {
      return this.allDistricts;
    },
  },
  methods: {
    ...mapActions('address', ['fetchDistricts', 'addAddress', 'editAddress']),

    submitAddress() {
      const data = {
        id: this.address.id,
        name: this.name,
        street: this.street,
        houseNumber: this.houseNumber,
        building: this.building,
        entrance: this.entrance,
        floor: this.floor,
        apartmentNumber: this.apartmentNumber,
        districtId: this.districtId,
      };

      const action = data.id === null ? 'addAddress' : 'editAddress';

      this[action](data).then(() => {
        this.$emit('close-form');
      });
    },
  },
  created() {
    this.fetchDistricts();
  },
};
</script>

<style scoped lang="scss"></style>
