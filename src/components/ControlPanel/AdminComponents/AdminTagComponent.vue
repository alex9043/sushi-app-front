<template>
  <div class="admin-tag-component">
    <h4>Tag</h4>
    <div v-if="!isTagForm">
      <div class="product-add-buttons">
        <button @click="showTagForm">Создать тег</button>
        <button @click="closeComponent">Продукты</button>
      </div>
      <div class="admin-tag">
        <div>
          <label for="tagName">Tag Name:</label>
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
            <tr v-for="tag in filteredTags" :key="tag.id">
              <td>{{ tag.name }}</td>
              <td>
                <button @click="editTag(tag.id)">Edit</button>
                <button @click="deleteTag(tag.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <AdminTagForm
      v-if="isTagForm"
      :tagData="selectedTag"
      @close-form="closeForm"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AdminTagForm from '@/components/ControlPanel/AdminComponents/Form/AdminTagForm.vue';

export default {
  name: 'AdminTagComponent',
  components: {
    AdminTagForm,
  },
  data() {
    return {
      searchQuery: '',
      isTagForm: false,
      selectedTag: null,
    };
  },
  computed: {
    ...mapGetters('home', ['allTags']),
    filteredTags() {
      return this.allTags.filter((tag) =>
        tag.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    },
  },
  methods: {
    ...mapActions('home', ['fetchTags', 'removeTag']),
    editTag(tagId) {
      this.selectedTag = this.allTags.find((tag) => tag.id === tagId);
      this.showTagForm();
    },
    deleteTag(tagId) {
      this.removeTag(tagId);
    },
    closeComponent() {
      this.$emit('close-component');
    },
    showTagForm() {
      this.isTagForm = true;
    },
    closeForm() {
      this.isTagForm = false;
      this.selectedTag = null;
    },
  },
  created() {
    this.fetchTags();
  },
};
</script>

<style scoped lang="scss">
.admin-tag-component {
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
