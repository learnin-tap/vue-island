import Vue from 'vue'
import VueRouter from 'vue-router'
import Classic from '../views/classic/Classic.vue'
import Book from '../views/book/Book.vue'
import My from '../views/my/My.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: "Classic",
    // component: Classic,
    redirect: '/classic',
  },
  {
    path: '/classic',
    name: 'Classic',
    component: Classic,
    meta: {
      isUseCache: true,
      keepAlive: true,
    },
  },
  {
    path: '/book',
    name: 'Book',
    component: Book,
    children: [
      {
        path: '/book-item',
        name: 'BookItem',
        component: () => import('@/views/book/components/book-item'),
      },
    ],
  },
  {
    path: '/book-detail/:id',
    name: 'BookDetail',
    component: () => import('@/views/book/components/book-detail'),
  },
  {
    path: '/my',
    name: 'My',
    component: My,
  },
  {
    path: '/classic-detail',
    name: 'ClassicDetail',
    component: () => import('@/views/my/components/classic-detail'),
  },
]

const router = new VueRouter({
  routes,
})

// 消除相同路径跳转报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
export default router
