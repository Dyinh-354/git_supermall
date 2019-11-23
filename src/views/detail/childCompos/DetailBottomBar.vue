<template>
	<div class="bottom-bar">
		<div class="bar-item bar-left">
			<div>
				<i class="icon service"></i>
				<span class="text">客服</span>
			</div>
			<div>
				<i class="icon shop"></i>
				<span class="text">店铺</span>
			</div>
			<div>
				<i class="icon select"></i>
				<span class="text">收藏</span>
			</div>
		</div>
		<div class="bar-item bar-right"> 
				<div class="cart" @click="addToCart">加入购物车</div>
				<div class="buy">购买</div>
		</div>
	</div>
</template>

<script>

	export default {
		name: 'DetailBottomBar',
		props: [''],
		data () {
			return {

			};
		},

		components: {},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
			addToCart() {
				// console.log('点击加入购物车')
				this.$emit('addCart')
			}
		},
		watch: {}
	}

</script>
<style scoped>
	.bottom-bar {
		width: 100%;
		height: 55px;
		position: fixed;
		background-color: #fff;
		left: 0;
		right: 0;
		bottom: 0;

		display: flex;
		text-align: center;
	}

	.bar-item {
		flex: 1;
		display: flex;
	}

	.bar-item>div {
		flex: 1;
	}

	.bar-left .text {
		/* display: inline-block; */
		font-size: 13px;
	}

	.bar-left .icon {
		display: block;
		width: 22px;
		height: 22px;
		margin: 10px auto 3px;
		background-color: #f69;
	}
	
	/* .bar-left .service {
		background-position: 0 -54px;
	}

	.bar-left .shop {
		background-position: 0 -98px;
	} */

	.bar-right {
		font-size: 15px;
		color: #fff;
		line-height: 55px;
		display: flex;
	}

	.bar-right .cart {
		flex: 1;
		background-color: #ffe817;
		color: #333;
	}

	.bar-right .buy {
		flex: 1;
		background-color: #f69;
	}

	.sport-ball {
		position: absolute;
		left: 225px;
		bottom: 20px;
	}
</style>