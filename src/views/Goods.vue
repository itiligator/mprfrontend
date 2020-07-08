<template lang="html">

<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="2" vs-lg="2">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="9">
      <h2>Товары</h2>
    </vs-col>
  </vs-row>


</div>

</template>

<script>

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';


export default {
  components: {

  },
  name: 'Goods',
  metaInfo: {
    title: 'МПР | Товары',
  },
  computed: {
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style>

</style>
