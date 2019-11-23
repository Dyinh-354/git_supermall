<template>
	<div @click="itemClick" class="tab-bar-item">
		<div v-if="!isActive"><slot name="item-icon"></slot></div>
		<div v-else><slot name="item-icon-active"></slot></div>
		<div :style="activeStyle"><slot name="item-text"></slot></div>
	</div>
</template>

<script>

	export default {
		name: 'TabBarItem',
		props: {
			path: String,
			activeColor: {
				type: String,
				default: 'black'
			}
		},
		data () {
			return {
				// isActive: false                           
			};
		},
		computed: {
			isActive () {
				return this.$route.path.indexOf(this.path) !== -1
				//判断当前活跃路由是否和点击路由相同
			},
			activeStyle() {
				return this.isActive ? {color: this.activeColor} : {}
			}
		},
		methods: {
			itemClick () {
				// this.isActive = !this.isActive
				this.$router.replace(this.path)
			}
		}


	
	}

</script>
<style>
	.tab-bar-item {
    flex: 1;
    text-align: center;
		height: 49px;
		width: 100%;
		
		/* display: flex; */
		/* justify-content: center; */
		/* align-content: center; */
	}
	
	.tab-bar-item .img {
    width: 24px;
		height: 24px;
		background-color: blue;
		/* left: 50%; */
		margin-left : 50% ; 
		transform: translateX(-50%);
		margin-bottom: 3px;
		margin-top: 3px;

  }
	

	 

  
</style>