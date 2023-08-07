<template>
  <div class="page-content">
    <h2>{{ pageTitle }}</h2>
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
              <h3>By : {{ book.author }}</h3>
              <h4>Title : {{ book.title }}</h4>
            </div>
            <div class="buttonsDiv">
              <button @click="openEditPopup(book)" class="button">Edit</button>
              <button @click="showDeleteAlert(book.id)" class="button">
                Delete
              </button>
              <router-link
                @click="redirectToDetails(book.id)"
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
  </div>

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
        <img :src="editingBook.imageLink" alt="Book Cover" />
      </div>
      <div v-else class="image-placeholder">No Image Selected</div>
      <button type="submit" class="button">Save</button>
      <button @click="closeEditPopup" class="button">Cancel</button>
    </div>
  </form>
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
    };
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/getbooks",
          { withCredentials: true }
        );
        this.books = response.data;
      } catch (error) {
        console.error("Error getting books:", error);
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
        this.books = this.books.filter((book) => book.id !== bookId);
        console.log("Book deleted successfully");
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    },
    openEditPopup(book) {
      this.editingBook = { ...book };
    },
    closeEditPopup() {
      this.editingBook = null;
    },
    async updateBook() {
      console.log(this.editingBook);
    },   
     redirectToDetails(bookId) {
      // Implement the navigation logic
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
        console.log(response.data.message);
        this.editingBook = null;
      } catch (error) {
        console.error("Error edit book:", error);
      }
    },
    handleImageUpload(event) {
      this.editingBook.imageLink = event.target.files[0];
      console.log(this.editingBook.imageLink);
    },
  },
};
</script>

<style scoped>
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
  max-width: 400px;
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

.modal button {
  margin-top: 10px;
}
</style>
