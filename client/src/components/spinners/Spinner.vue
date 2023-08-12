<template>
  <div id="app">
    <self-building-square-spinner
      :animation-duration="4000"
      :size="40"
      color="#04bca6"
      class="spinner"
    />
  </div>
</template>
  
  <script>
import { AtomSpinner, SelfBuildingSquareSpinner } from "epic-spinners";
import {} from "epic-spinners";

export default {
  name: "Spinner",
  components: {
    AtomSpinner,
    SelfBuildingSquareSpinner,
  },
};
</script>
<style scoped>
.spinner{
    margin: 10px;
}
</style>