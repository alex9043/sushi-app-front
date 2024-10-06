<template>
  <div class="admin-tag-form">
    <h4>{{ isEditMode ? 'Tag Form' : 'Create tag' }}</h4>
    <form @submit.prevent="submitForm" class="tag-form">
      <div class="form-group">
        <input type="text" id="tagName" v-model="name" placeholder="Tag name" />
      </div>
      <div class="form-group">
        <button type="submit" class="tag-form-submit">
          {{ isEditMode ? 'Update' : 'Submit' }}
        </button>
      </div>
    </form>
    <button @click="closeForm">Закрыть форму</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'AdminTagForm',
  props: {
    tagData: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      name: '',
      isEditMode: false,
    };
  },
  watch: {
    tagData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.isEditMode = true;
          this.name = newVal.name;
        }
      },
    },
  },
  methods: {
    ...mapActions('home', ['createTag', 'editTag']),
    closeForm() {
      this.$emit('close-form');
    },
    submitForm() {
      const data = {
        name: this.name,
      };
      if (this.isEditMode) {
        this.editTag({ tagId: this.tagData.id, data: data });
      } else {
        this.createTag(data);
      }
      this.$emit('close-form');
    },
  },
};
</script>

<style scoped lang="scss">
.admin-tag-form {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h4 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
    }

    .tag-form-submit {
      width: 100%;
      padding: 10px;
      border: none;
      cursor: pointer;
    }
  }

  button {
    margin-top: 10px;
  }
}
</style>
