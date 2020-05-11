<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
      <h4>Маршрут</h4>
    </vs-col>
  </vs-row>

  <vs-list>
    <vs-list-header title="Запланированные визиты"></vs-list-header>

    <vs-list-item
      v-for="visit of planned_visits"
      :title="clientByINN(visit.clientINN).name"
      :subtitle="visit.date"
      :key="visit.UUID">
      <vs-button color="warning">Начать визит</vs-button>
    </vs-list-item>
    </vs-list>

  <vs-list>
    <vs-list-header title="Завершенные визиты"></vs-list-header>

    <vs-list-item
      v-for="visit of finished_visits"
      :title="clientByINN(visit.clientINN).name"
      :subtitle="visit.orders[1].productItem"
    :key="visit.UUID">
    </vs-list-item>
  </vs-list>
</div>

</template>

<script>

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import { VISIT_DOWNLOAD_ALL_FROM_SERVER, VISIT_GET_ALL } from '@/store/actions/visits';
import { CLIENTS_REQUEST, GETALLCLIENTS, GETCLIENTBYINN } from '@/store/actions/clients';

export default {
  name: 'Route',
  metaInfo: {
    title: 'МПР | Маршрут',
  },
  components: {
  },
  computed: {
    visits() {
      return this.$store.getters[VISIT_GET_ALL];
    },
    planned_visits() {
      return this.visits.filter((v) => v.status === 0);
    },
    finished_visits() {
      return this.visits.filter((v) => v.status === 2);
    },
    clients() {
      return this.$store.getters[GETALLCLIENTS];
    },
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
    },
  created() {
    this.$store.dispatch(VISIT_DOWNLOAD_ALL_FROM_SERVER);
    this.$store.dispatch(CLIENTS_REQUEST);
  },
};
</script>

<style scoped>

</style>
