import Vue from 'vue';
import VueRouter from "vue-router";
import VueResource from "vue-resource";
import App from './App';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import shops from './components/shops/shops.vue';
/* eslint-disable no-new */
//定义小组件，不需要外部引入
// const A ={
//   template:"<v-goods>冯</v-goods>"
// }
// const B ={
//   template:"<span>B</span>"
// }
// const C ={
//   template:"<span>C</span>"
// }
Vue.use(VueRouter);//挂载的所有vue实例
Vue.use(VueResource);
const router = new VueRouter({
  routes:[
    {path: '/a', component: goods},
    {path: '/b', component: ratings},
    {path: '/c', component: shops}
  ]
})
new Vue({
  el:"#app",
  template:"<App/>",
  //注册
  components:{
    App
  },
  router
}).$mount('#app')

