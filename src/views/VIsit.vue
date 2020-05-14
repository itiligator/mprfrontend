<template>
<div>
  <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
    <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="6" vs-lg="6">
      <vs-button @click="toggleSidebar" icon="view_headline"></vs-button>
    </vs-col>
    <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="6" vs-lg="6">
    </vs-col>
  </vs-row>
  <vs-row vs-type="flex" vs-justify="center" vs-align="center">
    <vs-col vs-w="11">
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
import { VISIT_IS_CURRENT } from '@/store/actions/visits';

export default {
  name: 'Visit',
  components: {
    VisitEditor,
    VisitCreatePanel,
  },
  computed: {
    isCurrentVisit() {
      return this.$store.getters[VISIT_IS_CURRENT];
    },
  },
  methods:
    {
      toggleSidebar() {
        this.$store.dispatch(TOGGLE_SIDEBAR);
      },
    },
};
</script>

<style scoped lang="stylus">
</style>
