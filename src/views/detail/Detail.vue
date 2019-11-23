<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav-bar" @titleClick="titleClick" ref="nav"></detail-nav-bar>	
		<scroll class="content"
						ref="scroll"
						:probe-type="3"
						@scrollposition="contentScroll"> 
			<ul>
				<li v-for="(item, index) in $store.state.cartList" :key="index">
					{{item}}
				</li>
			</ul>
			<detail-swiper :top-images="topImages"/>
			<detail-base-info :goods="goods"/>
			<detail-shop-info :shop="shop"/>
			<detail-goods-info :detail-info="detailInfo" @imageLoad="goodsImageLoad"/>
			<detail-param-info ref="param" :param-info="paramInfo"/>
			<detail-comment-info ref="comment" :comment-info="commentInfo"/>
			<goods-list ref="recommend" :goods="goodsList"/>
		</scroll>
		<detail-bottom-bar @addCart="addCart"/>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import DetailNavBar from './childCompos/DetailNavBar';
	import DetailSwiper from './childCompos/DetailSwiper';
	import DetailBaseInfo from './childCompos/DetailBaseInfo';
	import DetailShopInfo from './childCompos/DetailShopInfo';
	import DetailGoodsInfo from './childCompos/DetailGoodsInfo';
	import DetailParamInfo from './childCompos/DetailParamInfo';
	import DetailCommentInfo from './childCompos/DetailCommentInfo';
	import DetailBottomBar from './childCompos/DetailBottomBar';

	
	import GoodsList from '@components/content/goodsview/GoodsList.vue'
	import Scroll from '@components/common/scroll/Scroll.vue'
	// import BackTop from '@components/content/backtop/BackTop.vue'


	
	import { getDetail, Goods, Shop, GoodsParam, getRecommend } from '@network/detail.js';
	import { debounce } from '@common/utlis.js'
	import { itemImgListenerMixin, backTopMixin } from '@common/mixin.js'



	export default {
		name: 'Detail',
		props: [''],
		mixins: [ itemImgListenerMixin, backTopMixin ],
		data () {
			return {
				iid: null,
				topImages: [],
				goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commentInfo: {},
				goodsList: [],
				themeTopYs: [],
				currentIndex: 0,
				getThemeTopY: null
			};
		},
		components: {	
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommentInfo,
			GoodsList,
			Scroll,
			DetailBottomBar
		},
		created() {
			// 1 保存传入的iid
			this.iid = this.$route.params.iid
			// console.log(this.iid)

			// 2 根据iid请求详细的数据，单独包装一个详情请求的方法
			getDetail(this.iid).then(res => {
				console.log(res)
				// 将获取的数据分离:
				const data = res.result;
				// 1 获取顶部的图片轮播数据
				this.topImages = data.itemInfo.topImages

				// 2 获取商品信息
				this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				// console.log(this.goods)

				// 3 创建店铺信息
				this.shop = new Shop(data.shopInfo)
				// console.log(this.shop)

				// 4 获取商品详细信息
				this.detailInfo = data.detailInfo
				// console.log(this.detailInfo)

				//5 保存参数信息
				// console.log(data.itemParams.info, data.itemParams.rul)
				this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
				
				// 6 保存评论参数
				if (data.rate.list) {
					this.commentInfo = data.rate.list[0]
				}
			})

			// 3 调用发送推荐数据请求的方法
			this.getRecommend()

			// 4 获取主题的y值
			this.getThemeTopY = debounce(() => {
				this.themeTopYs = []
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.param.$el.offsetTop)
				this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				this.themeTopYs.push(Number.MAX_VALUE)

				// console.log(this.$refs.param)
				console.log(this.themeTopYs)
			}, 500)

		},

		mounted() {
			// 在组件挂载完成之后，要对图片的加载进行监控，调用防抖的方法每一张图片的加载完成事件在一定时间内只能执行一次
			// 这是防抖的本质，使用定时器，监控事件的执行次数，只允许其在一定时间内执行一次
			// const refresh = debounce(this.$refs.scroll.refresh, 500)
			
			// this.itemImgListener = () => {
			// 	refresh()
			// }
			// this.$bus.$on('itemImageLoad', this.itemImgListener)
		},
		//由于详情页没有做缓存，所以当离开此页时，只能调用destroyed生命周期函数，而不是deactivated函数
		// 所以要将离开前的滚动条的位置保存在这里面,还有在这个函数中将图片加载后的监听事件在页面销毁后的这个函数中取消
		// 那么离开这个没有缓存的页面，或者这个页面销毁之后，要取消这个页面中的某个监听事件
		// 例如本页面的图片加载监听事件,销毁页面之后取消的这个事件,就不会与其他监听同一个子组件的事件的页面相互影响了
		destroyed() {
			// console.log('destroyed')
			this.$bus.$off('itemImgLoad', this.itemImgListener)
		},
		methods: {
			goodsImageLoad() {
				// 刷新当前高度
				// this.$refs.scroll.refresh()
				// console.log('DetailImageLoad+++++')

				this.refresh()
				// 在所有图片加载完成后，获取对应的offsetTop
				this.getThemeTopY()
				// this.themeTopYs.push(0)
				// this.themeTopYs.push(this.$refs.param.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
				// this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

				// console.log(this.themeTopYs)
			},
			// 封装推荐数据请求的方法
			getRecommend() {
				getRecommend().then(res => {
					// console.log(res)
					this.goodsList = res.data.list
				})
			},

			titleClick(index) {
				// console.log(index)
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
			},

			//获取滚动值
			contentScroll(position) {
				// console.log(position, '-----')
				// 1 获取Y值
				const positionY = -position.y
				// console.log(positionY)
				
				// // 2 positionY和主题中对应的Y值对比
				// // [0, 10549, 11277, 11490r]
				// // 假如值在0到10549之间，则index=0；下同理
				const length = this.themeTopYs.length;
				// // console.log(length)
				// // console.log(this.themeTopYs[i])
				for (let i = 0; i < length; i++) {
					// console.log(this.themeTopYs[i])
				// 	// console.log(i)居然是每滚动一次就调用一次这个函数，同时执行一次for循环
					// if (this.currentIndex !== i && ((i < length - 1 
					// 		&& positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) 
					// 		|| (i === length - 1 && positionY >= this.themeTopYs[i]))) {
					// 	// console.log(i)
					// 	this.currentIndex = i;
					// 	this.$refs.nav.currentIndex = this.currentIndex
					// }
					if (this.currentIndex !== i && (i < length - 1 
						&& positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
							this.currentIndex = i;
							this.$refs.nav.currentIndex = this.currentIndex
					}
				}
				// // 3 判断backtop是否显示
				this.listenerBackTop(position)
				// this.isShowBackTop = (-position.y) > 1000	
			},
			addCart() {
				// console.log('父组件实现加入购物车')
				// 1 从当前详情页获取数据
				const product = {}
				product.image = this.topImages[0];
				product.title = this.goods.title;
				product.desc = this.goods.desc;
				product.price = this.goods.realPrice;
				product.iid = this.iid;


				// 2 将商品添加到购物车中（将数据和商品的id传入该购物车组件，先将点击后获取的数据保存到vuex中，再传入到购物车组件中）
				// 3 从组件往vuex中传递数据时，不能直接对state进行修改，要先将数据传入大mutation中，再由mutation操作后传入state
				// this.$store.cartList.push(product)
				
				// 将方法传递到vuex中的mutations的方法this.$store.commit('fn_name', param)
				// this.$store.commit('addCart', product)
				// 将方法传递到vuex的actions的方法是：this.$store.dispatch('fn_name', param)
				this.$store.dispatch('addCart', product).then(res => {
					console.log(res)
				})
				
			}
		}
		
	}


</script>
<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;	
	}
	
	.content {
		height: calc(100% - 44px - 55px);
		overflow: hidden;
		position: fixed;
		background-color: #fff;	

	}
</style>