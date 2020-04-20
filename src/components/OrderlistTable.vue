<template>
  <div>
    <ShowOrderTable v-bind:currentorder="currentorder"></ShowOrderTable>
    <h1>Текущие заказы</h1>
    <table align="center" border="1px solid grey">
      <tr align="left"><th>Клиент</th><th>Дата создания</th><th>Дата поставки</th><th></th></tr>
      <tr v-for="order in orderlist" v-bind:key="order.order_pk" align="left">
        <td>{{ order.client_name }}</td>
        <td>{{ order.creation_date }}</td>
        <td>{{ order.delivery_date }}</td>
        <td>
<!--  <router-link v-bind:to="'/order/' + order.order_pk" tag="button">Изменить</router-link>-->
          <button v-on:click="reloadcurrentorder($event, order.order_pk)">Изменить</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>


// eslint-disable-next-line no-unused-vars
import { ORDERLIST_REQUEST, ORDER_REQUEST } from '@/store/actions/order';
import ShowOrderTable from '@/components/ShowOrderTable.vue';

export default {
  name: 'OrderlistTable',
  components: { ShowOrderTable },
  data() {
    return {
      currentorder: { },
    };
  },
  computed: {
    orderlist() {
      return this.$store.getters.ORDERLIST;
    },
  },
  mounted() { this.$store.dispatch(ORDERLIST_REQUEST); },
  methods: {
    reloadcurrentorder(event, pk) {
      this.$store.dispatch(ORDER_REQUEST, pk)
        .then(() => { this.currentorder = this.$store.getters.GETORDERBYPK(pk); });
      // eslint-disable-next-line no-empty
      // this.$store.getters.GETORDERBYPK(pk);
      // this.currentorder = this.$store.getters.GETORDERBYPK(pk);
      // alert(this.currentorder);
    },
  },
};
</script>

<style scoped>

</style>
