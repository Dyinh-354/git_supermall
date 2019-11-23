import Vue from 'vue'
import Router from 'vue-router'

// import Home from '../views/home/Home.vue'
// import Category from '../views/category/Category.vue'
// import ShopCart from '../views/shopcart/ShopCart.vue'
// import Profile from '../views/profile/Profile.vue'

// 另一种表示方法
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const ShopCart = () => import('../views/shopcart/ShopCart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home
      // 直接重定向
      redirect: '/home'
    },
    {
      path: '/home',
      // name: 'home',
      component: Home
    },
    {
      path: '/category',
      // name: 'category',
      component: Category
    },
    {
      path: '/shopcart',
      // name: 'shopcart',
      component: ShopCart
    },
    {
      path: '/profile',
      // name: 'profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      // name: 'profile',
      component: Detail
    }
  ]
})
