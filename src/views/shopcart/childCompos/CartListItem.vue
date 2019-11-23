<template>
	<div class="cart-item">
		<item-selected :is-selected="product.selected"
										@click.native="ItemSelected"></item-selected>
		<div class="item-img">
			<img :src="product.image" alt="商品图案">
		</div>
		<div class="item-info">
			<div class="item-info-a"><div class="item-title">{{product.title}}</div></div>
			<div class="item-desc">{{product.desc}}</div>
			<div class="info-bottom">
				<span class="item-price left">￥{{product.price}}</span>
				<span class="item-count right">x{{product.count}}</span>
			</div>
		</div>	
	</div>
</template>

<script>
	import ItemSelected from './ItemSelected'
	

	export default {
		name: 'CartListItem',
		props: {
			product: {
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

		components: {
			ItemSelected
		},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
			ItemSelected() {
				console.log('选中商品')
				this.product.selected = !this.product.selected;
			}
		},
		watch: {}
	}

</script>
<style scoped>
	.cart-item {
		width: 100%;
		display: flex;
		padding: 10px;
		border-bottom: 1px solid #999;
	}

	.item-img img{
		width: 80px;
		height: 100px;
		display: block;
		border-radius: 5px;
	}

	.item-title, .item-desc  {
		overflow: hidden;
		text-overflow: ellipsis;
		/* white-space: nowrap; */
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		word-break: break-all;
	} 

	.item-info {
		font-size: 17px;
		color: #333;
		padding: 5px 10px;
		padding-right: 20px;
		position: relative;
		overflow: hidden;
		/* flex: 1; */
		/* width: 100%; */
	}

	
	.item-info .item-desc {
		font-size: 14px; 
		color: #666;
		margin-top: 15px;
	}


	.info-bottom {
		margin-left: 10px;
		position: absolute;
		bottom: 10px;
		left: 10px;
		right: 10px;
	}

	.info-bottom .item-price {
		color: orangered;
	}

	.info-bottom .item-count {
		position: absolute;
		right: 0;
	}
</style>