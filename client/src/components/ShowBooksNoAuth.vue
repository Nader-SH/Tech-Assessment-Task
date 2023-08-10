<template>
  <div class="page-content">
    <div class="book-list">
      <div v-for="book in books" :key="book.id" class="book-item">
        <div class="book-container">
          <div class="book-image">
            <v-img v-if="book.imageLink" :src="book.imageLink" alt="Book Cover" />
            <div v-else class="no-image-placeholder">No Image Available</div>
          </div>
          <div class="authorTitleDiv">
            <h3>Add By : {{ book.User.first_name }} {{ book.User.last_name }}</h3>
            <h3 class="title">Title : {{ book.title }}</h3>
            <h4 class="author">By : {{ book.author }}</h4>
            <div>
                <p>
                    Description : {{ book.description }}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShwBooksNoAuth",
  data() {
    return {
      books: [],
      currentPage: 1,
    };
  },
  mounted() {
    this.getBooks();
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    async getBooks() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/getbooksnoauth?page=${this.currentPage}`,
          { withCredentials: true }
        );
        this.books = this.books.concat(response.data);
        console.log(response.data[0]);
      } catch (error) {
        // console.log(error);
        return;
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
  },
};
</script>

<style scoped>
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
}
.v-responsive {
    display: flex;
    flex: 1 0 auto;
    max-height: 80%;
    max-width: 80%;
    overflow: hidden;
    position: relative;
}
.v-img__img{
width: 100%;
height: 100%;
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
</style>