import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#42b883',
        secondary: '#B84277',
        accent: '#4842B8',
        error: '#B84277',
      },
    },
  },
});
