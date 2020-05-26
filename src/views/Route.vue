<template>
<div>

  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
    </vs-col>
  </vs-row>
<br>
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-w="11">
  <vs-card v-if="isCurrentVisit">
    <div slot="header">
      <h2>
        Текущий визит
      </h2>
    </div>
    <vs-row>
      <vs-col vs-xs="6" vs-lg="6">
        {{ clientByINN(currentVisit.clientINN).name }}
      </vs-col>
      <vs-col vs-w="5" vs-offset="1">
        <vs-button to="/visit" justify-content="center">Перейти к визиту</vs-button>
      </vs-col>
    </vs-row>
  </vs-card>


<!--  <div v-if="isCurrentVisit">-->
<!--  <h4 style="text-align: center;">Текущий визит</h4>-->
<!--  <vs-collapse type="border">-->
<!--    <vs-collapse-item>-->
<!--      <div slot="header">-->
<!--        {{ clientByINN(currentVisit.clientINN).name }}-->
<!--      </div>-->
<!--      <vs-row>-->
<!--        <vs-col vs-xs="6" vs-lg="6">-->
<!--          {{ clientByINN(currentVisit.clientINN).clientType }}-->
<!--        </vs-col>-->
<!--        <vs-col vs-xs="6" vs-lg="6">-->
<!--          <vs-button to="/visit">Перейти к визиту</vs-button>-->
<!--        </vs-col>-->
<!--      </vs-row>-->
<!--    </vs-collapse-item>-->
<!--  </vs-collapse>-->
<!--  </div>-->

  <vs-card>
    <div slot="header">
      <h2>
        Запланированные визиты
      </h2>
    </div>
    <vs-switch v-model="todayOnly">
      <span slot="on" style="font-size:16px">Сегодня</span>
      <span slot="off" style="font-size:16px">На неделю</span>
    </vs-switch>
<!--    <vs-checkbox v-model="todayOnly">Только сегодня</vs-checkbox>-->
    <br>
    <vs-collapse type="border" :accordion="true">
      <vs-collapse-item
        v-for="visit in planned_visits"
        :key="visit.UUID"
      >
        <div slot="header">
          #{{ visit.id }} {{ clientByINN(visit.clientINN).name }}
        </div>
        <vs-row>
          <vs-col vs-xs="6" vs-lg="6">
            {{ visit.date }}
            <br>
            <a :href="'tel:'+clientByINN(visit.clientINN).phone">
              {{ clientByINN(visit.clientINN).phone }}
            </a>
            {{ clientByINN(visit.clientINN).clientType }}
          </vs-col>
          <vs-col vs-w="5" vs-offset="1">
            <vs-button
              :disabled="isCurrentVisit"
              @click="startVisitFromPlanned(visit)"
            >Начать визит</vs-button>
          </vs-col>
        </vs-row>
      </vs-collapse-item>
    </vs-collapse>
  </vs-card>

<!--    <h3>Запланированные визиты</h3>-->
<!--  <br>-->
<!--      <vs-collapse type="border" :accordion="true">-->
<!--       <vs-collapse-item-->
<!--       v-for="visit in planned_visits"-->
<!--       :key="visit.UUID">-->
<!--         <div slot="header">-->
<!--           {{ clientByINN(visit.clientINN).name }}-->
<!--         </div>-->
<!--         <vs-row>-->
<!--           <vs-col vs-xs="6" vs-lg="6">-->
<!--             {{ visit.date }}-->
<!--             <br>-->
<!--             {{ clientByINN(visit.clientINN).clientType }}-->
<!--           </vs-col>-->
<!--           <vs-col vs-w="5" vs-offset="1">-->
<!--             <vs-button-->
<!--               :disabled="isCurrentVisit"-->
<!--               @click="startVisit(visit.UUID, visit.clientINN)"-->
<!--             >Начать визит</vs-button>-->
<!--           </vs-col>-->
<!--         </vs-row>-->
<!--       </vs-collapse-item>-->
<!--      </vs-collapse>-->

  <vs-card>
    <div slot="header">
      <h2>
        Завершенные визиты
      </h2>
    </div>
    <vs-collapse type="border">
      <vs-collapse-item
        v-for="visit in finished_visits"
        :key="visit.UUID">
        <div slot="header">
          #{{ visit.id }} {{ clientByINN(visit.clientINN).name }}
        </div>
        <vs-row>
          <vs-col vs-xs="6" vs-lg="6">
            {{ visit.date }}
            <br>
            {{ clientByINN(visit.clientINN).clientType }}
          </vs-col>
          <vs-col vs-w="5" vs-offset="1">
            <vs-button>Посмотреть результаты</vs-button>
          </vs-col>
        </vs-row>
      </vs-collapse-item>
    </vs-collapse>
  </vs-card>


<!--  <h3>Завершенные визиты</h3>-->
<!--  <br>-->
<!--  <vs-collapse type="border">-->
<!--    <vs-collapse-item-->
<!--      v-for="visit in finished_visits"-->
<!--      :key="visit.UUID">-->
<!--      <div slot="header">-->
<!--        {{ clientByINN(visit.clientINN).name }}-->
<!--      </div>-->
<!--      <vs-row>-->
<!--        <vs-col vs-xs="6" vs-lg="6">-->
<!--          {{ visit.date }}-->
<!--          <br>-->
<!--          {{ clientByINN(visit.clientINN).clientType }}-->
<!--        </vs-col>-->
<!--        <vs-col vs-w="5" vs-offset="1">-->
<!--          <vs-button>Посмотреть результаты</vs-button>-->
<!--        </vs-col>-->
<!--      </vs-row>-->
<!--    </vs-collapse-item>-->
<!--  </vs-collapse>-->

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
    </vs-col>
  </vs-row>
</div>

</template>

<script>
/* eslint-disable no-unused-vars */

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import {
  VISIT_DOWNLOAD_ALL_FROM_SERVER, VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER,
  VISIT_GET_CURRENT, VISIT_GET_FINISHED, VISIT_GET_PLANNED,
  VISIT_IS_CURRENT, VISIT_SAVE_CURRENT_TO_VUEX,
} from '@/store/actions/visits';
import { CLIENTS_REQUEST, GETALLCLIENTS, GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS } from '@/store/actions/goods';
import { CHECKLIST_SAVE_CURRENT, CHECKLISTS_GET_ALL } from '@/store/actions/checklists';

export default {
  name: 'Route',
  metaInfo: {
    title: 'МПР | Маршрут',
  },
  components: {
  },
  data() {
    return {
      todayOnly: false,
    };
  },
  computed: {
    // visits() {
    //   return this.$store.getters[VISIT_GET_ALL];
    // },
    planned_visits() {
      const today = new Date().toISOString().slice(0, 10);
      // return this.visits.filter((v) => v.status === 0 && (!this.todayOnly || v.date === today));
      return this.$store.getters[VISIT_GET_PLANNED]
        .filter((v) => v.status === 0 && (!this.todayOnly || v.date === today));
    },
    finished_visits() {
      // return this.visits.filter((v) => v.status === 2);
      return this.$store.getters[VISIT_GET_FINISHED];
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
    products() {
      return this.$store.getters[ALL_GOODS];
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
      startVisitFromPlanned(visitData) {
        this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, visitData.clientINN);
        const orders = this.products.map((p) => ({
          productItem: p.item, order: 0, balance: 0, sales: 0, recommend: 0,
        }));
        const composedVisitData = JSON.parse(JSON.stringify(visitData));
        composedVisitData.orders = orders;
        composedVisitData.status = 1;
        this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, composedVisitData);
        const { clientType } = this.clientByINN(composedVisitData.clientINN);
        // eslint-disable-next-line max-len
        const currentChecklist = this.$store.getters[CHECKLISTS_GET_ALL].filter((q) => q.clientType === clientType);
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, currentChecklist);
        this.$router.push('visit');
      },
    },
  created() {
  },
};
</script>

<style scoped>

</style>
