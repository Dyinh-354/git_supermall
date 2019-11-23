<template>
	<div class="bottom-bar">
		<div class="bottom-content">
			<item-selected class="checkedbtn" 
											:is-selected="isSelectedAll" 
											@click.native="allSelected"/>
			<div class="allchecked">
				全选
			</div>
			<div class="totalprice">
				合计：{{totalPrice}}
			</div>
			<div class="totalcount">
				结算({{totalCount}})
			</div>
		</div>
	</div>
</template>

<script>
	import ItemSelected from './ItemSelected';

	import { mapGetters } from 'vuex';

	export default {
		name: 'CartBottomBar',
		props: {

		},
		data () {
			return {
				
			};
		},

		components: {
			ItemSelected
		},
		computed: {
			...mapGetters({
				cartList: 'cartList'
			}),
			totalPrice() {
				// 先获取被选中的商品的数量
				// 使用vuex原生方法
				// return this.$store.state.cartList.filter(item => {
				// 	return item.selected
				// })
				// 使用getters
				return '￥' + this.cartList.filter(item => {
					return item.selected
				}).reduce((prevalue, item) => {
					return prevalue + item.price * item.count
				}, 0).toFixed(2)
			},
			totalCount() {
				return this.cartList.filter(item => item.selected).length
			},
			isSelectedAll() {
				if (this.cartList.length === 0) return false
				return this.cartList.every(item => item.selected)
				// return !(this.cartList.filter(item => !item.selected).length)
				// return !this.cartList.find(item => !item.selected)

			}
		},
		beforeMount() {},
		mounted() {},
		methods: {
			allSelected() {
				console.log('选中')
				if (this.isSelectedAll) { //全部选中
					this.cartList.forEach(item => item.selected = false)
				} else { //全部or部分不选中
					this.cartList.forEach(item => item.selected = true)
				}

				// this.cartList.forEach(item => item.selected = !this.isSelectedAll)==失败

			}
		},
		watch: {}
	}

</script>
<style lang='less' scoped>
	.bottom-bar {
		/* 盒子自身属性 */
		width: 100%;
		height: 40px;
		background-color: #eee;
		/* 盒子在父盒子中的定位 */
		position: absolute;
		bottom: 50px; 

		.bottom-content {	
			display: flex;
			// 盒子内部可继承属性
			line-height: 40px;

			.checkedbtn {
				padding-left: 10px;
			}
			.allchecked, .totalprice {
				font-size: 15px;
				padding-left: 3px;
			}

			.totalprice {
				margin-left: 30px;
			}

			.totalcount {
				position: absolute;
				right: 10px;
				width: 80px;
				height: 30px;
				margin: 5px;
				border-radius: 15px;
				background-color: red;
				line-height: 30px;
				text-align: center;
			}
		}
	}
</style>