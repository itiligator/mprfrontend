<template>
    <div>
        <v-app-bar elevate-on-scroll dense fixed color="primary" height="100">
            <v-container>
                <v-layout>
                    <v-chip class="ma-1">Вне маршрута</v-chip>
                    <v-chip class="ma-1">В работе</v-chip>
                    <v-autocomplete
                    :items="['Дока фуд','Робинзон','АЛАН','Альфа-Технологии','Банзик']"
                    hide-details
                    dense
                    >
                    </v-autocomplete>
                </v-layout>
                <v-layout>
                    <v-chip class="ma-1">Визит №9000<br/> 21.07.2020</v-chip>
                    <v-chip class="ma-1">В работе</v-chip>
                    <v-autocomplete
                    :items="['Дока фуд','Робинзон','АЛАН','Альфа-Технологии','Банзик']"
                    hide-details
                    dense
                    >
                    </v-autocomplete>
                </v-layout>
            </v-container>
        </v-app-bar>

<!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
<!--         <v-toolbar dense flat fixed color="primary"></v-toolbar> -->


        <v-app-bar dense flat bottom fixed color="primary">
            <v-btn block to='/'>Завершить визит</v-btn>
        </v-app-bar>
        <!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar dense flat bottom fixed color="primary"></v-toolbar>
    </div>
</template>

<script>

export default {
  name: 'Visti',
  components: {
  },
  computed: {
    username() {
      return this.$store.getters.userFullName;
    },
  },
};

</script>
