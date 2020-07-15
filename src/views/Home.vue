<template>
    <div>
        <v-toolbar dense color="primary">
            <v-menu
            top
            close-on-content-click
            close-on-click
            offset-y
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    v-bind="attrs"
                    v-on="on"
                    >
                    ИНФО
                    </v-btn>
                </template>

                <v-list>
                    <v-list-item>
                        Клиенты
                    </v-list-item>
                    <v-list-item>
                        Продукция
                    </v-list-item>
                    <v-list-item>
                        Промо
                    </v-list-item>
                    <v-list-item>
                        Визиты
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-spacer></v-spacer>

            <v-btn>
                Задачи
            </v-btn>
            <v-spacer></v-spacer>
            {{ username }}
        </v-toolbar>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>Наименование продукции</th>
                        <th>Количество</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Салек светлый</td><td>200</td></tr>
                    <tr><td>АПА</td><td>300</td></tr>
                    <tr><td>Балтийский портер</td><td>100</td></tr>
                    <tr><td>IPA</td><td>50</td></tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-toolbar dense bottom color="primary">
            <v-btn>
                На неделю/на
                <br/>
                текущую дату
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn>
                ДОБАВИТЬ ВИЗИТ
            </v-btn>
        </v-toolbar>
    </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
  computed: {
    username() {
      return this.$store.getters.userFullName;
    },
  },
};

</script>
