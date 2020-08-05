<template>
<div>
  <vs-list>
    <vs-list-header title="Предыдущие оплаты"></vs-list-header>
    <vs-list-item
      v-for="visit in filteredVisitsPayment"
      :key="visit.UUID"
      :title="visit.payment + ' руб. ' + visit.date">
    </vs-list-item>
  </vs-list>
</div>
</template>

<script>
import { VISIT_GET_HISTORY_BY_INN } from '@/store/actions/visits';

export default {
  name: 'ClientPaymentHistory',
  props: ['clientinn'],
  computed: {
    visits() {
      return this.$store.getters[VISIT_GET_HISTORY_BY_INN](this.clientinn);
    },
    filteredVisitsPayment() {
      return this.visits.map((v) => {
        let p = 'Оплата отсутствует';
        if (v.payment !== undefined) {
          p = v.payment;
        }
        return { UUID: v.UUID, date: v.date, payment: p };
      });
    },
  },
  mounted() {
    // if (this.visits === 'undefined ') {
    //   this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, this.clientinn);
    // }
  },
};
</script>

<style scoped>

</style>
