import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import fastClick from 'fastclick' //解决移动端延迟300ms问题
import './assets/styles/reset.css' //解决浏览器默认样式问题
import './assets/styles/border.css' //解决移动端一像素问题
import * as filters from './utils/filter'
import copy from './copy'
import '@/components/Toast/index.css'
import Toast from '@/components/Toast/index.js'
Vue.use(Toast)

Vue.config.productionTip = false //阻止显示生产模式的消息，消除警告
fastClick.attach(document.body)

// 批量注册全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

// 自定义指令
const directives = { copy }
// 批量注册自定义指令
Object.keys(directives).forEach((key) => {
  Vue.directive(key, directives[key])
})

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app')
