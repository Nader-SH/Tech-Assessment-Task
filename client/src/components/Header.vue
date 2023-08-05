<template>
  <header class="header">
    <router-link to="/">
      <img :src="logo" alt="Logo" class="logo" />
    </router-link>
    <div class="buttons">
      <router-link to="/signin" class="button">Sign In</router-link>
      <router-link to="/signup" class="button">Sign Up</router-link>
    </div>
  </header>
</template>
  
  <script>
export default {
  name: "Header",
  data() {
    return {
      logo: require('@/assets/onex_logo.png')
    };
  }
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
  background-color: #04bca6 ;
  color: rgb(var(--v-theme-on-primary)) ;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #fff;
  color: #04bca6;
}
a.router-link-exact-active{
  background-color: #fff !important;
  color: #04bca6 !important;
}

/* Add any additional styling as needed */
</style>
  