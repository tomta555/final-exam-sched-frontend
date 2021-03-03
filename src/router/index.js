import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Timetable from '../views/Timetable.vue'
import Form from '../views/Form.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login  
  },
  {
    path: '/Timetable',
    name: 'Timetable',
    component: Timetable
  },
  {
    path: '/Form',
    name: 'Form',
    component: Form   
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
