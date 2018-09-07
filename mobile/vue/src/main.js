import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

import router from './router'

if (process.env.PACK_ENV === 'production') {
  Vue.config.debug = false
} else if (process.env.PACK_ENV === 'development') {
	Vue.config.debug = true
} else {
  Vue.config.debug = true
}

Vue.use(VueResource)

const app = new Vue({
  router: router,
  render: r => r(App)
}).$mount('#app')
