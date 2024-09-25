<template>
  <div>Order</div>
  <button @click="closePanel">Закрыть окно</button>
</template>

<script>
export default {
  name: 'AdminOrderComponent',
  methods: {
    closePanel() {
      this.$emit('close-panel');
    },
  },
};
</script>

<style scoped lang="scss"></style>
