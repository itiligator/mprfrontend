<template>
    <div>
        <v-app-bar elevate-on-scroll dense fixed color="primary">
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
        </v-app-bar>

<!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar dense flat fixed color="primary"></v-toolbar>

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
                    <tr><td>IPA</td><td>50</td></tr>
                    <tr><td>IPA</td><td>50</td></tr>
                    <tr><td>IPA</td><td>50</td></tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>Статус выполнения</th>
                        <th>Оплата ПЛАН</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Запланирован</td>
                        <td>2000</td>
                        <td><v-btn>Начать<br/>визит</v-btn></td>
                        <td><v-btn>Переход в<br/>клиента</v-btn></td>
                    </tr>
                    <tr>
                        <td>Запланирован</td>
                        <td>3000</td>
                        <td><v-btn>Начать<br/>визит</v-btn></td>
                        <td><v-btn>Переход в<br/>клиента</v-btn></td>
                    </tr>
                    <tr>
                        <td>Окончен</td>
                        <td>6000</td>
                        <td></td>
                        <td><v-btn>Переход в<br/>клиента</v-btn></td>
                    </tr>
                    <tr>
                        <td>Окончен</td>
                        <td>1000</td>
                        <td></td>
                        <td><v-btn>Переход в<br/>клиента</v-btn></td>
                    </tr>
                    <tr>
                        <td>Окончен</td>
                        <td>500</td>
                        <td></td>
                        <td><v-btn>Переход в<br/>клиента</v-btn></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-app-bar dense flat bottom fixed color="primary">
            <v-btn>
                На неделю/на
                <br/>
                текущую дату
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn>
                ДОБАВИТЬ
                <br/>
                ВИЗИТ
            </v-btn>
        </v-app-bar>
        <!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar dense flat bottom fixed color="primary"></v-toolbar>
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
