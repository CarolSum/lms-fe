import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import Routers from './router';

Vue.use(VueRouter);
Vue.use(ElementUI);

Vue.config.productionTip = false

// 路由配置
const RouterConfig = {
  // 使用 HTML5 的 History 路由模式
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
