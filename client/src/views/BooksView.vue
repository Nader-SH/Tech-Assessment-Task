<template>
  <div>
    <Header />
    <ShwBooksNoAuth />
  </div>
</template>
  
  <script>
import { defineComponent } from "vue";

import Header from "../components/Header.vue";
import ShwBooksNoAuth from "../components/ShowBooksNoAuth.vue";


export default defineComponent({
  name: "BooksView",

  components: {
    Header,
    ShwBooksNoAuth,
  },
});
</script>
  