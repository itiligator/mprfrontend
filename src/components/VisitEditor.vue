<template>
  <div>
    Редактор визита
    <vs-button @click="resetVisit">Отменить</vs-button>
  </div>
</template>

<script>


import { VISIT_SAVE_CURENT_TOVUEX } from '@/store/actions/visits';

export default {
  name: 'VisitEditor',
  computed: {
  },
  mounted() {
  },
  methods:
    {
      resetVisit() {
        this.$store.dispatch[VISIT_SAVE_CURENT_TOVUEX]({});
      },
    },
};
</script>

<style scoped>

</style>
