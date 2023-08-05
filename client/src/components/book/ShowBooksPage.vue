<template>
    <div class="page-content">
      <h2>{{ pageTitle }}</h2>
      <div v-if="books.length === 0">
        <p>No books to show.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="book in books" :key="book.id">{{ book.title }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ShowBooksPage",
    props: {
      pageTitle: String,
    },
    data() {
      return {
        books: [
          { id: 1, title: "Book 1" },
          { id: 2, title: "Book 2" },
          { id: 3, title: "Book 3" },
          // ... add more books here ...
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .page-content {
    padding: 20px;
  }
  </style>
  