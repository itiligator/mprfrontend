<template>
  <div>
<b-container>

  <b-row>

    <b-col>
      <div class="btn-group border d-flex" role="group">
      <b-button class="btn border" size="lg">
        DB
      </b-button>

      <b-button class="btn border" size="lg">
        PAY_PLAN
      </b-button>

        <b-button class="btn border" size="lg">
          CLIENT (tab1)
        </b-button>

      </div>
    </b-col>

    <b-col>
      <div class="btn-group border float-right" role="group">

      <b-button class="btn border float-right" size="lg">
        VISIT_UPLOAD
      </b-button>
      </div>
    </b-col>

  </b-row>


      <b-row  class="mb-5" >
        <b-col>

        </b-col>

      </b-row>

  <b-row>
    <br>
    <br>
    <br>
  </b-row>

  <b-row class="fixed-bottom">
    <b-col>


      <b-button class="btn-block border" size="lg" to="/visit">
        Вернуться в визит
      </b-button>

    </b-col>
  </b-row>


    </b-container>
  </div>
</template>

<script>

export default {
  name: 'PaymentTZform',
  components: { },
};
</script>

<style scoped>

</style>
