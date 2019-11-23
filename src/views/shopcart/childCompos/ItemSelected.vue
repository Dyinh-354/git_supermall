<template>
	<div class="item-selected">
		<div class="item-box" :class="{checked: isSelected}"></div>
	</div>
</template>

<script>

	export default {
		name: 'ItemSelected',
		props: {
			isSelected: {
				type: Boolean,
				default() {
					false
				}
			}
		},
		data () {
			return {
				
			};
		},

		components: {},
		computed: {

		},
		beforeMount() {},
		mounted() {},
		methods: {
			// ItemSelected() {
			// 	console.log('选中')
			// 	this.product.selected = !this.product.selected;
			// }
		},
		watch: {}
	}

</script>
<style scoped>
	.item-selected {
		padding-right: 3px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.item-box{
		width: 15px;
		height: 15px;
		background-color: fff;
		border: 2px solid #aaa;
		border-radius: 50%;
	}

	.checked {
		background-color: pink;
		border: 2px solid pink;
	}
</style>