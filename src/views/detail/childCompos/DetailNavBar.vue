<template>
	<div>
		<nav-bar class="nav-bar">
			<div slot="left" class="back" @click="backClick">
				<img src="@assets/img/common/close1.png/" alt="">
			</div>
      <div slot="center" class="title">
				<div v-for="(item, index) in titles" :key="index" class="title-item"
						 :class="{active: index === currentIndex}"
						 @click="titleClick(index)">{{item}}</div>
			</div>
    </nav-bar>
	</div>
</template>

<script>
	import NavBar from '@components/common/navbar/NavBar.vue'

	export default {
		name: 'DetailNavBar',
		props: [''],
		data () {
			return {
				titles: ['商品', '参数', '评论', '推荐'],
				currentIndex: 0
			}
		},
		components: {
			NavBar
		},
		computed: {},
		beforeMount() {},
		mounted() {},
		methods: {
			titleClick(index) {
				this.currentIndex = index
				this.$emit('titleClick', index)
			},
			backClick() {
				// 路由返回的方法
				this.$router.back()
			}
		},
		watch: {}
	}

</script>
<style scoped>
	.nav-bar {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
	.title {
		display: flex;
		font-size: 14px;
	}
	.title-item {
		flex: 1;
	}
	.active {
		color: pink;
	}
	.back img {
		margin-top: 13px;
		width: 20px;
		height: 20px;
	}
</style>