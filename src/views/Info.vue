<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <GoodsTable></GoodsTable>
      </b-col>
    </b-row>>
        <b-row>
          <ClientsTable></ClientsTable>

        </b-row>

  </b-container>
</template>

<script>
import GoodsTable from '@/components/GoodsTable.vue';
import ClientsTable from '@/components/ClientsTable.vue';

export default {
  name: 'Info',
  components: { GoodsTable, ClientsTable },
};
</script>

<style scoped>

</style>
