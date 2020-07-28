<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="2" vs-lg="2">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-w="9">
      <h2>Визит: {{visitingClientName}}</h2>
    </vs-col>
  </vs-row>
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-w="12">
      <VisitEditor v-if='isCurrentVisit'></VisitEditor>
      <VisitCreatePanel v-else></VisitCreatePanel>
    </vs-col>
  </vs-row>


</div>
</template>

<script>
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import VisitEditor from '@/components/VisitEditor.vue';
import VisitCreatePanel from '@/components/VisitCreatePanel.vue';
import { VISIT_IS_CURRENT, VISIT_GET_CURRENT } from '@/store/actions/visits';
import { GETCLIENTBYINN, CLIENTS_REQUEST } from '@/store/actions/clients';
import { PRICES_DOWNLOAD_ALL_FROM_SERVER } from '@/store/actions/prices';
import { GOODS_REQUEST } from '@/store/actions/goods';
import { CHECKLISTS_REQUEST } from '@/store/actions/checklists';

export default {
  name: 'Visit',
  metaInfo: {
    title: 'МПР | Визит',
  },
  components: {
    VisitEditor,
    VisitCreatePanel,
  },
  mounted() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(CLIENTS_REQUEST);
      this.$store.dispatch(GOODS_REQUEST);
      this.$store.dispatch(CHECKLISTS_REQUEST);
      this.$store.dispatch(PRICES_DOWNLOAD_ALL_FROM_SERVER);
    }
  },
  computed: {
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
    visitingClientName() {
      if (this.isCurrentVisit) {
        const cV = this.$store.getters[VISIT_GET_CURRENT];
        return this.clientByINN(cV.clientINN);
      }
      return '';
    },
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn).name;
      },
    },
};
</script>

<style scoped lang="stylus">
</style>
