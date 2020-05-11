<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
      <h4>Задачи</h4>
    </vs-col>
  </vs-row>

</div>
</template>

<script>
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';

export default {
  name: 'Task',
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style scoped>

</style>
