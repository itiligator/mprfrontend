<template>
  <div>
    <h2>Текущий визит: {{ clientByINN(currentVisit.clientINN).name }}</h2>
    <vs-button @click="resetVisit">Отменить визит</vs-button>
    <br>
    {{ clientByINN(currentVisit.clientINN) }}
  </div>
</template>

<script>


import { VISIT_SAVE_CURENT_TOVUEX, VISIT_GET_CURRENT } from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';

export default {
  name: 'VisitEditor',
  computed: {
    currentVisit() {
      return this.$store.getters[VISIT_GET_CURRENT];
    },
  },
  mounted() {
  },
  methods:
    {
      resetVisit() {
        this.$store.dispatch(VISIT_SAVE_CURENT_TOVUEX, {});
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
    },
};
</script>

<style scoped>

</style>
