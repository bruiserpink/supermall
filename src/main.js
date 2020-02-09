import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//此插件解决移动端300ms点击延时。FastClick1.安装:npm install fastclick --save
// 2.FastClick导入
import FastClick from 'fastclick'
//此插件实现图片的懒加载，提升性能Lazyload 1.安装：npm install vue-lazyload --save
//Lazyload 2.导入
import VueLazyload from "vue-lazyload";
import toast from 'components/common/toast'
Vue.config.productionTip = false;
//声明有个Vue实例作为事件总线
Vue.prototype.$bus = new Vue();
//安装toast组件就会执行toast里面的index.js的install方法
Vue.use(toast);
//FastClick 3.调用其内部方法挂载在body上
FastClick.attach(document.body);
//Lazyload 3.安装VueLazyload  4.使用：在所有使用:src绑定图片的地方使用v-lazy='图片路径'
Vue.use(VueLazyload,{
  //5.参数传递：可以传递其属性,具体可查看api文档。loading为加载时显示的图片
  // 使用commonjs导入图片
  loading: require('./assets/img/common/placeholder.png')
});
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
