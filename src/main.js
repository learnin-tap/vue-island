import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import fastClick from "fastclick"; //解决移动端延迟300ms问题
import "./assets/styles/reset.css"; //解决浏览器默认样式问题
import "./assets/styles/border.css"; //解决移动端一像素问题

Vue.config.productionTip = false;
fastClick.attach(document.body);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
