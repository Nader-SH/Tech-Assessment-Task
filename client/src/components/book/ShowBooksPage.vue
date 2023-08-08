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
      <p class="noBooks">You have no books. Go to Add Books.</p>
    </div>
    <div v-else class="book-list">
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-container">
          <div class="book-image">
            <img v-if="book.imageLink" :src="book.imageLink" alt="Book Cover" />
            <div v-else class="no-image-placeholder">No Image Available</div>
          </div>
          <div class="book-details">
            <div class="authorTitleDiv">
              <h3 class="title">Title : {{ book.title }}</h3>
              <h4 class="author">By : {{ book.author }}</h4>
            </div>
            <div class="buttonsDiv">
              <button @click="openEditPopup(book)" class="button">Edit</button>
              <button @click="showDeleteAlert(book.id)" class="button">
                Delete
              </button>
              <router-link
                :to="{ name: 'bookdetailsview', params: { id: book.id } }"
                class="button"
              >
                Details
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading indicator while fetching content -->
    <div v-if="loading" class="loading-indicator">Loading...</div>

    <form class="modal" v-if="editingBook" @submit.prevent="submitBook">
      <div class="modal-content">
        <h3>Edit Book</h3>
        <label for="author">Author:</label>
        <input v-model="editingBook.author" type="text" id="author" />
        <label for="title">Title:</label>
        <input v-model="editingBook.title" type="text" id="title" />
        <label for="description">Description:</label>
        <textarea v-model="editingBook.description" id="description"></textarea>
        <label for="imageLink">Image:</label>
        <input
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
        <div class="buttons-modal">
          <button type="submit" class="button">Save</button>
          <button @click="closeEditPopup" class="button">Cancel</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShowBooksPage",
  props: {
    pageTitle: String,
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
        this.loading = true;
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
        // console.error("Error getting books:", error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        this.currentPage = this.currentPage + 1;
        this.getBooks(this.currentPage);
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
        await this.getBooks();
      } catch (error) {
        return;
        // console.error("Error deleting book:", error);
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
      const data = new FormData();
      data.append("bookId", this.editingBook.id);
      data.append("author", this.editingBook.author);
      data.append("title", this.editingBook.title);
      data.append("description", this.editingBook.description);
      data.append("image", this.editingBook.imageLink);

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
      } catch (error) {
        return;
        // console.error("Error editing book:", error);
      }
    },
    async searchBooks(event) {
      this.currentPage = 1;
      this.searchText = event.target.value;
      if (this.searchText === "") {
        this.books = [];
      }
      await this.getBooks();
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
/* Existing styles */

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

.title {
  color: #04bca6;
}
.noBooks {
  display: flex;
  justify-content: center;
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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
  flex: 1;
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
  background-color: white;
  color: #04bca6;
}

/* Styles for the modal */
.modal {
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
