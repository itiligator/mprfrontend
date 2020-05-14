<template>
  <div>
    <h1>Визит: {{ clientByINN(currentVisit.clientINN).name }}</h1>
    <br>
    <vs-card>
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
      <vs-button>Посмотреть расчеты</vs-button>

    </vs-card>

    <vs-card>
      <div slot="header">
        <h2>
          Заказ
        </h2>
      </div>

      <vs-table stripe :hoverFlat="true" :data="currentVisit.orders">
        <template slot="thead">
        <vs-th>
          Товар
        </vs-th>
        <vs-th>
          Заказ
        </vs-th>
        <vs-th>
          Остаток
        </vs-th>
        <vs-th>
          Продажи
        </vs-th>
        </template>

        <template slot-scope="{data}">
        <vs-tr :key="product.productItem" v-for="(product, index) in data" >
          <vs-td :data="data[index].productItem">
            {{ productByItem(data[index].productItem).name }}
          </vs-td>
          <vs-td :data="data[index].order">
            <vs-input-number v-model="data[index].order"/>
            реком. {{ data[index].recommend }}
          </vs-td>


          <vs-td :data="data[index].balance">
            <vs-input-number v-model="data[index].balance"/>
            <br>
          </vs-td>

          <vs-td :data="data[index].sales">
            <vs-input-number v-model="data[index].sales"/>
            <br>
          </vs-td>
        </vs-tr>
        </template>
      </vs-table>

    </vs-card>

    <vs-card>
      <div slot="header">
        <h2>
          Чек-лист
        </h2>
      </div>
      <vs-table stripe :hoverFlat="true" noDataText="">
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
        <vs-tr>
          <vs-td>Цена на СС за 0.5</vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
        </vs-tr>
        <vs-tr>
          <vs-td>Цена на СТ 0.5</vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
        </vs-tr>
        <vs-tr>
          <vs-td>Цена на СП за 0.5</vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
        </vs-tr>
        <vs-tr>
          <vs-td>Цена на ХБ за 0.5</vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
          <vs-td><vs-input size="small" type="number"></vs-input> </vs-td>
        </vs-tr>

      </vs-table>
    </vs-card>

    <vs-card>
      <div slot="header">
        <h2>
          Загрузить фото
        </h2>
      </div>
      <vs-upload/>
    </vs-card>


    <br>
    <br>

    <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
      <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="resetVisit">Отменить визит</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="saveCurrentVisitToVuex">Сохранить и отправить</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button>Закончить визит</vs-button>
      </vs-col>
    </vs-row>

  </div>
</template>

<script>


import { VISIT_GET_CURRENT, VISIT_SAVE_CURRENT_TOVUEX } from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS, GOOD_BY_ITEM, GOODS_REQUEST } from '@/store/actions/goods';

export default {
  name: 'VisitEditor',
  computed: {
    products() {
      return this.$schema.getters[ALL_GOODS];
    },
  },
  data() {
    return {
      currentVisit: {},
      timer: '',
    };
  },
  created() {
    this.$store.dispatch(GOODS_REQUEST);
    this.currentVisit = JSON.parse(JSON.stringify(this.$store.getters[VISIT_GET_CURRENT]));
  },
  mounted() {
    // this.timer = setInterval(this.saveCurrentVisitToVuex, 10000);
  },
  methods:
    {
      saveCurrentVisitToVuex() {
        this.$store.dispatch(VISIT_SAVE_CURRENT_TOVUEX, this.currentVisit);
        this.currentVisit = JSON.parse(JSON.stringify(this.$store.getters[VISIT_GET_CURRENT]));
      },
      resetVisit() {
        // clearInterval(this.timer);
        this.currentVisit.status = 0;
        this.$store.dispatch(VISIT_SAVE_CURRENT_TOVUEX, this.currentVisit);
        this.currentVisit = {};
        this.$store.dispatch(VISIT_SAVE_CURRENT_TOVUEX, this.currentVisit);
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
      productByItem(productItem) {
        return this.$store.getters[GOOD_BY_ITEM](productItem);
      },
    },
};
</script>

<style scoped>

</style>
