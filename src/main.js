import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'

// import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
// vue实例是可以作为一个事件总线的，相当于是在vue实例中监听图片加载事件

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// axios({
//   // url: 'httpbin.org/'
    //只配置了一个URL ，默认发送get请求
//   url: 'http://123.207.32.32:8000/home/multidata'
// }).then(res => {
//   console.log(res);
// })

// get请求
// axios({
//   // url: 'http://123.207.32.32:8000/home/multidata',
//   method: 'get'
// }).then(res => {
//   console.log(res);
// })

// get请求拼接数据
// axios({
//   // url: 'http://123.207.32.32:8000/home/multidata？type=pop&page=1',
//   method: 'get'
// }).then(res => {
//   console.log(res);
// })

// axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   params: { 
//     type: 'pop',
//     page: 1
//  },
//   method: 'get'
// }).then(res => {
//   console.log(res);
// })

// 另一种发送请求的方法
// axios.get()
// axios.post()

// 发送并发请求
// axios.all([axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }), axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   params: { 
//     type: 'pop',
//     page: 1
//   },
// })])
//   .then(result => {
//     console.log(result)
//   })

// 若还想把返回的数据做一个延展和分割
// axios.all([axios({
//   url: 'http://123.207.32.32:8000/home/multidata'
// }), axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   params: { 
//     type: 'pop',
//     page: 1
//   },
// })])
//   .then(axios.spread((res1, res2) => {
//     console.log(res1);
//     console.log(res2);
//   }))

// 还可以进行一些配置，如简化路径的baseURL,timeout
// axios.all([axios({
//   baseURL: 'http://123.207.32.32:8000',
//   url: '/home/multidata',
//   timeout: 5000
// }), axios({
//   baseURL: 'http://123.207.32.32:8000',
//   url: '/home/multidata',
//   params: { 
//     type: 'pop',
//     page: 1
//   },
//   timeout: 5000
// })])
//   .then(axios.spread((res1, res2) => {
//     console.log(res1);
//     console.log(res2);
//   }))

// 将这些共同的配置提取出来
// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000

// axios.all([axios({
//   url: '/home/multidata',
// }), axios({
//   url: '/home/multidata',
//   params: { 
//     type: 'pop',
//     page: 1
//   }
// })])
//   .then(axios.spread((res1, res2) => {
//     console.log(res1);
//     console.log(res2);
//   }))

  // // 创建一个axios的实例，便于多次调用，于是多次请求
  // const instance1 = axios.create({
  //   baseURL: 'http://123.207.32.32:8000',
  //   timeout: 5000
  // })

  // // 调用实例，传入URL和method等参数
  // instance1({
  //   url: 'home/mutidata'
  // }).then(res => {
  //   console.log(res);
  // })

  // instance1({
  //   url: '/home/multidata',
  //   params: { 
  //     type: 'pop',
  //     page: 1
  //   }
  // }).then(res => {
  //   console.log(res);
  // })