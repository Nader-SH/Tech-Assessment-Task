<template>
  <div class="page-content">
    <h2>{{ pageTitle }}</h2>
    <form @submit.prevent="addBook" class="book-form">
      <label for="title">Book Title:</label>
      <v-text-field
        v-model="newBook.title"
        id="title"
        type="text"
        required
      ></v-text-field>

      <label for="author">Author:</label>
      <v-text-field
        v-model="newBook.author"
        id="author"
        type="text"
        required
      ></v-text-field>

      <label for="description">Description:</label>
      <v-textarea
        v-model="newBook.description"
        id="description"
        rows="4"
        required
      ></v-textarea>
      <label for="image">Select an Image:</label>
      <v-file-input
        v-model="newBook.image"
        id="image"
        accept="image/*"
      ></v-file-input>
      <div class="checkboxDiv" @click="showBookToPublic()">
        <v-checkbox
          class="checkBox"
          :v-model="showBook"
          label="Show a book to the public"
        ></v-checkbox>
      </div>
      <div class="spinnerDiv">
        <Spinner v-if="spinner" />
      </div>
      <v-btn type="submit" class="submit-button button">Add Book</v-btn>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../spinners/Spinner.vue";

export default {
  name: "AddBookPage",
  components: {
    Spinner,
  },
  props: {
    pageTitle: String,
  },
  data() {
    return {
      newBook: {
        title: "",
        author: "",
        description: "",
        image: null || "",
        showBook: false,
      },
      spinner: false,
    };
  },
  methods: {
    async addBook() {
      if (this.validateForm()) {
        try {
          this.spinner = true;
          const formData = new FormData();
          formData.append("title", this.newBook.title);
          formData.append("author", this.newBook.author);
          formData.append("description", this.newBook.description);
          formData.append("image", this.newBook.image[0]);
          formData.append("showBook", this.newBook.showBook);

          await axios.post("http://localhost:8080/api/v1/addbook", formData, {
            withCredentials: true,
          });
        } catch (error) {
          return;
          // console.error("Error adding book:", error);
        } finally {
          this.newBook = {
            title: "",
            author: "",
            description: "",
            image: null || "",
            showBook: false,
          };
          this.spinner = false;
        }
      }
    },
    validateForm() {
      return (
        (this.newBook.title.trim() !== "" &&
          this.newBook.author.trim() !== "" &&
          this.newBook.description.trim() !== "" &&
          this.newBook.image[0] !== null) ||
        ("" && this.newBook.showBook === true) ||
        false
      );
    },
    showBookToPublic() {
      if (this.showBook === true) {
        this.showBook = false;
      } else {
        this.showBook = true;
      }
    },
  },
};
</script>

<style scoped>
.spinnerDiv {
  display: flex;
  justify-content: center;
}
.page-content {
  padding: 20px;
}

.book-form {
  max-width: 400px;
  margin: 0 auto;
}

.book-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.book-form input[type="text"],
.book-form input[type="url"],
.book-form textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.checkboxDiv {
  display: flex;
}
.button {
  display: flex;
  margin: auto;
  border-radius: 8px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: #04bca6;
  color: rgb(var(--v-theme-on-primary));
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: white;
  color: #04bca6;
}
</style>
