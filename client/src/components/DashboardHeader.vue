<template>
  <header class="header">
    <div class="user-info">
      <v-img :src="logo" alt="Logo" class="logo" />
    </div>
    <div class="user-name">
      <span class="titleUserName">User Name : </span>
        <span>{{ user.firstName }}</span>
      <span>&nbsp;</span>
      <span>{{ user.lastName }}</span>
    </div>
    <div>
      <v-btn class="sign-out-btn button" @click="signOut">Sign Out</v-btn>
    </div>
  </header>
</template>
  
<script>
import axios from "axios";
import auth from "../auth/auth.js";
export default {
  name: "DachboardHeader",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
      },
      logo: require("@/assets/onex_logo.png"),
    };
  },
  methods: {
    async fetchUserData() {
      const data = await auth();
      this.user = data.user;
    },
    async signOut() {
      try {
        await axios.post(
          "http://localhost:8080/api/v1/signout",
          null,
          { withCredentials: true }
        );
        this.$router.push({ name: "signin" });
      } catch (error) {
        return;
      }
    },
  },
  mounted() {
    this.fetchUserData();
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
.user-name{
  font-weight: 600;
}
.titleUserName{
  font-weight: 500;
}

.buttons {
  display: flex;
}

.button {
  flex: 1;
  font-weight: bold;
  margin-left: 10px;
  padding: 8px 12px;
  text-decoration: none;
  background-color: #04bca6;
  color: rgb(var(--v-theme-on-primary));
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #fff;
  color: #04bca6;
}
a.router-link-exact-active {
  background-color: #fff !important;
  color: #04bca6 !important;
}
</style>
  