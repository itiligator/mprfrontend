<template>
  <div>
    <div v-if='!isCurrentVisit'>
        Панелька начала визита
    </div>
    <div v-else>
        Визит уже начат
    </div>
  </div>
</template>

<script>

import { VISIT_IS_CURRENT } from '@/store/actions/visits';

export default {
  name: 'VisitCreatePanel',
  computed: {
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
