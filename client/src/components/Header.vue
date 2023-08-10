<template>
  <div>
    <header class="header">
      <router-link to="/">
        <v-img :src="logo" alt="Logo" class="logo" />
      </router-link>
      <div class="buttons">
        <v-btn to="/books" class="button">All Books</v-btn>
        <v-btn to="/signin" class="button">Sign In</v-btn>
        <v-btn to="/signup" class="button">Sign Up</v-btn>
      </div>
    </header>
  </div>
</template>
  
  <script>
export default {
  name: "Header",
  data() {
    return {
      logo: require("@/assets/onex_logo.png"),
    };
  },
};
</script>
  
  <style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f0f0f0;
}

.logo {
  width: 100px !important;
  height: 40px !important;
  object-fit: contain !important;
}

.buttons {
  display: flex;
}

.button {
  font-weight: bold;
  margin-left: 10px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: white;
  color: #04bca6;
  border-radius: 4px;
  cursor: pointer;
  border-radius: 8px;
}

.button:hover {
  color: #fff;
  background-color: #04bca6;
}
a.v-btn--active {
  color: #fff;
  background-color: #04bca6;
}

/* Add any additional styling as needed */
</style>
  