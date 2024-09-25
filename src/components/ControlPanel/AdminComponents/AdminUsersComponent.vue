<template>
  <div>Users</div>
  <button @click="closePanel">Закрыть окно</button>
</template>

<script>
export default {
  name: 'AdminUsersComponent',
  methods: {
    closePanel() {
      this.$emit('close-panel');
    },
  },
};
</script>

<style scoped lang="scss"></style>
