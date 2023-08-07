<template>
  <DachboardHeader />
  <BookDetails />
</template>
  
  <script>
import { defineComponent } from "vue";
import BookDetails from "../components/BookDetails.vue";
import DachboardHeader from "../components/DashboardHeader.vue";

export default defineComponent({
  name: "BookDetailsView",

  components: {
    BookDetails,
    DachboardHeader,
  },
});
</script>
  