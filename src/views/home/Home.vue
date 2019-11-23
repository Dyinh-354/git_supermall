<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <tab-control :title="['流行','新款', '精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scrollposition="contentScroll"
            :pull-up-load="true" 
            @pullingUp="LoadMore">
       <!-- 轮播图，图片从后台返回，所以要先设置一个网络请求js -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款', '精选']" 
                    @tabClick="tabClick" 
                    ref="tabControl2" 
                    :class="{fixed: isTabFixed}"/>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <back-to-top></back-to-top> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import NavBar from '../../components/common/navbar/NavBar.vue'

//本页面内子组件
import HomeSwiper from './childCompos/HomeSwiper'
import RecommendView from './childCompos/RecommendView'
import FeatureView from './childCompos/FeatureView'

//公共组件
import NavBar from '@components/common/navbar/NavBar.vue'
import TabControl from '@components/content/tabControl/TabControl.vue'
import GoodsList from '@components/content/goodsview/GoodsList.vue'
// import BackTop from '@components/content/backtop/BackTop.vue'
import Scroll from '@components/common/scroll/Scroll.vue'


import { getHomeMultidata, getHomeGoods } from '../../network/homerequest.js'
// import {getHomeMultidata} from '@network/homerequest'
// import { debounce } from '@common/utlis.js'
// import { debounce } from '@common/utlis.js'
import { itemImgListenerMixin, backTopMixin } from '@common/mixin.js'


export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    // BackTop,
    Scroll
  },
  mixins: [itemImgListenerMixin, backTopMixin],
  data() {
    return {
      // result: null
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',

      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
  
  },
  // destroyed() {
  //   console.log('home-destroyed');
  // },
  activated() {
    // console.log('home-activeted');
    // this.$refs.scroll.scrollTo(0, -1000, 0)
    // console.log(this.saveY)
    this.$refs.scroll.scrollTo(0, this.saveY)

    this.$refs.scroll.refresh()
  },
  deactivated() {
    // console.log('deactivated')
    //1 保存Y值
    this.saveY = this.$refs.scroll.getScrollY()
    // console.log(this.saveY)

    // 2 取消全局事件的监听
    this.$bus.$off('itemImgLoad',  this.itemImgListener)
  },
  created() {
    //将页面中的组件创建完成后的，将要执行的具体的方法和伴随一起的回调函数移到methods中，
    //在created中最好只执行调用方法，而不是在此定义兼调用

    // 在什么时候发送请求呢？可以在生命周期函数的某个阶段发送，
    // 这里在这个页面一旦被创建成功后就发送请求
    // 1 第一次请求首页多个数据
    this.getHomeMultidata()
    //2  请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')//数据多，请求返回慢，需等待

    // 3 组件加载完成后，就监听item中图片加载完成
    // 组件创建完成，但是没有在浏览器挂载成功，无法使用$refs获取元素或组件，应当让其在mounted中监听
  },
  mounted() {
    // 1 组件挂载完成后，就监听item中图片加载完成

    // 在这个作用域内将防抖函数的返回值赋值给新的refresh变量
    // const refresh = this.debounce(this.$refs.scroll.refresh, 500)
    // const refresh = debounce(this.$refs.scroll.refresh, 500)

    // this.itemImgListener = () => {
    //   // console.log('--------')
    //   // this.$refs.scroll.refresh()
    //   // 这是一个高频事件，现在只让其在一秒内只调用一次
    //   refresh()
    // }

    // this.$bus.$on('itemImageLoad', this.itemImgListener)

    // 2 吸顶操作之前为组件中的元素在标准流中滚动到位置（offsettop）的赋值，
    // 但是无法直接获取组件的offsettop的值的，只能去获取组件中的元素的值，如何去获取呢？
    // $refs只能获取整个组件，不能获取组件中的元素
    // 哎所有组件中都有一个属性$el，可以用于获取组件中的所有元素
    // 但是一开始在mounted周期中，有可能有图片没有加载完成，使获取的值不准确
    // 因此要让所有图片加载完成后，再去获取这个值，如何获取呢？
    // 在这个项目中的短板是轮播图的加载最耗时间，其他组件的图片基本上很快完成
    // 因此，重点监听轮播图加载完成的时间：监听轮播图组件中的homeswiper组件中的img元素的加载事件
    // console.log('home-mounted')
  },
  methods: {
    /**
     * 事件监听方法
     * **/ 
    tabClick(index) {
      console.log(index)
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      
      // console.log(this.$refs.tabControl1)
      // console.log(this.$refs.tabControl2)

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;

    },
    // backClick() {
    //   // console.log('huidaodingbu')
    //   // console.log(this.$refs.scroll.scroll)
    //   // this.$refs.scroll.scroll.scrollTo(0, 0, 500)
    //   this.$refs.scroll.scrollTo(0, 0)
    // },
    contentScroll(position) {
      // console.log(position)
      // 1 判断backtop是否显示
      // this.isShowBackTop = (-position.y) > 1000
      this.listenerBackTop(position)

      // 2 决定tabcontrol是否吸顶（使该组件的样式为position：fixed）
      this.isTabFixed = (-position.y) > this.taboffsetTop

    },
    LoadMore() {
      // console.log('上拉加载更多222')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
      // console.log(this.taboffsetTop)
      // 这个方法只需要调用一次即可
    },

    /***
     * 网络请求
     * ****/

    //1 第一次请求首页多个数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // 此时后台返回的响应数据已经返回成功了
        
        // 函数调用：将函数执行体和执行上下文压如函数栈（保存函数调用（执行）过程中的所有变量）
        // 函数调用结束：（函数执行体的所有代码全部执行完毕，从栈内存中移走）弹出函数栈（立即释放所有变量，包括函数执行过程产生的新的数据）
        // 再次调用，变量和执行上下文在栈内存中重新创建
        
        // 要将数据及时的传递出去（return 或者将数据指向一个变量保存）
        
        // (相当于在函数执行时，接收到了从后台返回的封装着全部数据的对象，函数会在堆内存中写入这个对象（object）
        // 如果函数执行结束，这个堆内存中的数据对象没有被栈内存中的变量引用，则会自动被内存的垃圾回收机制回收，
        // 如果在函数执行的过程中将它与函数栈以外的变量引用（建立引用连接），则不会被回收)
        
        // （函数执行时，将函数对象代码写入栈内存中，此时此刻它的函数执行体和执行上下文会在当前作用域，
        // 或者说写入了栈内存之后就是在全局作用域中生效，可以调用他能调用的全局作用域中的变量？）
        console.log(res);
        // this.result = res;
        // 但是请求函数是一个异步函数，数据的返回有延时性
        // 如果将res全部存储在一个对象中，不便于数据在模板中的分别使用，因此一开始获得数据后先进行一个大的
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    //2 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res);
          //将一个数组中的数据塞到另一个数组中，使用es6的解构赋值totalnums.push(...num1)
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1 

        // 完成上拉加载
        this.$refs.scroll.finishPullUp()
      })
    }
  },
  
}

</script>

<style scoped>
	#home {
    height: 100vh;
  }
  .home-nav {
    background-color: pink;
    color: #ffffff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  .tab-control {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;

  }
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    /* margin-top: -40px; */
  }
  /* .content {
    height: 300px;
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 98px;
    left: 0;
    right: 0;

  } */
 
</style>
