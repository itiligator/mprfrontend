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
        <vs-tr :key="product.item" v-for="(product, index) in data" >
          <vs-td :data="data[index].item">
            {{ productByItem(data[index].item).name }}
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
    </vs-card>

    {{ clientByINN(currentVisit.clientINN) }}
    {{ currentVisit }}


    <br>
    <br>

    <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
      <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
        <vs-button @click="resetVisit">Отменить визит</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
        <vs-button>Окончить визит</vs-button>
      </vs-col>
    </vs-row>

  </div>
</template>

<script>


import { VISIT_SAVE_CURENT_TOVUEX, VISIT_GET_CURRENT } from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS, GOOD_BY_ITEM, GOODS_REQUEST } from '@/store/actions/goods';

export default {
  name: 'VisitEditor',
  computed: {
    currentVisit: {
      get() {
        console.log('before get perform getter');
        return this.$store.getters[VISIT_GET_CURRENT];
      },
      set(newValue) {
        console.log('before setter perform action');
        console.log(newValue);
        this.$store.dispatch(VISIT_SAVE_CURENT_TOVUEX, newValue);
        console.log('after setter perform action');
      },
    },
    products() {
      return this.$schema.getters[ALL_GOODS];
    },
  },
  data() {
    return {
      currentPayment: undefined,
    };
  },
  mounted() {
    this.$store.dispatch(GOODS_REQUEST);
  },
  methods:
    {
      resetVisit() {
        this.$store.dispatch(VISIT_SAVE_CURENT_TOVUEX, {});
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
      productByItem(item) {
        return this.$store.getters[GOOD_BY_ITEM](item);
      },
    },
};
</script>

<style scoped>

</style>
