<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      userData: null,
      error: null,
    };
  },
  // methods: {
  //   async fetchUserData() {
  //     try {
  //       this.error = null;
  //       const response = await axios.get(
  //         "http://localhost:8080/api/v1/userdata",
  //         { withCredentials: true }
  //       );
  //       console.log(response.data);
  //       this.userData = response.data;
  //     } catch (error) {
  //       console.error("Error fetching data:", error.response.data.message);
  //       this.error = error.response.data.message;
  //     }
  //   },
  // },
  // mounted() {
  //   this.fetchUserData();
  // },
};
</script>
<style>
  .v-application__wrap {
    min-height: 0 !important;
  }
</style>
