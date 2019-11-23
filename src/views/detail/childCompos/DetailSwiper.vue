<template>
	<div>
		<swiper class="detail-swiper">
			<swiper-item v-for="(item, index) in topImages" :key="index" class="swiper-item">
				<img :src="item">
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import {Swiper, SwiperItem} from '@components/common/swiper/index.js'

	export default {
		name: 'DetailSwiper',
		components: {
			Swiper,
			SwiperItem
		},
		props: {
			topImages: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data () {
			return {

			};
		},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {},
		watch: {}
	}

</script>
<style scoped>
	.detail-swiper {
		width: 100%;
		height: 300px;
		overflow: hidden;
	}
</style>