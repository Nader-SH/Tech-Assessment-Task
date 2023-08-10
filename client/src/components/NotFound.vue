<template>
    <div class="page-not-found">
      <h1 class="title">404 - Page Not Found</h1>
      <p class="message">Sorry, the page you are looking for does not exist.</p>
      <router-link to="/" class="button">Home Page</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  };
  </script>
  
  <style scoped>
  .page-not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #04bca6;
    color: white;
  }
  
  .title {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  .message {
    font-size: 1.5rem;
  }

  .button{
    font-weight: bold;
  margin-left: 10px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: white ;
  color: #04bca6;
  border-radius: 4px;
  cursor: pointer;
  border-radius: 8px;
  }
  </style>
  