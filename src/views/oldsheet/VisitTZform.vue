<template>
  <div>
<b-container>
<!--class="fixed-top"-->
  <b-row >

    <b-col class="">
      <div class="btn-group border d-flex" role="group">
      <b-button class="btn btn-default border w-100" size="lg" to="/">
        VISIT_OUT
      </b-button>

      <b-button class="btn btn-default border w-100" size="lg">
        VISIT_STATUS
      </b-button>
      </div>
    </b-col>

    <b-col>
      <div class="btn-group border d-flex" role="group">
      <b-button class="btn btn-default border w-100" size="lg">
        VISIT_ID
      </b-button>

      <b-button class="btn btn-default border w-100" size="lg">
        PAY_PLAN
      </b-button>

      <b-button class="btn btn-default border w-100" size="lg">
        delivery_date
      </b-button>
      </div>
    </b-col>

  </b-row>


      <b-row  class="mb-5" >
        <b-col >
          <table width="100%" class="border">
            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

            <tr>
              <td>Последний вопрос чеклиста</td>
              <td>
                <input placeholder="ответ на вопрос">
              </td>
            </tr>

          </table>
        </b-col>

      </b-row>

  <b-row>
    <br>
    <br>
    <br>
  </b-row>

  <b-row class="fixed-bottom">
    <b-col>

      <b-button class=  "btn border" size="lg">
        Заказ
      </b-button>
      <br>

      <b-button class=  "btn border" size="lg" to="/payment">
        Оплата
      </b-button>
      <br>

      <b-button class="btn-block border" size="lg">
        Завершить визит
      </b-button>

    </b-col>
  </b-row>


    </b-container>
  </div>
</template>

<script>

export default {
  name: 'VisitTZform',
  components: { },
};
</script>

<style scoped>

</style>
