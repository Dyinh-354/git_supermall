<template>
	<div class="cart">
		<!-- 导航 -->
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{length}})</div>
		</nav-bar>

		<!-- 商品的列表 -->
		<cart-list></cart-list>

		<!-- 底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from '@components/common/navbar/NavBar.vue'
	import CartList from './childCompos/CartList'
	import CartBottomBar from './childCompos/CartBottomBar';


	import { mapGetters } from 'vuex'

	export default {
		name: 'ShopCart',
		props: {

		},
		data () {
			return {

			};
		},
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			//两种语法
			// ...mapGetters(['cartLength'])
			...mapGetters({
				length: 'cartLength'
			})

		},
		beforeMount() {},
		mounted() {},
		methods: {
		},
		watch: {}
	}

</script>
<style lang='less' scoped>
	.cart {
		height: 100vh;
		position: relative;
	}
	.nav-bar {
		background-color: pink;
    color: #ffffff;
	}
</style>