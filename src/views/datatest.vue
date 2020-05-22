<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
      <h4>Страничка просмотра данных</h4>
    </vs-col>
  </vs-row>

  {{ visitsdata }}
</div>
</template>

<script>

import { VISIT_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/visits';
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';

export default {
  name: 'datatest',
  components: {
  },
  computed: {
    visitsdata() { return false; },
  },
  mounted() {
    this.$store.dispatch(VISIT_DOWNLOAD_ALL_FROM_SERVER);
  },
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
