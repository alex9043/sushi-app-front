<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/">Главная</router-link>
        <router-link to="/auth">Войти</router-link>
      </nav>
    </header>
  </div>
  <main>
    <router-view />
  </main>
</template>

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

      &.router-link-exact-active {
        color: #000000;
      }
    }
  }
}
</style>
