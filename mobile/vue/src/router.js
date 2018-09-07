import Vue from 'vue'
import Router from 'vue-router'

import Halo from './views/Halo'
import Wolf from './views/Wolf'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/halo'
    },
    {
      path: '/halo',
      component: Halo
    },
    {
      path: '/wolf',
      component: Wolf
    }
  ]
})
