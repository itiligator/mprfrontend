<template>
<vs-sidebar
  default-index="1"
  color="primary"
  class="sidebarx"
  spacer
  v-model="sidebar_status"
>

  <div class="header-sidebar" slot="header">
    <vs-avatar  size="70px" src="https://randomuser.me/api/portraits/men/85.jpg"/>

    <h4>
      {{ this.$store.getters.userFullName }}
<!--      <vs-button color="primary" icon="more_horiz" type="flat"></vs-button>-->
    </h4>

  </div>

  <vs-sidebar-item index="1" icon="business_center" to="/">
    Сводка
  </vs-sidebar-item>

  <vs-sidebar-item index="2" icon="map" to="/route">
    Маршрут
  </vs-sidebar-item>

  <vs-sidebar-item index="3" icon="location_on" to="/visit">
    Визит
  </vs-sidebar-item>

  <vs-sidebar-item index="4" icon="list_alt" to="/task">
    Задачи
  </vs-sidebar-item>

  <vs-divider icon="info" position="left">
    Информация
  </vs-divider>

  <vs-sidebar-item index="5" icon="perm_identity">
    Клиенты
  </vs-sidebar-item>
  <vs-sidebar-item index="6" icon="shopping_cart">
    Продукция
  </vs-sidebar-item>
  <vs-sidebar-item index="7" icon="grade">
    Промо
  </vs-sidebar-item>

    <vs-divider icon="bug_report" position="left">
    Отладка
  </vs-divider>

  <vs-sidebar-item index="8" icon="autorenew" @click="resetvisits">
    Сбросить визиты
  </vs-sidebar-item>
<!--  <vs-sidebar-item index="6" icon="all_inbox" to="/datatest">-->
<!--    Посмотреть все данные-->
<!--  </vs-sidebar-item>-->


  <div class="footer-sidebar" slot="footer">
    <vs-button icon="reply" color="danger" type="border" to="/logout">Выйти из системы</vs-button>
    <vs-button icon="close" color="primary" type="border" @click="sidebar_status=false">
      Закрыть</vs-button>
  </div>

</vs-sidebar>

</template>

<script>
// eslint-disable-next-line no-unused-vars
import { TOGGLE_SIDEBAR } from '@/store/actions/UI';
import { USER_REQUEST } from '@/store/actions/user';
import { HTTP } from '@/utils/http';
import { VISIT_DOWNLOAD_ALL_FROM_SERVER, VISIT_FLASH_ALL } from '@/store/actions/visits';

export default {
  name: 'Sidebar',
  props: [],
  methods:
    {
      resetvisits() {
        HTTP.get('/resetvisits');
        this.$store.commit(VISIT_FLASH_ALL);
        this.$store.dispatch(VISIT_DOWNLOAD_ALL_FROM_SERVER);
      },
    },
  computed: {
    sidebar_status: {
      get() { return (this.$store.getters.SIDEBAR); },
      set() { this.$store.commit(TOGGLE_SIDEBAR); },
    },
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  },
};
</script>

<style lang="stylus">
  /*https://bit.dev/lusaxweb/vuesax/vs-icon*/
  @import url("https://fonts.googleapis.com/icon?family=Material+Icons");


</style>
