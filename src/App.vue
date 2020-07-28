<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>


<script>
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap-vue/dist/bootstrap-vue.css';

import Sidebar from '@/components/Sidebar.vue';
import { VISIT_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/visits';
import { CLIENTS_REQUEST } from '@/store/actions/clients';
import { GOODS_REQUEST } from '@/store/actions/goods';
import { CHECKLISTS_REQUEST } from '@/store/actions/checklists';
import { PRICES_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/prices';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(VISIT_DOWNLOAD_ALL_FROM_SERVER);
      this.$store.dispatch(CLIENTS_REQUEST);
      this.$store.dispatch(GOODS_REQUEST);
      this.$store.dispatch(CHECKLISTS_REQUEST);
      this.$store.dispatch(PRICES_DOWNLOAD_ALL_FROM_SERVER);
    }
  },
  metaInfo: {
    title: 'МПР | Рогозец',
    htmlAttrs: {
      lang: 'ru',
      amp: true,
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no' },
    ],
  },
};
</script>

<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav {*/
/*  padding: 30px;*/
/*}*/

/*#nav a {*/
/*  font-weight: bold;*/
/*  color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*  color: #42b983;*/
/*}*/
</style>
