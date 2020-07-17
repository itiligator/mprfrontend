<template>
         <div>
        <v-app-bar elevate-on-scroll dense fixed prominent color="primary" height="100">
            <v-container>
                <v-layout>
                    <v-switch solo color='secondary'></v-switch>
                    <v-menu
                        :close-on-content-click="true"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                >
                    <template v-slot:activator="{ on }">
                        <v-text-field
                                v-model="date"
                                readonly
                                v-on="on"
                                offset-y
                                :nudge-right="40"
                                hide-details
                                dense
                                solo
                        ></v-text-field>
                    </template>
                    <v-date-picker
                            v-model="date"
                            first-day-of-week="1"
                            no-title
                            scrollable
                            locale="ru-RU"
                    ></v-date-picker>
                </v-menu>
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
                    <v-chip class="ma-1" color='secondary'>VISIT_REG_UPLOAD</v-chip>
                </v-layout>
            </v-container>
        </v-app-bar>
        <v-toolbar fixed flat prominent></v-toolbar>

<!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->

                <v-btn block outlined>Добавить товар</v-btn>


        <v-app-bar flat bottom fixed color="primary">
                    <v-btn block to='/visit'>Вернутся в визит</v-btn>
        </v-app-bar>
        <!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar flat bottom fixed></v-toolbar>
    </div>
</template>

<script>

export default {
  name: 'Order',
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
