<template>
  <div class="admin-ingredient-form">
    <h4>{{ isEditMode ? 'Ingredient Form' : 'Create ingredient' }}</h4>
    <form @submit.prevent="submitForm" class="ingredient-form">
      <div class="form-group">
        <input
          type="text"
          id="ingredientName"
          v-model="name"
          placeholder="Ingredient name"
        />
      </div>
      <div class="form-group">
        <button type="submit" class="ingredient-form-submit">
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
  name: 'AdminIngredientForm',
  props: {
    ingredientData: {
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
    ingredientData: {
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
    ...mapActions('home', ['createIngredient', 'editIngredient']),
    closeForm() {
      this.$emit('close-form');
    },
    submitForm() {
      const data = {
        name: this.name,
      };
      if (this.isEditMode) {
        this.editIngredient({
          ingredientId: this.ingredientData.id,
          data: data,
        });
      } else {
        this.createIngredient(data);
      }
      this.$emit('close-form');
    },
  },
};
</script>

<style scoped lang="scss">
.admin-ingredient-form {
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

    .ingredient-form-submit {
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
