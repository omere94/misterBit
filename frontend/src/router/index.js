import { createRouter, createWebHashHistory } from 'vue-router'
import toyApp from '../views/toy-app.vue'
import toyDetails from '../views/toy-details.vue'
import toyEdit from '../views/toy-edit.vue'
import about from '../views/about.vue'
import toyDashboard from '../views/toy-dashboard.vue'
import logPage from '../views/log-page.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'App',
      component: toyApp
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/dashboard',
      name: 'toy-dashboard',
      component: toyDashboard,
    },
    {
      path: '/details/:id',
      name: 'toy-details',
      component: toyDetails,
    },
    {
      path: '/edit/:id?',
      name: 'toy-edit',
      component: toyEdit,
    },
    {
      path: '/login',
      component: logPage
  }, 
  ]
})

export default router
