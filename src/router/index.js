import Vue from "vue";
import VueRouter from "vue-router";
import Classic from "../views/classic/Classic.vue";
import Book from "../views/book/Book.vue";
import My from "../views/my/My.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Classic",
    component: Classic,
  },
  {
    path: "/classic",
    name: "Classic",
    component: Classic,
  },
  {
    path: "/book",
    name: "Book",
    component: Book,
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
