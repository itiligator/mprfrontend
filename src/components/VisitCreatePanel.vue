<template>
  <div>
    <div v-if='!isCurrentVisit'>
    <vs-card>
      <div slot="header">
        <h2>
          Визит по маршруту
        </h2>
      </div>

      <vs-select
        label="Запланированные визиты"
        v-model="selectedVisit"
      >
        <vs-select-item
          :key="visit.UUID"
          :value="visit"
          :text="'#' + visit.id + ' ' + clientByINN(visit.clientINN).name"
          v-for="visit in planned_visits" />
      </vs-select>
      <br>
      <vs-button
        :disabled="!selectedVisit.UUID"
        @click="startVisitFromPlanned(selectedVisit)">
        Начать визит
      </vs-button>
      </vs-card>

      <vs-card>
        <div slot="header">
          <h2>
            Визит вне маршрута
          </h2>
        </div>
        <vs-select
          label="Клиенты"
          v-model="selectedClient"
        >
          <vs-select-item
            :key="client.inn"
            :value="client"
            :text="client.name"
            v-for="client in clients" />
        </vs-select>
        <br>
        <vs-button
          :disabled="!selectedClient.inn"
          @click="startVisitFromClientList(selectedClient)">
          Начать визит
        </vs-button>
      </vs-card>
    </div>

    <div v-else>
        Визит уже начат
    </div>
  </div>
</template>

<script>

import {
  VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER,
  VISIT_GET_PLANNED,
  VISIT_IS_CURRENT,
  VISIT_SAVE_CURRENT_TO_VUEX,
} from '@/store/actions/visits';
import { GETALLCLIENTS, GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS } from '@/store/actions/goods';
import { CHECKLIST_SAVE_CURRENT, CHECKLISTS_GET_ALL } from '@/store/actions/checklists';

export default {
  name: 'VisitCreatePanel',
  data() {
    return {
      selectedVisit: {},
      initialVisit: {
        UUID: null,
        orders: [],
        payment: null,
        dataBase: true,
        clientINN: null,
        processed: null,
        invoice: null,
        status: 1,
        deliveryDate: '',
      },
      selectedClient: {},
    };
  },
  computed: {
    planned_visits() {
      return this.$store.getters[VISIT_GET_PLANNED];
    },
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
    products() {
      return this.$store.getters[ALL_GOODS];
    },
    clients() {
      return this.$store.getters[GETALLCLIENTS];
    },
  },
  methods: {
    clientByINN(inn) {
      return this.$store.getters[GETCLIENTBYINN](inn);
    },
    startVisitFromPlanned(visitData) {
      this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, visitData.clientINN);
      const composedVisitData = JSON.parse(JSON.stringify(visitData));
      composedVisitData.status = 1;
      composedVisitData.deliveryDate = composedVisitData.deliveryDate || '';
      this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, composedVisitData);
      const { clientType } = this.clientByINN(composedVisitData.clientINN);
      // eslint-disable-next-line max-len
      const currentChecklist = this.$store.getters[CHECKLISTS_GET_ALL].filter((q) => (q.clientType === 'Магазин') === (clientType === 'Магазин'));
      this.$store.dispatch(CHECKLIST_SAVE_CURRENT, currentChecklist);
    },
    startVisitFromClientList(client) {
      this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, client.inn);
      this.initialVisit.clientINN = client.inn;
      this.initialVisit.UUID = this.$uuid.v4();
      this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.initialVisit);
      // eslint-disable-next-line max-len
      const currentChecklist = this.$store.getters[CHECKLISTS_GET_ALL].filter((q) => (q.clientType === 'Магазин') === (client.clientType === 'Магазин'));
      this.$store.dispatch(CHECKLIST_SAVE_CURRENT, currentChecklist);
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
