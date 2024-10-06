<template>
  <div class="admin-users">
    <div v-if="!isUserProfile">
      <h4>Users</h4>
      <div class="user-search">
        <div>
          <label for="name">Search by Name:</label>
          <input
            type="text"
            v-model="searchQuery.name"
            placeholder="Enter user name"
          />
        </div>

        <div>
          <label for="email">Search by Email:</label>
          <input
            type="text"
            v-model="searchQuery.email"
            placeholder="Enter user email"
          />
        </div>

        <div>
          <label for="phone">Search by Phone:</label>
          <input
            type="text"
            v-model="searchQuery.phone"
            placeholder="Enter user phone"
          />
        </div>

        <div>
          <label for="role">Role:</label>
          <select v-model="searchQuery.role">
            <option value="">All Roles</option>
            <option v-for="role in uniqueRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Roles</th>
            <th>Addresses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.roles.join(', ') }}</td>
            <td>
              <div v-if="user.addresses.length">
                <p v-for="address in user.addresses" :key="address.id">
                  {{ address.street }}, {{ address.houseNumber }},
                  {{ address.district.name }}
                </p>
              </div>
              <div v-else>No addresses</div>
            </td>
            <td>
              <button @click="openProfile(user.id)">Profile</button>
              <button @click="deleteProfile(user.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <AdminUserProfile
      :id="userId"
      v-if="isUserProfile"
      @close-profile="closeProfile"
    />
    <button @click="closePanel">Закрыть окно</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import AdminUserProfile from '@/components/ControlPanel/AdminComponents/user/AdminUserProfile.vue';

export default {
  name: 'AdminUsersComponent',
  components: {
    AdminUserProfile,
  },
  data() {
    return {
      userId: null,
      isUserProfile: false,
      searchQuery: {
        name: '',
        email: '',
        phone: '',
        role: '',
      },
    };
  },
  computed: {
    ...mapGetters('account', ['getAccounts']),

    // Вычисляемое свойство для получения уникальных ролей
    uniqueRoles() {
      const rolesSet = new Set();
      if (this.getAccounts && Array.isArray(this.getAccounts.users)) {
        this.getAccounts.users.forEach((user) => {
          user.roles.forEach((role) => rolesSet.add(role));
        });
      }
      return Array.from(rolesSet);
    },

    filteredUsers() {
      if (!this.getAccounts || !Array.isArray(this.getAccounts.users)) {
        return [];
      }

      return this.getAccounts.users.filter((user) => {
        const matchesName = user.name
          .toLowerCase()
          .includes(this.searchQuery.name.toLowerCase());
        const matchesEmail = user.email
          .toLowerCase()
          .includes(this.searchQuery.email.toLowerCase());
        const matchesPhone = user.phone.includes(this.searchQuery.phone);
        const matchesRole = this.searchQuery.role
          ? user.roles.includes(this.searchQuery.role)
          : true;

        return matchesName && matchesEmail && matchesPhone && matchesRole;
      });
    },
  },
  methods: {
    ...mapActions('account', ['fetchAccounts', 'removeUser']),
    closePanel() {
      this.$emit('close-panel');
    },
    closeProfile() {
      this.userId = null;
      this.isUserProfile = false;
    },
    openProfile(id) {
      this.userId = id;
      this.isUserProfile = true;
    },
    deleteProfile(userId) {
      if (window.confirm('Are you sure you want to delete this user?')) {
        this.removeUser(userId);
      }
    },
  },
  created() {
    this.fetchAccounts();
  },
};
</script>

<style scoped lang="scss">
.admin-users {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  .user-search {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;

    th,
    td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: center;
    }

    th {
      background-color: #f4f4f4;
    }
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  select,
  input {
    width: 100%;
    padding: 5px;
    border: 1px solid #ccc;
  }

  button {
    margin-top: 10px;
  }
}
</style>
