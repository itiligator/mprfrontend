<template>
  <div>
    <div v-if='!isCurrentVisit'>
        <h4>Начать новый визит</h4>
      <br>
      <vs-select
        label="Запланированные визиты"
        v-model="selectedVisit"
      >
        <vs-select-item
          :key="visit.UUID"
          :value="visit"
          :text="clientByINN(visit.clientINN).name"
          v-for="visit in visits" />
      </vs-select>
      <br>
      <vs-button
        :disabled="!selectedVisit.UUID"
        @click="startVisitFromPlanned(selectedVisit)">
        Начать визит
      </vs-button>

    </div>
    <div v-else>
        Визит уже начат
    </div>
  </div>
</template>

<script>

import { VISIT_IS_CURRENT, VISIT_GET_ALL, VISIT_SAVE_CURRENT_TOVUEX } from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS } from '@/store/actions/goods';

export default {
  name: 'VisitCreatePanel',
  data() {
    return {
      selectedVisit: {},
    };
  },
  computed: {
    visits() {
      return this.$store.getters[VISIT_GET_ALL];
    },
    planned_visits() {
      return this.visits.filter((v) => v.status === 0);
    },
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
    products() {
      return this.$store.getters[ALL_GOODS];
    },
  },
  methods: {
    clientByINN(inn) {
      return this.$store.getters[GETCLIENTBYINN](inn);
    },
    startVisitFromPlanned(visitData) {
      const orders = this.products.map((p) => ({
        productItem: p.item, order: 0, balance: 0, sales: 0, recommend: 0,
      }));
      const composedVisitData = visitData;
      composedVisitData.orders = orders;
      composedVisitData.status = 1;
      this.$store.dispatch(VISIT_SAVE_CURRENT_TOVUEX, composedVisitData);
      this.$router.push('visit');
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
