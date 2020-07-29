<template>
  <!-- eslint-disable max-len -->
  <div v-if="!!currentVisit.UUID">

<!--    заголовок страницы-->

    <vs-tabs alignment="center">
      <vs-tab label="Оплата" v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
        Планируемая оплата: {{ currentVisit.paymentPlan }}
        <br>
        Лимит: {{ clientByINN(currentVisit.clientINN).limit }}
        <br>
        Отсрочка платежа: {{ clientByINN(currentVisit.clientINN).delay }}
        <vs-input
          type="number"
          label-placeholder="Сумма оплаты"
          v-model.number="currentVisit.payment"/>
        <br>
        <ClientPaymentHistory  :clientinn="currentVisit.clientINN"></ClientPaymentHistory>
        <vs-switch v-model="currentVisit.dataBase" @change="updatePrices">
          <span slot="on" style="font-size:16px">ПБК</span>
          <span slot="off" style="font-size:16px">Тест</span>
        </vs-switch>
      </vs-tab>
      <vs-tab label="Заказ" v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'">
          <vs-row>
            <vs-col vs-w='3'>
          Дата доставки
            </vs-col>
            <vs-col vs-w='9'>
          <vc-date-picker
            v-model='currentVisit.deliveryDate'
            locale="ru"
            :min-date='new Date()'
            :masks="masks"
            style="left: -20px;"
            :input-props='inputProps'
            />
          </vs-col>
        </vs-row>
        <br/>

        <vs-table
          v-model="highlightedProduct"
          :data="yAOL.items"
          noDataText=""
          style="width: 99% !important;">
          <template slot="thead">
            <vs-th>
              Товар
            </vs-th>
            <vs-th>
              Цена/<br/>Сумма
            </vs-th>
            <vs-th>
              Количество
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :data="order" :key="indextr" v-for="(order, indextr) in data" >
              <vs-td style="max-width:40%;">
                <div class="box">
                  <p>{{ order.product.name }}</p>
                </div>
              </vs-td>

              <vs-td>
                {{ order.product.price }} /<br/> {{ order.total() }}
              </vs-td>

              <vs-td align="center">
                <vs-row>
                  <vs-col vs-w="9">
                    <vs-input
                      type="number"
                      v-model="order.order"
                      style="width:70px;"
                  ></vs-input>
                  </vs-col>
                  <vs-col vs-w="2">
                    <vs-button @click="yAOL.removeItem(order)" color="primary" type="border" style="padding:6px;"><i class="material-icons" style="font-size:12px; z-index:0;"> clear </i></vs-button>
                  </vs-col>
                </vs-row>
<!--                 <template slot="edit" style="padding:0px !important;">
                  <vs-button @click="order.order=10" style="padding: 12px; margin:2mm;">10</vs-button>
                  <vs-button @click="order.order=20" style="padding: 12px; margin:2mm;">20</vs-button>
                  <vs-button @click="order.order=30" style="padding: 12px; margin:2mm;">30</vs-button>
                  <vs-button @click="order.order=50" style="padding: 12px; margin:2mm;">50</vs-button>
                </template> -->
              </vs-td>
            </vs-tr>


            <vs-tr>
              <vs-td colspan="3">
                <vs-select
                  autocomplete
                  v-model="selectedProduct"
                  width="100%"
                  placeholder="Добавить товар"
                  >
                  <vs-select-item
                    :key="index"
                    :value="item"
                    :text="item.name"
                    v-for="(item, index) in goodsList"/>
                </vs-select>
              </vs-td>
            </vs-tr>
            <vs-tr>
              <vs-td colspan="3" style="font-size:1rem;">
                <strong>ИТОГО</strong>

                {{ yAOL.total() }} руб.

                {{ yAOL.sum() }} литров
              </vs-td>
            </vs-tr>
            <template slot="expand">
            </template>
          </template>
        </vs-table>
        <br/>
        <br/>
        <div v-if="highlightedProduct !== null && previousVisits !== []">
        <vs-row style="margin-top:2px;">
          <vs-col style="width: 24%;"><b>Дата</b></vs-col>
          <vs-col style="width: 20%;"><b>Остаток</b></vs-col>
          <vs-col style="width: 20%;"><b>Продажи</b></vs-col>
          <vs-col style="width: 20%;"><b>Рекзаказ</b></vs-col>
          <vs-col style="width: 16%;"><b>Заказ</b></vs-col>
        </vs-row>
        <vs-row v-for="(o, date) in previousOrders[highlightedProduct.product.item]" v-bind:key="o.id" style="margin-top:2px;">
          <vs-col style="width: 24%;">{{date}}</vs-col>
          <vs-col style="width: 20%;">{{o.balance}}</vs-col>
          <vs-col style="width: 20%;">{{o.sales}}</vs-col>
          <vs-col style="width: 20%;">{{o.recommend}}</vs-col>
          <vs-col style="width: 16%;">{{o.order}}</vs-col>
        </vs-row>
        </div>
        <br/>
      </vs-tab>
      <vs-tab label="Чеклист">
        <!--    чек-лист для Драфт и Хорека-->

        <div v-if="clientByINN(currentVisit.clientINN).clientType !== 'Магазин'"
    style="margin-top:2mm;">
          <!-- BEGIN CHECKLIST Цены -->
          <vs-row>
            <vs-col vs-w="4">
              <b>Сорт пива</b>
            </vs-col>
            <vs-col vs-w="4">
              <b>Цена</b>
            </vs-col>
            <vs-col vs-w="4">
              <b>Остаток</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Цены' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="4">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="4">
              <vs-input type='number' class="compact-form" v-model="question.answer1"/>
            </vs-col>
            <vs-col vs-w="4">
              <vs-input type='number' class="compact-form" v-model="question.answer2"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Цены -->

        <!-- BEGIN CHECKLIST Кеги -->

          <vs-row style="margin-top:4mm;">
            <vs-col vs-w="6">
              <b>Вопросы</b>
            </vs-col>
            <vs-col vs-w="6">
              <b>Ответы</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Кеги' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="6">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="6">
              <vs-input type='number' class="compact-form" v-model="question.answer1"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Кеги -->

        </div>


        <!--    чек-лист для магазина-->
        <!-- BEGIN CHECKLIST Общий -->
        <div v-if="clientByINN(currentVisit.clientINN).clientType === 'Магазин'">
                  <vs-row style="margin-top:4mm;">
            <vs-col vs-w="7">
              <b>Мероприятие</b>
            </vs-col>
            <vs-col vs-w="2">

            </vs-col>
            <vs-col vs-w="3">
              <b>Примечание</b>
            </vs-col>
          </vs-row>
          <vs-row
          v-for="question in checklist.filter((q) => q.section === 'Общий' )"
          v-bind:key="question.UUID"
          style="margin-top:2mm;">
            <vs-col vs-w="7">
              {{ question.text }}
            </vs-col>
            <vs-col vs-w="2">
              <vs-switch v-model="question.answer1"/>
            </vs-col>
            <vs-col vs-w="3">
              <vs-input class="compact-form" v-model="question.answer2"/>
            </vs-col>
          </vs-row>

        <!-- END CHECKLIST Общий -->

        </div>
      </vs-tab>
      <vs-tab label="Фото">
        <vs-upload
          v-if="currentVisit.id !== undefined"
          multiple
          single-upload
          fileName="image"
          :headers="authHeader"
          :action="photoUploadUrl"
          automatic
          :accept="['JPG','jpg']"
        />
        <div v-else>
          Отправка фото для незапланированных визитов недоступна
        </div>
      </vs-tab>
    </vs-tabs>


    <!--копки Отменить и Завершить-->
    <vs-row vs-w="12"  vs-type="flex" vs-justify="flex-start">
      <vs-col vs-type="flex" vs-justify="flex-start" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="resetVisit">Отменить визит</vs-button>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
      </vs-col>
      <vs-col vs-type="flex" vs-justify="flex-end" vs-align="center" vs-xs="4" vs-lg="4">
        <vs-button @click="finishVisit">Закончить визит</vs-button>
      </vs-col>
    </vs-row>

<!--    <vs-row class="fixed-row-bottom">-->
<!--      <vs-col>-->
<!--        <vs-button type="border" icon="business_center"></vs-button>-->
<!--        <vs-button icon="map"></vs-button>-->
<!--        <vs-button icon="location_on"></vs-button>-->
<!--        <vs-button icon="list_alt"></vs-button>-->
<!--        <vs-button icon="info"></vs-button>-->
<!--      </vs-col>-->
<!--    </vs-row>-->

  </div>
</template>

<script>
/* eslint-disable max-len */
/* eslint-disable max-classes-per-file */

import {
  VISIT_CLOSE_CURRENT,
  VISIT_GET_CURRENT, VISIT_GET_HISTORY_BY_INN,
  VISIT_SAVE_CURRENT_TO_VUEX,
} from '@/store/actions/visits';
import { GETCLIENTBYINN } from '@/store/actions/clients';
import { ALL_GOODS, GOOD_BY_ITEM } from '@/store/actions/goods';
import {
  CHECKLIST_RESET_CURRENT,
  CHECKLIST_GET_CURRENT,
  CHECKLIST_SAVE_CURRENT, CHECKLIST_UPLOAD_CURRENT_TO_SERVER,
} from '@/store/actions/checklists';
import {
  PRICES_GET_BY_PRODUCTITEM,
  PRICES_DOWNLOAD_ALL_FROM_SERVER,
} from '@/store/actions/prices';
import ClientPaymentHistory from '@/components/ClientPaymentHistory.vue';
import { HTTP } from '@/utils/http';

const mask = 'YYYY-MM-DD';

class Product {
  constructor(g, price) {
    this.item = g.item;
    this.name = g.name;
    this.description = g.description;
    this.price = price;
  }

  updatePrice(price) {
    this.price = price;
  }

  shortName() {
    return this.name.substring(0, 35).concat('...');
  }
}

class OrderItem {
  constructor(product) {
    this.product = product;
    this.order = 0;
    this.sales = 0;
    this.delivered = 0;
    this.recommend = 0;
  }

  total() {
    return Math.round((this.order * this.product.price * 100)) / 100;
  }
}

class OrderList {
  items = [];

  newItem(product) {
    if (!(this.items.map((i) => i.product).includes(product))) {
      this.items.push(new OrderItem(product));
    }
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  total() {
    return Math.round(this.items.map((i) => i.total()).reduce((a, b) => a + b, 0) * 100) / 100;
  }

  sum() {
    return this.items.map((i) => Number(i.order)).reduce((a, b) => a + b, 0);
  }

  has(item) {
    return this.items.some((o) => o.product === item);
  }

  orderArray() {
    return this.items.map((i) => ({
      productItem: i.product.item,
      order: Number(i.order),
      delivered: i.delivered,
      recommend: i.recommend,
      sales: i.sales,
      balance: i.balance,
    }));
  }
}

export default {
  name: 'VisitEditor',
  computed: {
    products() {
      return this.$store.getters[ALL_GOODS];
    },
    previousVisits() {
      return this.$store.getters[VISIT_GET_HISTORY_BY_INN](this.currentVisit.clientINN);
    },
    photoUploadUrl() {
      return `${HTTP.defaults.baseURL}/photos/${this.currentVisit.UUID}`;
    },
    client() {
      return this.clientByINN(this.currentVisit.clientINN);
    },
    goodsList() {
      return this.yAG.filter((g) => !this.yAOL.has(g));
    },
    inputProps() {
      return { placeholder: this.currentVisit.deliveryDate, readonly: true };
    },
  },
  components: {
    ClientPaymentHistory,
  },
  data() {
    return {
      yAG: [],
      yAOL: new OrderList(),
      editPopup: false,
      selectedProduct: null,
      highlightedProduct: null,
      currentVisit: {},
      checklist: [],
      timer: '',
      previousOrders: {},
      veryLastVisitDate: '',
      orderedProducts: [],
      editedOrder: {
        productItem: -1,
        order: 0,
        delivered: 0,
        balance: 0,
        sales: 0,
        recommend: 0,
      },
      authHeader: { Authorization: 'Token' },
      masks: {
        input: mask,
        data: mask,
        L: mask,
      },
    };
  },
  created() {
    this.currentVisit = JSON.parse(JSON.stringify(this.$store.getters[VISIT_GET_CURRENT]));
    this.checklist = JSON.parse(JSON.stringify(this.$store.getters[CHECKLIST_GET_CURRENT]));
    // this.$store.dispatch(VISIT_DOWNLOAD_HISTORY_BY_INN_FROM_SERVER, this.currentVisit.clientINN);
  },
  watch: {
    previousVisits() {
      this.preparePreviousOrders();
    },
    selectedProduct() {
      if (this.selectedProduct !== null) {
        this.yAOL.newItem(this.selectedProduct);
      }
      this.$nextTick(() => { this.selectedProduct = null; });
    },
  },
  mounted() {
    this.prepareProducts();
    if (this.previousVisits !== undefined) { /* не уверен, что должна быть именно такая проверка */
      this.preparePreviousOrders();
    }
    this.$store.dispatch(PRICES_DOWNLOAD_ALL_FROM_SERVER);
    this.restoreOrders();
  },
  beforeDestroy() {
    this.saveCurrentVisitToVuex();
    this.saveCurrentChecklistToVuex();
  },
  methods:
    {
      saveCurrentVisitToVuex() {
        this.currentVisit.orders = this.yAOL.orderArray();
        this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
      },
      saveCurrentChecklistToVuex() {
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, this.checklist);
      },
      resetVisit() {
        this.checklist = [];
        this.$store.dispatch(CHECKLIST_RESET_CURRENT);
        this.currentVisit = {};
        this.$store.dispatch(VISIT_SAVE_CURRENT_TO_VUEX, this.currentVisit);
      },
      finishVisit() {
        this.currentVisit.date = new Date().toISOString().slice(0, 10);
        this.formatDeliveryDate();
        this.saveCurrentVisitToVuex();
        this.$store.dispatch(VISIT_CLOSE_CURRENT);
        this.$store.dispatch(CHECKLIST_SAVE_CURRENT, this.checklist);
        this.$store.dispatch(CHECKLIST_UPLOAD_CURRENT_TO_SERVER);
        this.$store.dispatch(CHECKLIST_RESET_CURRENT);
        this.checklist = [];
        this.$router.push('/route');
      },
      clientByINN(inn) {
        return this.$store.getters[GETCLIENTBYINN](inn);
      },
      productByItem(productItem) {
        return this.$store.getters[GOOD_BY_ITEM](productItem);
      },
      priceByItem(productItem) {
        const pr = this.$store.getters[PRICES_GET_BY_PRODUCTITEM](productItem).find((p) => (p.dataBase === this.currentVisit.dataBase && p.priceType === this.client.priceType));
        if (pr !== undefined) {
          return Number(pr.amount.replace(',', '.'));
        }
        return undefined;
      },
      stringLineFromOrder(order) {
        return `Заказ: ${order.order} Доставлено: ${order.delivered} Остаток: ${order.balance} Продажи: ${order.sales}`;
      },
      updateRecomSales(orderIndex) {
        const { productItem } = this.currentVisit.orders[orderIndex];
        const prevBalance = this.previousOrders[productItem][this.veryLastVisitDate].balance;
        const prevDelivery = this.previousOrders[productItem][this.veryLastVisitDate].delivered;
        // eslint-disable-next-line max-len
        this.currentVisit.orders[orderIndex].sales = prevBalance + prevDelivery - this.currentVisit.orders[orderIndex].balance;
        this.currentVisit.orders[orderIndex].recommend = this.currentVisit.orders[orderIndex].sales;
      },
      preparePreviousOrders() {
        this.previousOrders = {};
        this.previousVisits.forEach((visit) => {
          visit.orders.forEach((order) => {
            this.previousOrders[order.productItem] = this.previousOrders[order.productItem] || {};
            /* this.previousOrders[order.productItem].push(order); */
            this.previousOrders[order.productItem][visit.date] = order;
            this.veryLastVisitDate = visit.date;
          });
        });
      },
      formatDeliveryDate() {
        if ((this.currentVisit.deliveryDate || null) !== null) {
          this.currentVisit.deliveryDate = new Date(this.currentVisit.deliveryDate).toISOString().substring(0, 10);
        }
      },
      addProductToOrders() {
        if (this.selectedProduct !== null) {
          this.yAOL.newItem(this.selectedProduct.item);
          if (!(this.orderedProducts.map((p) => p.productItem).includes(this.selectedProduct.item))) {
            this.orderedProducts.push({
              productItem: this.selectedProduct.item,
              order: 0,
              delivered: 0,
              recommend: 0,
              balance: 0,
              sales: 0,
            });
          }
        }
        this.selectedProduct = null;
      },
      removeProductFromOrders(idx) {
        this.orderedProducts.slice(idx, 1);
      },
      openPopup(idx) {
        this.editPopup = true;
        this.editedOrder = this.orderedProducts(idx);
      },
      prepareProducts() {
        this.yAG = this.products.map((p) => new Product(p, this.priceByItem(p.item)));
      },
      updatePrices() {
        this.yAG.forEach((g) => g.updatePrice(this.priceByItem(g.item)));
      },
      restoreOrders() {
        this.currentVisit.orders.forEach((o) => {
          const product = this.yAG.find((g) => g.item === o.productItem);
          if (product !== undefined) {
            const order = new OrderItem(product);
            order.order = o.order;
            order.balance = o.balance;
            order.sales = o.sales;
            order.recommend = o.recommend;
            this.yAOL.items.push(order);
          }
        });
      },
    },
};
</script>

<style scoped>
  .fixed-row-bottom { position: fixed; bottom: 0; z-index: 999;}
  .button.vs-tabs--btn {font-size: 20px}
  .compact-form { max-width: 90%;}
  .vs-tabs--content { padding: 5px !important; }
  .vs-con-table { padding: 0px !important; }
  .vs-table--tbody-table .tr-values td { padding: 2px !important;  font-size: 0.9rem;}
  .th { padding-bottom: 0px !important; }
  .vs-con-table table { width: 99% !important; }
  .vs-table--content { width: 99% !important; }
  .box {
/*  background-color: #fff;
  box-shadow: 2px 2px 10px #246756;
  padding: 2em;*/
  width: 150px;
}

.box p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
