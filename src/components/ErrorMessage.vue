<template>
  <div class="error-message" v-if="messages && messages.length">
    <ul>
      <li v-for="(msg, index) in messages" :key="index">{{ msg.message }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    messages: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.error-message {
  color: red;
  margin: 10px 0;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    li {
      margin-bottom: 5px;
    }
  }
}
</style>
