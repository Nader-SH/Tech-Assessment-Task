<template>
  <div>
    <div class="bookDiv">
      <v-btn class="button" @click="switchToAddBook">Add a Book</v-btn>
      <v-btn class="button" @click="switchToShowBooks">Show Books</v-btn>
    </div>
    <component :is="currentComponent" />
  </div>
</template>

<script>
import AddBookPage from "../components/book/AddBookPage.vue.vue";
import ShowBooksPage from "../components/book/ShowBooksPage.vue";

export default {
  name: "Dashboard",
  components: {
    AddBookPage,
    ShowBooksPage,
  },
  data() {
    return {
      currentComponent: "ShowBooksPage",
    };
  },
  methods: {
    switchToAddBook() {
      this.currentComponent = "AddBookPage";
    },
    switchToShowBooks() {
      this.currentComponent = "ShowBooksPage";
    },
  },
};
</script>
<style scoped>
.bookDiv {
  display: flex;
  justify-content: space-around;
  margin: 10px;
}
.buttons {
  display: flex;
  flex: 1;
}

.button {
  border-radius: 8px;
  margin-left: 10px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: #04bca6;
  color: rgb(var(--v-theme-on-primary));
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #fff;
  color: #04bca6;
}
a.router-link-exact-active {
  background-color: #fff !important;
  color: #04bca6 !important;
}
</style>
