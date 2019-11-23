<template>
	<div class="cart-list">
		<scroll class="content">
			<cart-list-item v-for="(item, index) in cartList" 
											:key="index" 
											:product="item"/>
		</scroll>
	</div>
</template>

<script>
	import Scroll from '@components/common/scroll/Scroll.vue'
	import CartListItem from './CartListItem'

	import { mapGetters } from 'vuex'

	export default {
		name: 'CartList',
		props: [''],
		data () {
			return {

			};
		},
		components: {
			Scroll,
			CartListItem
		},
		computed: {
			...mapGetters(['cartList'])
		},
		beforeMount() {},
		mounted() {},
		methods: {},
		watch: {}
	}

</script>
<style lang='less' scoped>
	.content {
		overflow: hidden;
		position: fixed;
		height: calc(100% - 93px - 40px);
	}

</style>