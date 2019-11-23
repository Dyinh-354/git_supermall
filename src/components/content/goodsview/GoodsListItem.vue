<template>
	<div class="goods-item" @click="itemClick">
		<img :src="showImage" alt="" @load="imageLoad">
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">￥{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>

		</div>
	</div>
</template>

<script>

	export default {
		name: 'GoodsListItem',
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data () {
			return {

			};
		},
		
		components: {},
		computed: {
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img
			}
		},
		beforeMount() {},
		mounted() {},
		methods: {
			imageLoad() {
				// console.log('imageLoad')
				// 通过事件总件（$bus）这个中间站，将GoodsListItem组件中的传递事件（this.$emit()）
				// 与Home组件直接联系起来，而无需一层一层的通过$emit()和props上传
				// $bus是不存在的，需要自行在原型中（main.js）添加
				this.$bus.$emit('itemImageLoad')
				// console.log(this)
			},
			itemClick() {
				console.log('跳转到详情页')
				//路由跳转
				this.$router.push('/detail/' + this.goodsItem.iid)
			}
		},
		watch: {}
	}

</script>
<style scoped>
	.goods-item {
		padding: 0 6px 40px 5px;
		position: relative;

		width: 47%;
	}
	.goods-item img {
		width: 100%;
		border-radius: 5px;

		/* padding: 0 3px; */
	}
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: var(--color-high-text);
		margin-right: 20px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: 2px;
		width: 14px;
		height: 14px;
		background-color: pink;
	}


</style>