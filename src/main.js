import Vue from 'vue'
import App from './App.vue'
import VueKonva from 'vue-konva'

import './assets/styles/index.css';

Vue.config.productionTip = false;
Vue.use(VueKonva);

new Vue({
  render: h => h(App),
}).$mount('#app');
