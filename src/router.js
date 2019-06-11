import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import EditUser from './components/EditUser.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/edituser/:id',
      name: 'edit user',
      component: EditUser
    },
    {
      path: '/adduser',
      name: 'add user',
      //component: AddUser,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './components/AddUser.vue')
    }
  ]
})
