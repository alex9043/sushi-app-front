<template>
  <div class="admin-ingredient-component">
    <h4>Ingredient</h4>
    <div v-if="!isIngredientForm">
      <div class="product-add-buttons">
        <button @click="showIngredientForm">Создать ингредиент</button>
        <button @click="closeComponent">Продукты</button>
      </div>
      <div class="admin-ingredient">
        <div>
          <label for="ingredientName">Ingredient Name:</label>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by name"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingredient in filteredIngredients" :key="ingredient.id">
              <td>{{ ingredient.name }}</td>
              <td>
                <button @click="editIngredient(ingredient.id)">Edit</button>
                <button @click="deleteIngredient(ingredient.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <AdminIngredientForm
    v-if="isIngredientForm"
    :ingredientData="selectedIngredient"
    @close-form="closeForm"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminIngredientForm from '@/components/ControlPanel/AdminComponents/product/Form/AdminIngredientForm.vue';
export default {
  name: 'AdminIngredientComponent',
  components: {
    AdminIngredientForm,
  },
  data() {
    return {
      searchQuery: '',
      isIngredientForm: false,
      selectedIngredient: null,
    };
  },
  computed: {
    ...mapGetters('home', ['allIngredients']),
    filteredIngredients() {
      return this.allIngredients.filter((ingredient) =>
        ingredient.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  methods: {
    ...mapActions('home', ['fetchIngredients', 'removeIngredient']),
    editIngredient(ingredientId) {
      this.selectedIngredient = this.allIngredients.find(
        (ingredient) => ingredient.id === ingredientId,
      );
      this.showIngredientForm();
    },
    deleteIngredient(ingredientId) {
      this.removeIngredient(ingredientId);
    },
    closeComponent() {
      this.$emit('close-component');
    },
    showIngredientForm() {
      this.isIngredientForm = true;
    },
    closeForm() {
      this.isIngredientForm = false;
      this.selectedIngredient = null;
    },
  },
  created() {
    this.fetchIngredients();
  },
};
</script>

<style scoped lang="scss">
.admin-ingredient-component {
  display: flex;
  flex-direction: column;
  margin: 20px;
  width: 50%;

  h4 {
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 10px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
  }

  button {
    margin-right: 10px;
  }

  input[type='text'] {
    padding: 5px;
    width: 100%;
  }
}
</style>
