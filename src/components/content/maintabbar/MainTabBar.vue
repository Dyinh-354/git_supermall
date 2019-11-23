<template>
	<div>
		<tab-bar>
			<tab-bar-item path="/home" activeColor="red">
				<!-- <div name="item-text">首页</div> -->
				<div slot="item-icon" class="img"></div>
				<div slot="item-icon-active" class="img-active"></div>
				<div slot="item-text">首页</div>
			</tab-bar-item>
			<tab-bar-item path="/category" activeColor="red">
				<div slot="item-icon" class="img2"></div>
				<div slot="item-icon-active" class="img2-active"></div>
				<div slot="item-text">分类</div>
			</tab-bar-item>
			<tab-bar-item path="/shopcart" activeColor="red">
				<div slot="item-icon" class="img"></div>
				<div slot="item-icon-active" class="img-active"></div>
				<div slot="item-text">购物车</div>
			</tab-bar-item>
			<tab-bar-item path="/profile" activeColor="red">
				<div slot="item-icon" class="img2"></div>
				<div slot="item-icon-active" class="img2-active"></div>
				<div slot="item-text" >个人</div>
			</tab-bar-item>
		</tab-bar>
	</div>
</template>

<script>
	import TabBar from '../../common/tabbar/TabBar'
	import TabBarItem from '../../common/tabbar/TabBarItem'

	export default {
		name: 'MainTabBar',
		components: {
			TabBar,
			TabBarItem
		},

	}

</script>
<style>
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
	
	.tab-bar-item .img2 {
		background-color: purple;
		width: 24px;
		height: 24px;
		/* background-color: blue; */
		/* left: 50%; */
		margin-left : 50% ; 
		transform: translateX(-50%);
		margin-bottom: 3px;
		margin-top: 3px;
	}

	.tab-bar-item .img2-active {
		background-color: red;
		width: 24px;
		height: 24px;
		/* background-color: blue; */
		/* left: 50%; */
		margin-left : 50% ; 
		transform: translateX(-50%);
		margin-bottom: 3px;
		margin-top: 3px;
	}
	.tab-bar-item .img-active {
		background-color: green;
		width: 24px;
		height: 24px;
		/* background-color: blue; */
		/* left: 50%; */
		margin-left : 50% ; 
		transform: translateX(-50%);
		margin-bottom: 3px;
		margin-top: 3px;
	}


</style>