<template>
  <div>
    <h1>Клиенты</h1>
    <table align="center" border="1px solid grey">
      <tr align="left"><th>Клиент</th><th>Менеджер</th><th>Тип клиента</th><th>Тип цен</th></tr>
      <tr v-for="client in clients" v-bind:key="client.id" align="left">
        <td>{{ client.name }}</td>
        <td>{{ client.manager }}</td>
        <td>{{ client.client_type }}</td>
        <td>{{ client.price_type }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { CLIENTS_REQUEST, GETALLCLIENTS } from '@/store/actions/clients';

export default {
  name: 'ClientsTable',
  computed: {
    clients() {
      return this.$store.getters[GETALLCLIENTS];
    },
  },
  mounted() {
    this.$store.dispatch(CLIENTS_REQUEST);
  },
};
</script>

<style scoped>

</style>
