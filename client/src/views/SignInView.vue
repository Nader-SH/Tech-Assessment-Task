<template>
  <div>
    <Header />
    <SignIn />
  </div>
</template>

<script>
import { defineComponent } from "vue";

import Header from "../components/Header.vue";
import SignIn from "../components/SignIn.vue";

export default defineComponent({
  name: "SignInView",

  components: {
    SignIn,
    Header,
  },
});
</script>
