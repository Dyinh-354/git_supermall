<template>
	<div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
		<div class="info-desc clearfix">
			<div class="start"></div>
			<div class="desc">{{detailInfo.desc}}</div>
			<div class="end"></div>
		</div>
		<div class="info-key">{{detailInfo.detailImage[0].key}}</div>
		<div class="info-list">
			<img v-for="(item, index) in detailInfo.detailImage[0].list" 
						:key="index" :src="item" @load="imgLoad">
		</div>
	</div>
</template>

<script>

	export default {
		name: 'DetailGoodsInfo',
		props: {
			detailInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data () {
			return {
				counter: 0,
				imagesLength: 0
			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
			// 图片加载完成后的函数
			imgLoad() {
				const imgCounter = ++this.counter
				if (imgCounter === this.imagesLength) {
					this.$emit('imageLoad')
				}
			}
		},
		watch: {
			detailInfo() {
				this.imagesLength = this.detailInfo.detailImage[0].list.length
				// console.log(this.imagesLength)
			}
		}
	}

</script>
<style scoped>
	.info-list img {
		width: 100%;
	}
	.goods-info {
		border-bottom: 5px solid #333;
	}
</style>