<template>
  <div>
    <h2>Панель управления</h2>
    <div class="control-panel">
      <div class="panel-side">
        <button @click="changeComponent('ORDERS')">Заказы</button>
        <button @click="changeComponent('ACCOUNT')" v-if="this.isUser">
          Личный кабинет
        </button>
        <button @click="changeComponent('ADMIN')" v-if="this.isAdmin">
          Панель администратора
        </button>
        <button @click="changeComponent('KITCHEN')" v-if="this.isAdmin">
          Кухня
        </button>
        <button @click="changeComponent('DELIVERY')" v-if="this.isAdmin">
          Доставка
        </button>
        <button @click="changeComponent('SETTINGS')">Настройки</button>
      </div>
      <div class="panel-main">
        <OrdersPanelComponent v-if="component === 'ORDERS'" />
        <AccountPanelComponent v-if="component === 'ACCOUNT' && this.isUser" />
        <AdminPanelComponent v-if="component === 'ADMIN' && this.isAdmin" />
        <KitchenPanelComponent v-if="component === 'KITCHEN' && this.isAdmin" />
        <DeliveryPanelComponent
          v-if="component === 'DELIVERY' && this.isAdmin"
        />
        <SettingsPanelComponent v-if="component === 'SETTINGS'" />
      </div>
    </div>
  </div>
</template>

<script>
import AccountPanelComponent from '@/components/ControlPanel/AccountPanelComponent.vue';
import AdminPanelComponent from '@/components/ControlPanel/AdminPanelComponent.vue';
import DeliveryPanelComponent from '@/components/ControlPanel/DeliveryPanelComponent.vue';
import KitchenPanelComponent from '@/components/ControlPanel/KitchenPanelComponent.vue';
import OrdersPanelComponent from '@/components/ControlPanel/OrdersPanelComponent.vue';
import SettingsPanelComponent from '@/components/ControlPanel/SettingsPanelComponent.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ControlPanelView',
  components: {
    AccountPanelComponent,
    AdminPanelComponent,
    DeliveryPanelComponent,
    KitchenPanelComponent,
    OrdersPanelComponent,
    SettingsPanelComponent,
  },
  data() {
    return {
      component: 'ORDERS',
    };
  },
  computed: {
    ...mapGetters('auth', ['isUser', 'isAdmin']),
  },
  methods: {
    changeComponent(component) {
      this.component = component;
    },
  },
};
</script>

<style scoped lang="scss">
.control-panel {
  display: flex;
  .panel-side {
    display: flex;
    flex-direction: column;
    width: 10%;
    margin: 0 auto 0 0;
    button {
      cursor: pointer;
      border: none;
      border-bottom: 1px black solid;
      margin-bottom: 10px;
    }
    button:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
  }
  .panel-main {
    width: 90%;
    margin: 0 auto;
  }
}
</style>
