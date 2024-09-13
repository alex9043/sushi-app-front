<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/auth" v-if="!isAuthenticated">Войти</router-link>
        <a v-if="isAuthenticated" @click="handleLogout">Выйти</a>
        <router-link to="/control">Панель управления</router-link>
        <a @click="toggleCart">Коризна</a>
      </nav>
    </header>
    <div class="cart-wrapper" v-if="showCart">
      <CartComponent />
    </div>
  </div>
  <main>
    <router-view />
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CartComponent from '@/components/CartComponent.vue';

export default {
  components: {
    CartComponent,
  },
  data() {
    return {
      showCart: false,
    };
  },
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
    ...mapGetters('cart', ['getCart']),
    ...mapGetters('account', ['getColor', 'getBackgroundColor']),
    color() {
      return this.getColor;
    },
    backgroundColor() {
      return this.getBackgroundColor;
    },
  },
  methods: {
    ...mapActions('auth', ['logout', 'initializeAuthState']),
    ...mapActions('cart', ['fetchCart']),
    handleLogout() {
      this.logout();
      this.$router.go(0);
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
  },
  watch: {
    isAuthenticated(newVal) {
      if (newVal === true) {
        this.fetchCart();
      }
    },
  },
  created() {
    this.initializeAuthState();
    this.fetchCart();
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background: #42b983;
  padding: 10px;

  nav {
    display: flex;
    justify-content: space-around;

    a {
      font-weight: bold;
      color: #ffffff;
      text-decoration: none;
      cursor: pointer;

      &.router-link-exact-active {
        color: #000000;
      }
    }
  }
}

.cart-wrapper {
  position: relative;
}

.cart-wrapper .cart {
  position: absolute;
  right: 0;
  top: 100%;
  background: #ffffff;
  border: 1px solid #ccc;
  padding: 10px;
  width: 300px;
}

main {
  background-color: v-bind('backgroundColor');
  color: v-bind('color');
}
</style>
