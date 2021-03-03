import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import router from './router'
import VueSimpleAlert from "vue-simple-alert";
import VueAxios from "vue-axios";
import axios from "axios";
import './plugins/bootstrap-vue'

import VueA11yDialog from 'vue-a11y-dialog'


Vue.use(VueAxios, axios);
Vue.use(VueSimpleAlert);
Vue.use(VueA11yDialog)

// import VueSimpleAlert from 'vue-simple-alert';
 
// Vue.use(VueSimpleAlert, { reverseButtons: true });

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
