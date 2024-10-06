<template>
  <div class="admin-panel">
    <h3>Панель администратора</h3>
    <div
      class="admin-buttons"
      v-if="!isProductPanel && !isUserPanel && !isOrderPanel"
    >
      <button class="admin-button" @click="showProductPanel">Продукты</button>
      <button class="admin-button" @click="showUserPanel">Пользователи</button>
      <button class="admin-button" @click="showOrderPanel">Заказы</button>
      <button class="admin-button">Блог</button>
    </div>
    <AdminProductComponent v-if="isProductPanel" @close-panel="closePanel" />
    <AdminUsersComponent v-if="isUserPanel" @close-panel="closePanel" />
    <AdminOrderComponent v-if="isOrderPanel" @close-panel="closePanel" />
  </div>
</template>

<script>
import AdminProductComponent from '@/components/ControlPanel/AdminComponents/product/AdminProductComponent.vue';
import AdminUsersComponent from '@/components/ControlPanel/AdminComponents/user/AdminUsersComponent.vue';
import AdminOrderComponent from '@/components/ControlPanel/AdminComponents/AdminOrderComponent.vue';
export default {
  name: 'AdminPanelComponent',
  components: {
    AdminProductComponent,
    AdminUsersComponent,
    AdminOrderComponent,
  },
  data() {
    return {
      isProductPanel: false,
      isUserPanel: false,
      isOrderPanel: false,
    };
  },
  methods: {
    showProductPanel() {
      this.isProductPanel = true;
    },
    showUserPanel() {
      this.isUserPanel = true;
    },
    showOrderPanel() {
      this.isOrderPanel = true;
    },
    closePanel() {
      this.isProductPanel = false;
      this.isUserPanel = false;
      this.isOrderPanel = false;
    },
  },
};
</script>

<style scoped lang="scss">
.admin-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .admin-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .admin-button {
      background-color: #f0f0f0;
      border: none;
      padding: 10px 20px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      &:hover {
        background-color: #cccccc;
      }
    }
  }
}
</style>
