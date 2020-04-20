<template>
  <div>
    <h1>Изменить или создать заказ</h1>
    <button v-on:click="resetinitial()" v-bind:disabled="currentorder.processed">Очистить</button>
    <button v-on:click="sendorder()" v-bind:disabled="currentorder.processed">Отправить</button>
    <br>
    <select v-model="selectedclient" v-bind:disabled="currentorder.processed">
      <option disabled value="-1">Клиент</option>
      <option v-for="client in clients_list" v-bind:value="client.pk" v-bind:key="client.pk">
        {{ client.name }}
      </option>
    </select>
    <br>
    <table align="center" border="1px solid grey">
      <tr align="left"><th>Товар</th><th>Количество</th></tr>
      <tr v-for="item in selecteditems" v-bind:key="item.item" align="left">
        <td>{{ item.name }}</td>
        <td>
          <select
            v-model="selecteditems[item.item].quantity"
            v-bind:gitem="selecteditems[item.item].item"
            @change="onQChange($event)"
            v-bind:disabled="currentorder.processed"
          >
            <option v-for="q in orderquantityrange" v-bind:value="q" v-bind:key="q">
              {{ q }}
            </option>
          </select>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { CLIENTS_REQUEST } from '@/store/actions/clients';
import { GOODS_REQUEST } from '@/store/actions/goods';
import { HTTP } from '@/utils/http';
import { ORDERLIST_REQUEST } from '@/store/actions/order';

export default {
  name: 'ShowOrderTable',
  props: ['currentorder'],
  data() {
    return {
      // pk: this.$route.params.pk,
      selectedclient: -1,
      selecteditems: {},
      selectedtorderpk: -1,
      // eslint-disable-next-line max-len
      orderquantityrange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    };
  },
  computed: {
    clients_list() {
      return this.$store.getters.CLIENTS;
    },
    goods_list() {
      return this.$store.getters.GOODS;
    },
  },
  mounted() {
    // const { pk } = this;
    this.$store.dispatch(CLIENTS_REQUEST)
      .then(() => { this.resetinitial(); });
    this.$store.dispatch(GOODS_REQUEST)
      .then(() => { this.resetinitial(); });
  },
  watch: {
    currentorder(newVal) {
      this.selectedclient = newVal.client_pk;
      this.selectedtorderpk = newVal.order_pk;
      this.currentorder.orderitems.forEach((item) => {
        this.selecteditems[item.item] = {
          item: item.item,
          name: item.name,
          quantity: item.quantity,
        };
      });
    },
  },
  methods: {
    resetinitial() {
      this.selectedclient = -1;
      this.selectedtorderpk = -1;
      this.goods_list.forEach((item) => {
        this.selecteditems[item.item] = {
          item: item.item,
          name: item.name,
          quantity: 0,
        };
      });
    },
    onQChange(event) {
      // eslint-disable-next-line radix,max-len
      this.selecteditems[event.target.attributes.gitem.value].quantity = parseInt(event.target.value);
      this.$forceUpdate();
    },
    sendorder() {
      const data = {
        order_pk: this.selectedtorderpk,
        client_pk: this.selectedclient,
        orderitems: this.selecteditems,
      };
      HTTP.put('api/putorder', data);
      this.$store.dispatch(ORDERLIST_REQUEST);
      this.resetinitial();
    },
  },
};
</script>

<style scoped>

</style>
