<template>
    <div>
        <v-app-bar elevate-on-scroll dense fixed prominent color="primary" height="100">
            <v-container>
                <v-layout>
                    <v-chip class="ma-1" color='secondary'>Вне маршрута</v-chip>
                    <v-chip class="ma-1" color='secondary'>В работе</v-chip>
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
                    <v-chip class="ma-1" color='secondary'>8500</v-chip>
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
                </v-layout>
            </v-container>
        </v-app-bar>

<!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar dense fixed prominent></v-toolbar>


        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>Сорт пива</th>
                        <th>Цена</th>
                        <th>Остаток</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Цена за 0,5 СС</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Цена за 0,5 СТ</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Цена за 0,5 СП</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Цена за 0,5 ХБ</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>Вопрос</th>
                        <th>Ответ</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Количество кег 10л</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Количество кег 20л</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Количество кег 30л</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Вопрос 1</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Вопрос 2</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                    <tr>
                        <td>Вопрос Х</td>
                        <td><v-text-field solo hide-details="auto"></v-text-field></td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>

        <v-app-bar flat bottom fixed prominent color="primary">
            <v-container>
                <v-layout>
                    <v-btn left min-width="140" to="/order">Заказ</v-btn>
                    <v-spacer></v-spacer>
                      <v-btn
                        min-width="140"
                        depressed
                        :loading="isSelecting"
                        @click="onButtonClick"
                      >
                        Фото
                      </v-btn>
                      <input
                        ref="uploader"
                        class="d-none"
                        type="file"
                        accept="image/*"
                        @change="onFileChanged"
                      >
                </v-layout>
                <v-layout>
                    <v-btn left min-width="140" to="/payment">Оплата</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn right min-width="140">Сохранить</v-btn>
                </v-layout>
                <v-layout>
                    <v-btn block to='/'>Завершить визит</v-btn>
                </v-layout>
            </v-container>
        </v-app-bar>
        <!-- Тулбар нужен чтобы app-bar не перекрывал содержимое страницы -->
        <v-toolbar flat bottom fixed prominent></v-toolbar>
    </div>
</template>

<script>

export default {
  name: 'Visit',
  components: {
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      defaultButtonText: 'Фото',
      selectedFile: null,
      isSelecting: false,
    };
  },
  computed: {
    username() {
      return this.$store.getters.userFullName;
    },
    buttonText() {
      return this.defaultButtonText;
    },
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false;
      }, { once: true });

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      [this.selectedFile] = e.target.files;
      // do something
    },
  },
};

</script>
