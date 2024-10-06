<template>
  <div class="admin-category-component">
    <h4>Category</h4>
    <div v-if="!isCategoryForm">
      <div class="product-add-buttons">
        <button @click="showCategoryForm">Создать категорию</button>
        <button @click="closeComponent">Продукты</button>
      </div>
      <div class="admin-category">
        <div>
          <label for="categoryName">Category Name:</label>
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
            <tr v-for="category in filteredCategories" :key="category.id">
              <td>{{ category.name }}</td>
              <td>
                <button @click="editCategory(category.id)">Edit</button>
                <button @click="deleteCategory(category.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <AdminCategoryForm
    v-if="isCategoryForm"
    :categoryData="selectedCategory"
    @close-form="closeForm"
  />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminCategoryForm from '@/components/ControlPanel/AdminComponents/product/Form/AdminCategoryForm.vue';
export default {
  name: 'AdminCategoryComponent',
  components: {
    AdminCategoryForm,
  },
  data() {
    return {
      searchQuery: '',
      isCategoryForm: false,
      selectedCategory: null,
    };
  },
  computed: {
    ...mapGetters('home', ['allCategories']),
    filteredCategories() {
      return this.allCategories.filter((category) =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  methods: {
    ...mapActions('home', ['fetchCategories', 'removeCategory']),
    editCategory(categoryId) {
      console.log(`category id - ${categoryId}`);
      this.selectedCategory = this.allCategories.find(
        (category) => category.id === categoryId,
      );
      this.allCategories.map((c) => console.log(c));
      console.log(`selected category - ${this.selectedCategory}`);
      this.showCategoryForm();
    },
    deleteCategory(categoryId) {
      this.removeCategory(categoryId);
    },
    closeComponent() {
      this.$emit('close-component');
    },
    showCategoryForm() {
      this.isCategoryForm = true;
    },
    closeForm() {
      this.isCategoryForm = false;
      this.selectedCategory = null;
    },
  },
  created() {
    this.fetchCategories();
  },
};
</script>

<style scoped lang="scss">
.admin-category-component {
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
