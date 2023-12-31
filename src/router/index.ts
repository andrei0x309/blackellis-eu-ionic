import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '@/views/HomePage.vue'
// import { CONSTANTS } from '@/store/constants';
// import BottomNavigation from '@/components/template/bottom-navigation.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: HomePage
  },
  {
    path: '/post',
    name: 'Post',
    component: () => import('@/views/PostPage.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/ContactPage.vue')
  }
  // {
  //   path: '/post/',
  //   redirect () {
  //     return `/tabs/post/`
  //   },
  // },
  // {
  //   path: '/post/:postId',
  //   redirect (to) {
  //     return `/tabs/post/${to.params.postId}`
  //   },
  // },
  // {
  //   path: '/profile/:userId',
  //   redirect (to) {
  //     return `/tabs/account/${to.params.userId}`
  //   },
  // },
  // {
  //   path: '/web3-profile/:addr',
  //   redirect (to) {
  //     return `/tabs/web3-profile/${to.params.addr}`
  //   },
  // },
  // {
  //   path: '/score',
  //   redirect () {
  //     return `/tabs/score`
  //   },
  // },
  // {
  //   path: '/score/:addr',
  //   redirect (to) {
  //     return `/tabs/score/${to.params.addr}`
  //   },
  // },
  // {
  //   path: '/tabs/',
  //   component: BottomNavigation,
  //   children: [
  //     {
  //       path: '',
  //       redirect: 'feeds',
  //     },
  //     {
  //       path: 'web3-profile/:addr',
  //       name: 'Web3ProfileWithAddr',
  //       component: () => import('@/views/Web3ProfilePage.vue')
  //     },
  //     {
  //       path: 'feeds',
  //       component: () => import('@/views/FeedsPage.vue')
  //     },
  //     {
  //       path: 'notifications',
  //       component: () => import('@/views/NotificationsPage.vue')
  //     },
  //     {
  //       path: 'account',
  //       component: () => import('@/views/AccountPage.vue')
  //     },
  //     {
  //       path: 'account/:userId',
  //       component: () => import('@/views/AccountPage.vue')
  //     },
  //     {
  //       path: 'web3-profile/:addr',
  //       component: () => import('@/views/Web3ProfilePage.vue')
  //     },
  //     {
  //       path: 'post/:postId',
  //       component: () => import('@/views/PostPage.vue')
  //     },
  //     {
  //       path: 'metrics',
  //       component: () => import('@/views/TokenMetrics.vue')
  //     },
  //     {
  //       path: 'meetings',
  //       component: () => import('@/views/MeetingsPage.vue')
  //     },
  //     {
  //       path: 'live',
  //       component: () => import('@/views/ActivityPage.vue')
  //     },
  //     {
  //       path: 'search',
  //       component: () => import('@/views/SearchPage.vue')
  //     },
  //     {
  //       path: 'info',
  //       component: () => import('@/views/InfoPage.vue')
  //     },
  //     {
  //       path: 'score',
  //       component: () => import('@/views/ScorePage.vue')
  //     },
  //     {
  //       path: 'score/:addr',
  //       component: () => import('@/views/ScorePage.vue')
  //     },
  //     {
  //       path: 'stake',
  //       component: () => import('@/views/StakingPage.vue')
  //     }
  //   ],
  // },
  // {
  //   path: '/settings',
  //   component: () => import('../views/SettingsPage.vue')
  // },
  // {
  //   path: '/stake',
  //   component: () => import('../views/StakingPage.vue')
  // },
  // {
  //   path: '/latest-votes',
  //   component: () => import('../views/ProfilePage.vue')
  // },

]

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history: createWebHistory(),
  routes
})

export default router
