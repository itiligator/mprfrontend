<template lang="html">

<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="2" vs-lg="2">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="9">
      <h3 style="margin:0px;">Товары</h3>
    </vs-col>
  </vs-row>

  <vs-switch v-model="database" style="margin:2mm;">
    <span slot="on" style="font-size:16px">ПБК</span>
    <span slot="off" style="font-size:16px">Тест</span>
  </vs-switch>
  <!-- Табличка товаров -->
  <vs-row style="margin-top:2mm;">
    <vs-col vs-w='3'>
      <b>Товар</b>
    </vs-col>
    <vs-col vs-w='9'>
      <b>Описание</b>
    </vs-col>
  </vs-row>

  <vs-row v-for="good in goods" v-bind:key="good.item" style="margin-top:2mm;">
    <vs-col vs-w='3'>
      <b>{{ good.name }}</b>
      <br/>
      арт. {{ good.item }}
    </vs-col>
    <vs-col vs-w='9'>
      {{ good.description }}
      <ul>
        <li v-for="price in prices[good.item]"
          v-bind:key="price.id">
          <div v-if="price.dataBase === database">
            {{ price.priceType }}: {{ price.amount }}
          </div>
        </li>
      </ul>
    </vs-col>
  </vs-row>
</div>

</template>

<script>

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import { ALL_GOODS } from '@/store/actions/goods';
import { PRICES_GET_ALL, PRICES_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/prices';


export default {
  components: {

  },
  name: 'Goods',
  metaInfo: {
    title: 'МПР | Товары',
  },
  computed: {
    goods() {
      return this.$store.getters[ALL_GOODS];
    },
    prices() {
      return this.$store.getters[PRICES_GET_ALL];
    },
  },
  data() {
    return {
      database: true,
    };
  },
  created() {
  },
  mounted() {
    this.$store.dispatch(PRICES_DOWNLOAD_ALL_FROM_SERVER);
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
      priceByItem(productItem) {
        return this.prices[productItem];
      },
    },
};
</script>

<style>

</style>
