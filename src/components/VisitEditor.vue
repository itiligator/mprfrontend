<template>
  <!-- eslint-disable max-len -->
  <div v-if="!!currentVisit.UUID">

<!--    заголовок страницы-->

    <vs-tabs alignment="center">
      <vs-tab label="Оплата" v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
        Планируемая оплата: {{ currentVisit.paymentPlan }}
        <br>
        Лимит: {{ clientByINN(currentVisit.clientINN).limit }}
        <br>
        Отсрочка платежа: {{ clientByINN(currentVisit.clientINN).delay }}
        <vs-input
          type="number"
          label-placeholder="Сумма оплаты"
          v-model.number="currentVisit.payment"/>
        <br>
        <ClientPaymentHistory  :clientinn="currentVisit.clientINN"></ClientPaymentHistory>
        <vs-switch v-model="currentVisit.dataBase">
          <span slot="on" style="font-size:16px">ПБК</span>
          <span slot="off" style="font-size:16px">Тест</span>
        </vs-switch>
      </vs-tab>
      <vs-tab label="Заказ" v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
          Дата доставки
          <vc-date-picker
          v-model='currentVisit.deliveryDate'
          locale="ru"
          :min-date='new Date()'
          :masks="masks"/>
        <vs-collapse>
          <vs-collapse-item :key="index" v-for="(order, index) in currentVisit.orders">
            <div slot="header">
              {{ productByItem(order.productItem).name }} <br>
              <!-- {{ stringLineFromOrder(order) }} -->
            </div>
            <vs-button
              @click="order.order = order.recommend">Рекомендуемый заказ: {{ order.recommend }}
            </vs-button>
            <vs-input-number
              min="0"
              vs-size="medium"
              label="Заказ"
              v-model="order.order"></vs-input-number>
            <vs-input-number
              min="0"
              vs-size="medium"
              label="Остаток"
              v-model="order.balance"
              @input="updateRecomSales(index)"
            ></vs-input-number>

            <vs-list>
              <vs-list-header title="Предыдущие заказы"></vs-list-header>
              <vs-list-item
                v-for="(previousOrder, date) in previousOrders[order.productItem]"
                :key="previousOrder.id"
                :title="date">
                {{ stringLineFromOrder(previousOrder) }}
              </vs-list-item>
            </vs-list>
          </vs-collapse-item>
        </vs-collapse>

      </vs-tab>
      <vs-tab label="Чеклист">
        <!--    чек-лист для Драфт и Хорека-->

        <div v-if="clientByINN(currentVisit.clientINN).clientType === 'Хорека'
    || clientByINN(currentVisit.clientINN).clientType === 'Драфт'"
    style="margin-top:2mm;">
          <!-- BEGIN CHECKLIST Цены -->
          <vs-row>
            <vs-col vs-w="4">
              <b>Сорт пива</b>
            </vs-col>
            <vs-col vs-w="4">
              <b>Цена</b>
            </vs-col>
            <vs-col vs-w="4">
              <b>Остаток</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Цены' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="4">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="4">
              <vs-input class="compact-form" v-model="question.answer1"/>
            </vs-col>
            <vs-col vs-w="4">
              <vs-input class="compact-form" v-model="question.answer2"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Цены -->

        <!-- BEGIN CHECKLIST Кеги -->

          <vs-row style="margin-top:4mm;">
            <vs-col vs-w="6">
              <b>Вопросы</b>
            </vs-col>
            <vs-col vs-w="6">
              <b>Ответы</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Кеги' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="6">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="6">
              <vs-input class="compact-form" v-model="question.answer1"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Кеги -->

        </div>


        <!--    чек-лист для магазина-->
        <!-- BEGIN CHECKLIST Общий -->
        <div v-if="clientByINN(currentVisit.clientINN).clientType === 'Магазин'">
                  <vs-row style="margin-top:4mm;">
            <vs-col vs-w="7">
              <b>Мероприятие</b>
            </vs-col>
            <vs-col vs-w="2">

            </vs-col>
            <vs-col vs-w="3">
              <b>Примечание</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Общий' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="7">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="2">
              <vs-switch v-model="question.answer1"/>
            </vs-col>
            <vs-col vs-w="3">
              <vs-input class="compact-form" v-model="question.answer2"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Общий -->

        </div>
      </vs-tab>
      <vs-tab label="Фото">
        <vs-upload
          multiple
          single-upload
          fileName="image"
          :headers="authHeader"
          :action="photoUploadUrl"
          automatic
          :accept="['JPG','jpg']"
        />
      </vs-tab>
    </vs-tabs>


    <!--копки Отменить и Завершить-->
    <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
      <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="resetVisit">Отменить визит</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="finishVisit">Закончить визит</vs-button>
      </vs-col>
    </vs-row>

<!--    <vs-row class="fixed-row-bottom">-->
<!--      <vs-col>-->
<!--        <vs-button type="border" icon="business_center"></vs-button>-->
<!--        <vs-button icon="map"></vs-button>-->
<!--        <vs-button icon="location_on"></vs-button>-->
<!--        <vs-button icon="list_alt"></vs-button>-->
<!--        <vs-button icon="info"></vs-button>-->
<!--      </vs-col>-->
<!--    </vs-row>-->

  </div>
</template>

<script>
/* eslint-disable max-len */


import {
  VISIT_CLOSE_CURRENT,
  VISIT_GET_CURRENT, VISIT_GET_HISTORY_BY_INN,
  VISIT_SAVE_CURRENT_TO_VUEX,
} from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS, GOOD_BY_ITEM } from '@/store/actions/goods';
import {
  CHECKLIST_RESET_CURRENT,
  CHECKLIST_GET_CURRENT,
  CHECKLIST_SAVE_CURRENT, CHECKLIST_UPLOAD_CURRENT_TO_SERVER,
} from '@/store/actions/checklists';
import ClientPaymentHistory from '@/components/ClientPaymentHistory.vue';
import { HTTP } from '@/utils/http';

const mask = 'YYYY-MM-DD';

export default {
  name: 'VisitEditor',
  computed: {
    products() {
      return this.$schema.getters[ALL_GOODS];
    },
    previousVisits() {
      return this.$store.getters[VISIT_GET_HISTORY_BY_INN](this.currentVisit.clientINN);
    },
    photoUploadUrl() {
      return `${HTTP.defaults.baseURL}photos/${this.currentVisit.UUID}`;
    },
  },
  components: {
    ClientPaymentHistory,
  },
  data() {
    return {
      currentVisit: {},
      checklist: [],
      timer: '',
      previousOrders: {},
      veryLastVisitDate: '',
      selectedOrder: [],
      // previousVisits: [],
      authHeader: { Authorization: 'Token' },
      masks: {
        input: mask,
        data: mask,
        L: mask,
      },
    };
  },
  created() {
    this.currentVisit = JSON.parse(JSON.stringify(this.$store.getters[VISIT_GET_CURRENT]));
    this.checklist = JSON.parse(JSON.stringify(this.$store.getters[CHECKLIST_GET_CURRENT]));
    // this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, this.currentVisit.clientINN);
  },
  watch: {
    previousVisits() {
      this.preparePreviousOrders();
    },
  },
  mounted() {
    // this.previousVisits[0].orders.forEach((order) => {
    //   this.previousOrder[order.productItem] = order;
    // });
    // eslint-disable-next-line max-len
    // this.previousVisits = this.$store.getters[VISIT_GET_HISTORY_BY_INN](this.currentVisit.clientINN);
    const token = localStorage.getItem('user-token');
    this.authHeader.Authorization = `Token ${token}`;
    if (this.previousVisits !== undefined) {
      this.preparePreviousOrders();
    }
  },
  beforeDestroy() {
    this.saveCurrentVisitToVuex();
    this.saveCurrentChecklistToVuex();
  },
  methods:
    {
      saveCurrentVisitToVuex() {
        this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
      },
      saveCurrentChecklistToVuex() {
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, this.checklist);
      },
      resetVisit() {
        this.checklist = [];
        this.$store.dispatch(CHECKLIST_RESET_CURRENT);
        this.currentVisit = {};
        this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
      },
      finishVisit() {
        this.currentVisit.date = new Date().toISOString().slice(0, 10);
        this.formatDeliveryDate();
        this.saveCurrentVisitToVuex();
        this.$store.dispatch(VISIT_CLOSE_CURRENT);
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, this.checklist);
        this.$store.dispatch(CHECKLIST_UPLOAD_CURRENT_TO_SERVER);
        this.$store.dispatch(CHECKLIST_RESET_CURRENT);
        this.checklist = [];
        this.$router.push('/route');
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
      productByItem(productItem) {
        return this.$store.getters[GOOD_BY_ITEM](productItem);
      },
      stringLineFromOrder(order) {
        return `Заказ: ${order.order} Доставлено: ${order.delivered} Остаток: ${order.balance} Продажи: ${order.sales}`;
      },
      updateRecomSales(orderIndex) {
        const { productItem } = this.currentVisit.orders[orderIndex];
        const prevBalance = this.previousOrders[productItem][this.veryLastVisitDate].balance;
        const prevDelivery = this.previousOrders[productItem][this.veryLastVisitDate].delivered;
        // eslint-disable-next-line max-len
        this.currentVisit.orders[orderIndex].sales = prevBalance + prevDelivery - this.currentVisit.orders[orderIndex].balance;
        this.currentVisit.orders[orderIndex].recommend = this.currentVisit.orders[orderIndex].sales;
      },
      preparePreviousOrders() {
        this.previousOrders = {};
        this.previousVisits.forEach((visit) => {
          visit.orders.forEach((order) => {
            this.previousOrders[order.productItem] = this.previousOrders[order.productItem] || {};
            /* this.previousOrders[order.productItem].push(order); */
            this.previousOrders[order.productItem][visit.date] = order;
            this.veryLastVisitDate = visit.date;
          });
        });
      },
      formatDeliveryDate() {
        if ((this.currentVisit.deliveryDate || null) !== null) {
          this.currentVisit.deliveryDate = new Date(this.currentVisit.deliveryDate).toISOString().substring(0, 10);
        }
      },
    },
};
</script>

<style scoped>
  .fixed-row-bottom { position: fixed; bottom: 0; z-index: 999;}
  .button.vs-tabs--btn {font-size: 20px}
  .compact-form { max-width: 90%;}
</style>
