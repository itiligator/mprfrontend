<template>
         <div>
        <v-app-bar elevate-on-scroll dense fixed prominent color="primary" height="100">
            <v-container>
                <v-layout>
                    <v-switch solo color='secondary'></v-switch>
                    <v-chip class="ma-1" color='secondary'>8500</v-chip>
                    <v-autocomplete
                        :items="['Дока фуд','Робинзон','АЛАН','Альфа-Технологии','Банзик']"
                        hide-details
                        dense
                        solo
                    >
                    </v-autocomplete>
                </v-layout>
                <v-layout>
                    <v-chip class="ma-1" color='secondary'>Визит №9000<br/> 21.07.2020</v-chip>
                    <v-chip class="ma-1" color='secondary'>Отплата не выгружена</v-chip>
                </v-layout>
            </v-container>
        </v-app-bar>
        <v-toolbar fixed flat prominent></v-toolbar>

<!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->

        <v-container>
            <v-row justify="center">
                <v-btn block outlined class="ma-1">Добавить оплату</v-btn>
            </v-row>
            <v-row justify="center">
                <v-text-field outlined class="ma-1" ></v-text-field>
            </v-row>
            <v-row justify="center">
                <v-btn block outlined class="ma-1">Посмотреть расчеты</v-btn>
            </v-row>
        </v-container>

        <v-app-bar flat bottom fixed color="primary">
                    <v-btn block to='/visit'>Вернутся в визит</v-btn>
        </v-app-bar>
        <!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar flat bottom fixed></v-toolbar>
    </div>
</template>

<script>

export default {
  name: 'Payment',
  components: {
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
    };
  },
  computed: {
    username() {
      return this.$store.getters.userFullName;
    },
  },
};

</script>
