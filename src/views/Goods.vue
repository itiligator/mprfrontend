<template lang="html">

<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="2" vs-lg="2">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="9">
      <h2>Товары</h2>
    </vs-col>
  </vs-row>

  <!-- Табличка товаров -->
  <vs-row style="margin-top:2mm;">
    <vs-col vs-w='3'>
      <b>Товар</b>
    </vs-col>
    <vs-col vs-w='3'>
      <b>Цены</b>
    </vs-col>
    <vs-col vs-w='6'>
      <b>Описание</b>
    </vs-col>
  </vs-row>

  <vs-row v-for="good in goods" v-bind:key="good.item" style="margin-top:2mm;">
    <vs-col vs-w='3'>
      {{ good.name }}
      <br/>
      арт. {{ good.item }}
    </vs-col>
    <vs-col vs-w='3'>
    </vs-col>
    <vs-col vs-w='6'>
      {{ good.description }}
    </vs-col>
  </vs-row>

</div>

</template>

<script>

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import { ALL_GOODS } from '@/store/actions/goods';


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
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style>

</style>
