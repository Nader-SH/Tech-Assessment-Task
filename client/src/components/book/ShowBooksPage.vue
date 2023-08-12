<template>
  <div class="page-content">
    <h2>{{ pageTitle }}</h2>
    <div class="search-container">
      <input
        v-model="searchQuery"
        @input="searchBooks"
        placeholder="Search books By Auther or Title...."
      />
    </div>
    <div v-if="books.length === 0">
      <p class="noBooks">No Books.</p>
    </div>
    <div v-else class="book-list">
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-container">
          <div class="book-image">
            <v-img
              v-if="book.imageLink"
              :src="book.imageLink"
              alt="Book Cover"
            />
            <div v-else class="no-image-placeholder">No Image Available</div>
          </div>
          <div class="authorTitleDiv">
            <h3 class="title">Title : {{ book.title }}</h3>
            <h4 class="author">By : {{ book.author }}</h4>
          </div>
          <div class="book-details"></div>
          <div class="buttonsDiv">
            <v-btn @click="openEditPopup(book)" class="button">Edit</v-btn>
            <v-btn @click="showDeleteAlert(book.id)" class="button">
              Delete
            </v-btn>
            <v-btn
              class="button"
              :to="{ name: 'bookdetailsview', params: { id: book.id } }"
            >
              Details
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="spinnerDiv">
      <Spinner v-if="spinner" />
    </div>

    <form class="modal" v-if="editingBook" @submit.prevent="submitBook">
      <div class="modal-content">
        <h3>Edit Book</h3>
        <label for="title">Title:</label>
        <v-text-field v-model="editingBook.title" type="text" id="title" />
        <label for="author">By:</label>
        <v-text-field v-model="editingBook.author" type="text" id="author" />
        <label for="description">Description:</label>
        <textarea
          class="editingDescription"
          v-model="editingBook.description"
          id="description"
        ></textarea>
        <label for="imageLink">Image:</label>
        <v-file-input
          type="file"
          ref="imageInput"
          @change="handleImageUpload"
          accept="image/*"
        />
        <div v-if="editingBook.imageLink" class="image-preview">
          <img
            :src="this.pathImage ? this.pathImage : editingBook.imageLink"
            alt="Book Cover"
          />
        </div>
        <div v-else class="image-placeholder">No Image Selected</div>
        <div class="checkboxDiv">
          <v-checkbox
            class="checkBox"
            v-model="this.editingBook.showBook"
            label="Show the Book in Public"
          ></v-checkbox>
        </div>
        <div class="spinnerDiv">
          <Spinner v-if="spinner" />
        </div>
        <div class="editErrorDiv">
          <p v-if="editBookError">{{ this.editBookError }}</p>
        </div>
        <div class="buttons-modal">
          <v-btn type="submit" class="button">Save</v-btn>
          <v-btn @click="closeEditPopup" class="button">Cancel</v-btn>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Spinner from "../spinners/Spinner.vue";

export default {
  name: "ShowBooksPage",
  props: {
    pageTitle: String,
  },
  components: {
    Spinner,
  },
  data() {
    return {
      books: [],
      editingBook: null,
      selectedImageFile: null,
      pathImage: null,
      currentPage: 1,
      loading: false,
      searchText: "",
      spinner: false,
      editBookError: "",
    };
  },
  created() {
    this.getBooks();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getBooks() {
      try {
        this.spinner = true;
        const response = await axios.get(
          `http://localhost:8080/api/v1/getbooks/?page=${this.currentPage}&searchText=${this.searchText}`,
          { withCredentials: true }
        );
        if (response.data.searchBooksData) {
          this.books = [];
          this.books = response.data.searchBooksData;
        } else {
          this.books = this.books.concat(response.data);
        }
      } catch (error) {
        return;
      } finally {
        this.spinner = false;
      }
    },
    handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        this.currentPage = this.currentPage + 1;
        this.getBooks();
      }
    },
    showDeleteAlert(bookId) {
      if (confirm("Are you sure you want to delete this book?")) {
        this.deleteBook(bookId);
      }
    },
    async deleteBook(bookId) {
      try {
        await axios.post(
          `http://localhost:8080/api/v1/deletebook`,
          { bookId: bookId },
          {
            withCredentials: true,
          }
        );
        this.books = [];
        this.currentPage = 1;
        this.getBooks();
      } catch (error) {
        return;
      }
    },
    openEditPopup(book) {
      this.editingBook = { ...book };
    },
    closeEditPopup() {
      this.editingBook = null;
      this.pathImage = null;
    },
    async submitBook() {
      this.spinner = true;
      this.editBookError = "";
      const data = new FormData();
      data.append("bookId", this.editingBook.id);
      data.append("author", this.editingBook.author);
      data.append("title", this.editingBook.title);
      data.append("description", this.editingBook.description);
      data.append("image", this.editingBook.imageLink);
      data.append("showBook", this.editingBook.showBook);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/editbook`,
          data,
          {
            withCredentials: true,
          }
        );
        this.currentPage = 1;
        this.getBooks();
        this.books = [];
        this.editingBook = null;
        this.spinner = false;
      } catch (error) {
        this.spinner = false;
        this.editBookError = error.response.data.message;
      }
    },
    async searchBooks(event) {
      this.books = [];
      this.currentPage = 1;
      this.searchText = event.target.value;
      if (this.searchText === "") {
        this.books = [];
      }
      this.getBooks();
    },
    async handleImageUpload(event) {
      this.editingBook.imageLink = event.target.files[0];
      if (this.editingBook.imageLink) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.pathImage = e.target.result;
        };
        reader.readAsDataURL(this.editingBook.imageLink);
      }
    },
  },
};
</script>

<style scoped>
.editErrorDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
.spinnerDiv {
  display: flex;
  justify-content: center;
}
.v-responsive {
  display: flex;
  flex: 1 0 auto;
  max-height: 80%;
  max-width: 80%;
  overflow: hidden;
  position: relative;
}
.v-img__img {
  width: 100%;
  height: 100%;
}

.search-container {
  margin-bottom: 20px;
}
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.search-container input {
  width: 70%;
  padding: 8px;
  border: 1px solid #04bca6;
  border-radius: 4px;
}
.author {
  word-wrap: break-word;
}
.title {
  color: #04bca6;
  word-wrap: break-word;
}
.noBooks {
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
}

.page-content {
  padding: 20px;
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.book-item {
  width: 400px;
  margin-bottom: 20px;
  padding: 10px;
  box-shadow: 4px 5px 12px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 4px;
}
.book-item:hover {
  border: 2px solid #04bca6;
  transition: border-color 0.3s ease-in-out;
}
.book-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.book-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-image img {
  max-width: 100%;
  max-height: 200px;
}

.no-image-placeholder {
  width: 100%;
  height: 200px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-preview img {
  max-width: 100%;
  max-height: 200px;
}
.image-preview {
  display: flex;
  justify-content: center;
}

.image-placeholder {
  width: 100%;
  height: 200px;
  background-color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
}

.book-details {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 3em;
  margin-bottom: 10px;
}

.buttonsDiv {
  display: flex;
  justify-content: space-around;
  margin-top: auto;
}

.button {
  flex: 1;
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
  background-color: white;
  color: #04bca6;
}

/* Styles for the modal */
.modal {
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  margin-top: 160px;
  margin-bottom: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 400px; /* Default width for small screens */
  width: 400px;
}

@media (min-width: 768px) {
  .modal-content {
    max-width: 520px;
    width: 520px;
  }
}

.modal label {
  display: block;
  margin-bottom: 5px;
}
.editingDescription {
  height: 100px;
}
.modal input,
.modal textarea {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons-modal {
  display: flex;
  justify-content: space-around;
}

.modal button {
  margin-top: 10px;
}
</style>
