<template>
  <div v-if="!!currentVisit.UUID">

<!--    заголовок страницы-->
    <h1>Визит: {{ clientByINN(currentVisit.clientINN).name }}</h1>
    <br>

<!--    панелька оплаты для Драфт и Хорека-->
    <vs-card v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
      <div slot="header">
        <h2>
          Оплата
        </h2>
      </div>
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

    </vs-card>

<!--    заказ в виде таблицы-->
<!--    <vs-card v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">-->
<!--      <div slot="header">-->
<!--        <h2>-->
<!--          Заказ-->
<!--        </h2>-->
<!--      </div>-->

<!--      <vs-table :data="currentVisit.orders" v-model="selectedOrder">-->
<!--        <template slot="thead">-->
<!--        <vs-th>-->
<!--          Товар-->
<!--        </vs-th>-->
<!--        <vs-th>-->
<!--          Заказ-->
<!--        </vs-th>-->
<!--        <vs-th>-->
<!--          Остаток-->
<!--        </vs-th>-->
<!--        <vs-th>-->
<!--          Продажи-->
<!--        </vs-th>-->
<!--        </template>-->

<!--        <template slot-scope="{data}">-->
<!--        <vs-tr :key="product.productItem" :data="product" v-for="(product, index) in data" >-->
<!--          <vs-td :data="data[index].productItem">-->
<!--            {{ productByItem(data[index].productItem).name }}-->
<!--          </vs-td>-->
<!--          <vs-td :data="data[index].order">-->
<!--            <vs-input-number v-model="data[index].order"/>-->
<!--            реком. {{ data[index].recommend }}-->
<!--          </vs-td>-->
<!--          <vs-td :data="data[index].balance">-->
<!--            <vs-input-number v-model="data[index].balance"/>-->
<!--            <br>-->
<!--          </vs-td>-->
<!--          <vs-td :data="data[index].sales">-->
<!--            {{ data[index].sales }}-->
<!--            <br>-->
<!--          </vs-td>-->
<!--        </vs-tr>-->
<!--        </template>-->
<!--      </vs-table>-->

<!--    </vs-card>-->


<!--    заказ в виде списка-->
        <vs-card v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
          <div slot="header">
            <h2>
              Заказ
            </h2>
          </div>
  <vs-collapse>
    <vs-collapse-item :key="index" v-for="(order, index) in currentVisit.orders">
      <div slot="header">
        {{ productByItem(order.productItem).name }} <br>
        {{ stringLineFromOrder(order) }}
      </div>
      <vs-button
        @click="order.order = order.recommend">Рекомендуемый заказ: {{ order.recommend }}
      </vs-button>
      <vs-input-number
        min="0"
        vs-size="medium"
        label="Текущий заказ"
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
          v-for="(previousOrder, i) in previousOrders[order.productItem]"
          :key="i"
          :title="stringLineFromOrder(previousOrder)">
        </vs-list-item>
      </vs-list>
    </vs-collapse-item>
  </vs-collapse>

  </vs-card>

<!--    чек-лист для Драфт и Хорека-->
    <vs-card v-if="clientByINN(currentVisit.clientINN).clientType === 'Хорека'
    || clientByINN(currentVisit.clientINN).clientType === 'Драфт'">
      <div slot="header">
        <h2>
          Чек-лист
        </h2>
      </div>
      <vs-row>
        <vs-col vs-w="12">
      <vs-table stripe :hoverFlat="true"
                :data="checklist.filter((q) => q.section === 'Цены' )"
                noDataText="Вопросы в чеклисте отсутствуют">
        <template slot="thead">
        <vs-th>
          Сорт пива
        </vs-th>
        <vs-th>
          Цена
        </vs-th>
        <vs-th>
          Остаток
        </vs-th>
        </template>

        <template slot-scope="{data}">
        <vs-tr :key="question.UUID" v-for="(question, index) in data" >

          <vs-td :data="question.text">
            {{ question.text }}
          </vs-td>

          <vs-td :data="data[index].answer1">
            <vs-input v-model="data[index].answer1"/>
          </vs-td>

          <vs-td :data="data[index].answer2">
            <vs-input v-model="data[index].answer2"/>
          </vs-td>

        </vs-tr>
        </template>

      </vs-table>
      <vs-table stripe :hoverFlat="true"
                :data="checklist.filter((q) => q.section === 'Кеги' )"
                noDataText="Вопросы в чеклисте отсутствуют">
        <template slot="thead">
        <vs-th>
          Вопросы
        </vs-th>
        <vs-th>
          Ответы
        </vs-th>
        </template>

        <template slot-scope="{data}">
        <vs-tr :key="question.UUID" v-for="(question, index) in data" >

          <vs-td :data="question.text">
            {{ question.text }}
          </vs-td>

          <vs-td :data="data[index].answer1">
            <vs-input v-model="data[index].answer1"/>
          </vs-td>

        </vs-tr>
        </template>

      </vs-table>
        </vs-col>
      </vs-row>
    </vs-card>

<!--    чек-лист для магазина-->
    <vs-card v-if="clientByINN(currentVisit.clientINN).clientType === 'Магазин'">
      <div slot="header">
        <h2>
          Чек-лист
        </h2>
      </div>
      <vs-row>
        <vs-col vs-w="12">
          <vs-table stripe :hoverFlat="true"
                    :data="checklist.filter((q) => q.section === 'Общий' )"
                    noDataText="Вопросы в чеклисте отсутствуют">
            <template slot="thead">
            <vs-th>
              Мероприятия
            </vs-th>
            <vs-th>
              Отметка провер.
            </vs-th>
            <vs-th>
              Примечание
            </vs-th>
            </template>

            <template slot-scope="{data}">
            <vs-tr :key="question.UUID" v-for="(question, index) in data" >

              <vs-td :data="question.text">
                {{ question.text }}
              </vs-td>

              <vs-td :data="data[index].answer1">
                <vs-switch v-model="data[index].answer1"></vs-switch>
              </vs-td>

              <vs-td :data="data[index].answer2">
                <vs-input v-model="data[index].answer2"/>
              </vs-td>

            </vs-tr>
            </template>

          </vs-table>
        </vs-col>
      </vs-row>
    </vs-card>

    <!--загрузка фотографий-->
    <vs-card>
      <div slot="header">
        <h2>
          Загрузить фото
        </h2>
      </div>
      <vs-upload/>
    </vs-card>


    <br>
    {{ previousOrders }}
    <br>


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


import {
  VISIT_CLOSE_CURRENT, VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER,
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

export default {
  name: 'VisitEditor',
  computed: {
    products() {
      return this.$schema.getters[ALL_GOODS];
    },
    previousVisits() {
      return this.$store.getters[VISIT_GET_HISTORY_BY_INN](this.currentVisit.clientINN);
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
      selectedOrder: [],
    };
  },
  created() {
    this.currentVisit = JSON.parse(JSON.stringify(this.$store.getters[VISIT_GET_CURRENT]));
    this.checklist = JSON.parse(JSON.stringify(this.$store.getters[CHECKLIST_GET_CURRENT]));
    this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, this.currentVisit.clientINN);
  },
  mounted() {
    // this.previousVisits[0].orders.forEach((order) => {
    //   this.previousOrder[order.productItem] = order;
    // });
    while (this.previousVisits === undefined) { console.log('waiting'); }
    this.previousVisits.forEach((visit) => {
      visit.orders.forEach((order) => {
        this.previousOrders[order.productItem] = this.previousOrders[order.productItem] || [];
        this.previousOrders[order.productItem].push(order);
      });
    });
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
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, this.checklist);
        this.$store.dispatch(CHECKLIST_UPLOAD_CURRENT_TO_SERVER);
        // this.currentVisit.status = 2;
        // this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
        // this.$store.dispatch(VISIT_UPLOAD_CURRENT_TO_SERVER);
        // this.$store.dispatch(VISIT_PUSH_CURRENT_TO_ALL);
        this.$store.dispatch(VISIT_CLOSE_CURRENT);
        this.checklist = [];
        this.$store.dispatch(CHECKLIST_RESET_CURRENT);
        // this.currentVisit = {};
        // this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
        this.$router.push('/route');
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
      productByItem(productItem) {
        return this.$store.getters[GOOD_BY_ITEM](productItem);
      },
      stringLineFromOrder(order) {
        return `Заказ: ${order.order} Остаток: ${order.balance} Продажи: ${order.sales}`;
      },
      updateRecomSales(orderIndex) {
        const { productItem } = this.currentVisit.orders[orderIndex];
        const prevBalance = this.previousOrders[productItem][0].balance;
        const prevDelivery = this.previousOrders[productItem][0].delivered;
        // eslint-disable-next-line max-len
        this.currentVisit.orders[orderIndex].sales = prevBalance + prevDelivery - this.currentVisit.orders[orderIndex].balance;
        this.currentVisit.orders[orderIndex].recommend = this.currentVisit.orders[orderIndex].sales;
      },
    },
};
</script>

<style scoped>
  .fixed-row-bottom { position: fixed; bottom: 0; z-index: 999;}
</style>
