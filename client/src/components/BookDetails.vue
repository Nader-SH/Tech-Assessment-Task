<template>
  <div class="book-details">
    <h1 class="title">Book Details</h1>
    <div v-if="book" class="book-info">
      <div class="book-image">
        <v-img :src="book.imageLink" alt="Book Cover" />
      </div>
      <div class="book-details">
        <p class="title"><strong>Title:</strong> {{ book.title }}</p>
        <v-p class="author"><strong>By:</strong> {{ book.author }}</v-p>
        <p class="description">
          <strong>Description:</strong> {{ book.description }}
        </p>
        <p class="created-at">
          <strong>Published:</strong> {{ formattedCreatedAt }}
        </p>
      </div>
      
    </div>
    <div class="detailsBookDiv">
        <p v-if="detailsBookError">{{ this.detailsBookError }}.</p>
      </div>
    <router-link to="/" class="redirect-button">Back to Home</router-link>
  </div>
</template>
  
  <script>
import axios from "axios";
import moment from "moment";

export default {
  name: "BookDetailsView",
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      book: null,
      detailsBookError: "",
    };
  },
  computed: {
    formattedCreatedAt() {
      if (this.book && this.book.createdAt) {
        return moment(this.book.createdAt).format("MMMM D, YYYY");
      }
      return "";
    },
  },
  methods: {
    async fetchBookDetails(id) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/getbookid/${id}`,
          { withCredentials: true }
        );
        this.book = response.data;
      } catch (error) {
        this.detailsBookError = error.response.data.message;

      }
    },
  },
  mounted() {
    this.fetchBookDetails(this.$route.params.id);
  },
};
</script>
  <style scoped>
.detailsBookDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  color: red;
}
.book-details {
  text-align: center;
  margin: 20px;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  color: #04bca6;
}

.book-info {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
  padding: 35px;
  border-radius: 8px;
}

.book-details {
  flex: 1;
  margin-top: 35px;
}

.book-image {
  flex: 1;
  max-width: 250px;
  max-height: 350px;
  min-width: 250px;
}

.book-image img {
  width: 100%;
  height: auto;
  border: 1px solid #ccc;
}
.book-details p {
  margin-bottom: 12px;
}
.redirect-button {
  margin: 20px;
}
.created-at {
  color: #888;
}

.redirect-button {
  display: inline-block;
  padding: 8px 16px;
  background-color: #04bca6;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.redirect-button:hover {
  background-color: #039b8e;
}
</style>
  