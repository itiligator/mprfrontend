<template lang="html">

<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="2" vs-lg="2">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="9">
      <h2>Клиенты</h2>
    </vs-col>
  </vs-row>

  <!-- Табличка клиентов -->
  <vs-row style="margin-top:2mm;">
    <vs-col vs-w='4'>
      <b>Клиент</b>
    </vs-col>
    <vs-col vs-w='3'>
      <b>Отсрочка/Лимит</b>
    </vs-col>
    <vs-col vs-w='5'>
      <b>Контакты</b>
    </vs-col>
  </vs-row>

  <vs-row v-for="client in clients" v-bind:key="client.inn" style="margin-top:2mm;">
    <vs-col vs-w='4'>
      {{client.name}}
      <br/>
      {{client.clientType}}
    </vs-col>
    <vs-col vs-w='3'>
      {{ client.delay }} дней
      <br/>
      {{ client.limit }} руб.
    </vs-col>
    <vs-col vs-w='5'>
      <a :href="'tel:'+client.phone">
        {{ client.phone }}
      </a>
      <br/>
      <a :href="'mailto:'+client.email">{{ client.email }}</a>
      <br/>
      {{ client.address }}
    </vs-col>
  </vs-row>

</div>

</template>

<script>

import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import { GETALLCLIENTS } from '@/store/actions/clients';


export default {
  components: {

  },
  name: 'Clietns',
  metaInfo: {
    title: 'МПР | Клиенты',
  },
  computed: {
    clients() {
      return this.$store.getters[GETALLCLIENTS].filter((c) => c.clientType !== 'Магазин').sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
    },
    shops() {
      return this.$store.getters[GETALLCLIENTS].filter((c) => c.clientType === 'Магазин');
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
