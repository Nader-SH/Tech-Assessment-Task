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
};
</script>
<style>
  .v-application__wrap {
    min-height: 0 !important;
  }
</style>
