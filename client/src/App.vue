<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};
export default {
  name: 'App',
  created() {
    const token = getCookie("token");
    console.log(token);
    if (!token || token === undefined) {
      this.$router.push({ name: "signin" });
    }else{
      this.$router.push({ name: "dashboard" });
    }
  },
}
</script>
<style>
  .v-application__wrap {
    min-height: 0 !important;
  }
</style>
