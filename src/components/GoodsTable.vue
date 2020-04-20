<template>
  <div>
    <h1>Товары</h1>
    <table align="center" border="1px solid grey">
      <tr align="left"><th>Артикул</th><th>Название</th><th>Описание</th><th>Цены</th></tr>
      <tr v-for="item in goods" v-bind:key="item.id" align="left">
        <td>{{ item.item }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>
          <li v-for="(price, index) in item.price" v-bind:key="price.id">
            {{index}}: {{ price }}
          </li>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

import { GOODS_REQUEST } from '@/store/actions/goods';

export default {
  name: 'GoodsTable',
  computed: {
    goods() {
      return this.$store.getters.GOODS;
    },
  },
  mounted() { this.$store.dispatch(GOODS_REQUEST); },
};
</script>

<style scoped>

</style>
