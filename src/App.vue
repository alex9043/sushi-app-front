<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/auth" v-if="!isAuthenticated">Войти</router-link>
        <a v-if="isAuthenticated" @click="handleLogout">Выйти</a>
      </nav>
    </header>
  </div>
  <main>
    <router-view />
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('auth', ['logout', 'initializeAuthState']),
    handleLogout() {
      this.logout();
      this.$router.push({ name: 'Home' });
    },
  },
  created() {
    this.initializeAuthState();
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
</style>
