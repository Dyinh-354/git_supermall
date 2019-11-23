<template>
	<swiper>
		<swiper-item v-for="(item, itemIndex) in banners" :key="itemIndex">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="imageLoad">
			</a>
		</swiper-item>
	</swiper>

</template>

<script>
	import {Swiper, SwiperItem} from '@components/common/swiper/index.js'
	 
	export default {
		name: 'HomeSwiper',
		props: {
			banners: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data () {
			return {
				isLoad: false
			}
		},

		components: {
			Swiper,
			SwiperItem
		},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
			imageLoad() {
				// console.log('------');
				//监听图片的加载完成次数，即加载函数执行了几次，将这个数字返回到home组件中，这个数字只需要发出一次即可
				if (!this.isLoad) {
					this.$emit('swiperImageLoad')
					this.isLoad = true
				}	
			}
		},
		watch: {}
	}

</script>
<style lang='' scoped>

</style>