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
      <vs-input type="number" label-placeholder="Сумма оплаты" v-model.number="currentPayment"/>

    </vs-card>

    <vs-card>
      <div slot="header">
        <h2>
          Заказ
        </h2>
      </div>

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


    <vs-button>Окончить визит</vs-button>
    <br>
    <br>
    <vs-button @click="resetVisit">Отменить визит</vs-button>
    <br> {{ currentPayment }}
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
  data() {
    return {
      currentPayment: undefined,
    };
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
