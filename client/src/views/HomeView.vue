<template>
  <DachboardHeader />
  <Dashboard />
</template>

<script>
import { defineComponent } from 'vue';


import Dashboard from '../components/Dashboard.vue';
import DachboardHeader from "../components/DashboardHeader.vue";

export default defineComponent({
  name: 'DashboardView',

  components: {
    Dashboard,
    DachboardHeader,
  },
});
</script>
