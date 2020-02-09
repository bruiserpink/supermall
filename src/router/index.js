import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import('views/home/Home');
const Profile = ()=>import('views/profile/Profile');
const Cartgory = ()=>import('views/category/Category');
const Cart = ()=>import('views/cart/Cart');
const Detail = () => import('views/details/Detail')
//1.安装插件
Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Cartgory
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]
//创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router;
