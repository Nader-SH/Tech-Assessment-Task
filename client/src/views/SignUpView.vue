<template>
  <div>
    <Header />
    <SignUp />
  </div>
</template>

<script>
import SignUp from '../components/SignUp.vue';
import Header from "../components/Header.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignUpView',

  components: {
    SignUp,
    Header,
  },
});
</script>
