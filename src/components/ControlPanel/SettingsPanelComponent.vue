<template>
  <div>
    <h3>Настройки</h3>
    <button @click="toggleColor">Изменить цветовую схему</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'OrderPanelComponent',
  methods: {
    ...mapActions('account', ['changeColor']),
    toggleColor() {
      this.changeColor();
    },
  },
};
</script>

<style scoped lang="scss"></style>
