import Vue from "vue";
import VueRouter from "vue-router";
import Classic from "../views/classic/Classic.vue";
import Book from "../views/book/Book.vue";
import My from "../views/my/My.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Classic",
    // component: Classic,
    redirect: "/classic",
  },
  {
    path: "/classic",
    name: "Classic",
    component: Classic,
    meta: {
      isUseCache: true,
      keepAlive: true,
    },
  },
  {
    path: "/book",
    name: "Book",
    component: Book,
    children: [
      {
        path: "/book-item",
        name: "BookItem",
        component: () => import("@/views/book/components/book-item"),
      },
    ],
  },
  {
    path: "/book-detail/:id",
    name: "BookDetail",
    component: () => import("@/views/book/components/book-detail"),
  },
  {
    path: "/my",
    name: "My",
    component: My,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
