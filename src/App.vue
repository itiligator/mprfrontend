<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { USER_REQUEST } from '@/store/actions/user';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  mounted() {
    this.$store.dispatch(USER_REQUEST);
  },
};
</script>
