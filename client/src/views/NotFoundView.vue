<template>
  <div>
    <NotFound />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import NotFound from "../components/NotFound.vue";

export default defineComponent({
  name: "NotFoundView",

  components: {
    NotFound,
  },
});
</script>

<style>
</style>