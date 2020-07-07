<template lang="html">

<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
      <h4>Сводная</h4>
    </vs-col>
  </vs-row>

  <h2>Сводка по визитам</h2>
  <h2>Сводка по заказам</h2>
  <h2>Сводка по задачам</h2>


</div>

</template>

<script>
// import Sidebar from '@/components/Sidebar.vue';
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';


export default {
  components: {

  },
  name: 'Home',
  metaInfo: {
    title: 'МПР | Домашняя страница',
  },
  computed: {
  },
  data() {
    return {
    };
  },
  created() {
    this.$router.push('route');
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style lang="stylus">
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

</style>
