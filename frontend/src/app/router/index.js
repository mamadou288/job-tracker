import { createRouter, createWebHistory } from 'vue-router'
import BoardPage from '../../pages/BoardPage.vue'
import StatisticsPage from '../../pages/StatisticsPage.vue'
import ProfilePage from '../../pages/ProfilePage.vue'


const routes = [
  {
    path: '/',
    component: BoardPage,
  },
  {
    path: '/statistics',
    component: StatisticsPage,
  },
  {
    path: '/profile',
    component: ProfilePage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
