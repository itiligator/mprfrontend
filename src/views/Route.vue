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

  <div v-if="isCurrentVisit">
  <h4 style="text-align: center;">Текущий визит</h4>
  <vs-collapse type="border">
    <vs-collapse-item>
      <div slot="header">
        {{ clientByINN(currentVisit.clientINN).name }}
      </div>
      <vs-row>
        <vs-col vs-xs="6" vs-lg="6">
          {{ clientByINN(currentVisit.clientINN).clientType }}
        </vs-col>
        <vs-col vs-xs="6" vs-lg="6">
          <vs-button to="/visit">Перейти к визиту</vs-button>
        </vs-col>
      </vs-row>
    </vs-collapse-item>
  </vs-collapse>
  </div>

    <h4 style="text-align: center;">Запланированные визиты</h4>
      <vs-collapse type="border" :accordion="true">
       <vs-collapse-item
       v-for="visit in planned_visits"
       :key="visit.UUID">
         <div slot="header">
           {{ clientByINN(visit.clientINN).name }}
         </div>
         <vs-row>
           <vs-col vs-xs="6" vs-lg="6">
             {{ visit.date }}
             <br>
             {{ clientByINN(visit.clientINN).clientType }}
           </vs-col>
           <vs-col vs-xs="6" vs-lg="6">
             <vs-button
               :disabled="isCurrentVisit"
               @click="startVisit(visit.UUID, visit.clientINN)"
             >Начать визит</vs-button>
           </vs-col>
         </vs-row>
       </vs-collapse-item>
      </vs-collapse>


  <h4 style="text-align: center;">Завершенные визиты</h4>
  <vs-collapse type="border">
    <vs-collapse-item
      v-for="visit in finished_visits"
      :key="visit.UUID">
      <div slot="header">
        {{ clientByINN(visit.clientINN).name }}
      </div>
      <vs-row>
        <vs-col vs-xs="6" vs-lg="6">
          {{ visit.date }}
          <br>
          {{ clientByINN(visit.clientINN).clientType }}
        </vs-col>
        <vs-col vs-xs="6" vs-lg="6">
          <vs-button>Посмотреть результаты</vs-button>
        </vs-col>
      </vs-row>
    </vs-collapse-item>
  </vs-collapse>

<!--   <vs-list>
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
  </vs-list> -->
</div>

</template>

<script>
/* eslint-disable no-unused-vars */

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import {
  VISIT_DOWNLOAD_ALL_FROM_SERVER,
  VISIT_GET_ALL,
  VISIT_GET_CURRENT,
  VISIT_IS_CURRENT, VISIT_SAVE_CURENT_TOVUEX,
} from '@/store/actions/visits';
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
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
    currentVisit() {
      return this.$store.getters[VISIT_GET_CURRENT];
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
      startVisit(uuid = undefined, clientINN) {
        const visitData = { uuid, clientINN };
        if (uuid !== undefined) {
          visitData.uuid = this.$uuid.v4();
        }
        console.log(visitData);
        this.$store.dispatch(VISIT_SAVE_CURENT_TOVUEX, visitData);
        this.$router.push('visit');
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
