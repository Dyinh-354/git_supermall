<template>
	<div class="goods">
		<goods-list-item v-for="(item, itemIndex) in goods" 
										:key="itemIndex" :goods-item="item">
		</goods-list-item>
	</div>
</template>

<script>
	import GoodsListItem from './GoodsListItem'

	export default {
		name: 'GoodList',
		components: {
			GoodsListItem
		},
		props: {
			goods: {
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
	.goods {
		display: flex;
		flex-wrap: wrap;
		text-align: center;
	}

</style>